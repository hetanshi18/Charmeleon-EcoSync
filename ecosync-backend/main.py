import os
import shutil
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
import json
import re

print("🔄 Loading environment variables...")
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("❌ GEMINI_API_KEY not found in environment!")
else:
    print(f"✅ GEMINI_API_KEY loaded: {api_key[:6]}... (truncated)")
genai.configure(api_key=api_key)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # tighten later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory store for demo (reset on server restart)
chat_sessions = {}

def parse_budget_response(response_text, usage_kwh, reduction_percent):
    print("📊 Parsing budget response...")
    print("Raw response from Gemini:\n", response_text[:300], "..." if len(response_text) > 300 else "")
    
    carbon_credits = usage_kwh * 0.92
    target_credits = carbon_credits * (1 - reduction_percent / 100)

    recommendations = []
    lines = response_text.split('\n')
    current_rec = ""

    for line in lines:
        line = line.strip()
        if line and (line.startswith('-') or line.startswith('•') or line.startswith('*') or re.match(r'^\d+\.', line)):
            if current_rec:
                recommendations.append(current_rec.strip())
            current_rec = re.sub(r'^[-•*\d.]\s*', '', line)
        elif line and current_rec:
            current_rec += " " + line

    if current_rec:
        recommendations.append(current_rec.strip())

    if not recommendations:
        sentences = response_text.split('. ')
        recommendations = [sent.strip() + '.' for sent in sentences if len(sent.strip()) > 20][:7]

    result = {
        "usage_kwh": round(usage_kwh, 2),
        "original_credits": round(carbon_credits, 2),
        "target_credits": round(target_credits, 2),
        "reduction_percent": reduction_percent,
        "savings_needed": round(carbon_credits - target_credits, 2),
        "recommendations": recommendations[:7]
    }
    print("✅ Parsed budget data:", json.dumps(result, indent=2))
    return result

@app.post("/bill-handler/")
async def handle_bill(
    file: UploadFile = File(...),
    mode: str = Form(...),
    reduction_percent: int = Form(0),
    user_id: str = Form("default_user")
):
    print(f"\n📥 Received bill upload: {file.filename}, Mode={mode}, Reduction={reduction_percent}%, User={user_id}")

    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    print(f"📂 Saved temp file: {temp_file}")

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        file_data = open(temp_file, "rb").read()
        print(f"📑 File data loaded, size={len(file_data)} bytes, type={file.content_type}")

        extract_prompt = (
            "Read this electricity bill and return ONLY the total usage "
            "in kilowatt-hours (kWh) as a number. If you can't find exact kWh, "
            "provide your best estimate based on units consumed."
        )
        print("🤖 Sending extract prompt to Gemini...")
        usage_resp = model.generate_content([
            extract_prompt,
            {"mime_type": file.content_type, "data": file_data}
        ])
        print("✅ Gemini usage response:", usage_resp.text)

        try:
            usage_kwh = float(re.findall(r'\d+\.?\d*', usage_resp.text.strip())[0])
            print(f"🔢 Extracted usage_kwh={usage_kwh}")
        except (IndexError, ValueError):
            usage_kwh = 300.0
            print("⚠️ Failed to parse usage from response. Defaulting to 300.0 kWh")

        rec_prompt = (
            f"Based on this electricity bill showing {usage_kwh:.1f} kWh usage, "
            f"provide exactly 5-7 specific, actionable recommendations to reduce energy consumption. "
            f"Each recommendation should include estimated savings in kWh or ₹/month. "
            f"Format as a numbered list with clear, concrete steps."
        )
        print("🤖 Sending recommendation prompt to Gemini...")
        rec_resp = model.generate_content([
            rec_prompt,
            {"mime_type": file.content_type, "data": file_data}
        ])
        print("✅ Gemini recommendations response received.")

        budget_data = parse_budget_response(rec_resp.text.strip(), usage_kwh, reduction_percent)

        initial_system_msg = (
            f"You are an energy efficiency assistant. The user has uploaded an electricity bill "
            f"showing {usage_kwh:.1f} kWh usage (~{budget_data['original_credits']:.1f} kgCO₂). "
            f"They want to reduce consumption by {reduction_percent}% to reach "
            f"{budget_data['target_credits']:.1f} kgCO₂ target. "
            f"You have provided recommendations. Now answer any follow-up questions."
        )
        print("💬 Initial system message prepared.")

        chat = model.start_chat(history=[
            {"role": "user", "parts": [
                initial_system_msg,
                {"mime_type": file.content_type, "data": file_data}
            ]}
        ])
        chat_sessions[user_id] = chat
        print(f"✅ Chat session started for user {user_id}")

        return {
            "budget_data": budget_data,
            "message": "Budget analysis complete! You can now chat about your energy usage and savings."
        }

    except Exception as e:
        print("❌ Error while processing bill:", str(e))
        return {"error": f"Failed to process bill: {str(e)}"}

    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)
            print(f"🗑️ Deleted temp file: {temp_file}")

@app.post("/chat-reply/")
async def chat_reply(user_id: str = Form(...), message: str = Form(...)):
    print(f"\n💬 Incoming chat message from {user_id}: {message}")
    chat = chat_sessions.get(user_id)
    if not chat:
        print("❌ No active chat session for this user.")
        return {"error": "No active chat session for this user. Please upload a bill first."}

    try:
        reply = chat.send_message(message)
        print(f"🤖 Gemini reply: {reply.text}")
        return {"reply": reply.text}
    except Exception as e:
        print("❌ Error during chat reply:", str(e))
        return {"error": f"Failed to get response: {str(e)}"}
