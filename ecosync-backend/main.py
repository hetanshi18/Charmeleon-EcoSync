import os
import shutil
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import google.generativeai as genai
import json
import re

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

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
    """Parse the budget response to extract structured data"""
    carbon_credits = usage_kwh * 0.92
    target_credits = carbon_credits * (1 - reduction_percent / 100)
    
    # Try to extract recommendations as a list
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
    
    # If no structured recommendations found, split by sentences
    if not recommendations:
        sentences = response_text.split('. ')
        recommendations = [sent.strip() + '.' for sent in sentences if len(sent.strip()) > 20][:7]
    
    return {
        "usage_kwh": round(usage_kwh, 2),
        "original_credits": round(carbon_credits, 2),
        "target_credits": round(target_credits, 2),
        "reduction_percent": reduction_percent,
        "savings_needed": round(carbon_credits - target_credits, 2),
        "recommendations": recommendations[:7]  # Limit to 7 recommendations
    }

@app.post("/bill-handler/")
async def handle_bill(
    file: UploadFile = File(...),
    mode: str = Form(...),               # "budget" or "chat"
    reduction_percent: int = Form(0),
    user_id: str = Form("default_user")
):
    """
    Budget manager mode: calculate budget, give recommendations, and start chat with context
    """
    # Save temporary file
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        file_data = open(temp_file, "rb").read()

        # 1️⃣ Extract usage first
        extract_prompt = (
            "Read this electricity bill and return ONLY the total usage "
            "in kilowatt-hours (kWh) as a number. If you can't find exact kWh, "
            "provide your best estimate based on units consumed."
        )
        usage_resp = model.generate_content([
            extract_prompt,
            {"mime_type": file.content_type, "data": file_data}
        ])
        
        try:
            usage_kwh = float(re.findall(r'\d+\.?\d*', usage_resp.text.strip())[0])
        except (IndexError, ValueError):
            usage_kwh = 300.0  # Default fallback

        # 2️⃣ Get detailed recommendations
        rec_prompt = (
            f"Based on this electricity bill showing {usage_kwh:.1f} kWh usage, "
            f"provide exactly 5-7 specific, actionable recommendations to reduce energy consumption. "
            f"Each recommendation should include estimated savings in kWh or ₹/month. "
            f"Format as a numbered list with clear, concrete steps."
        )
        rec_resp = model.generate_content([
            rec_prompt,
            {"mime_type": file.content_type, "data": file_data}
        ])

        # Parse structured data for frontend
        budget_data = parse_budget_response(rec_resp.text.strip(), usage_kwh, reduction_percent)

        # 3️⃣ Start chat with budget context
        initial_system_msg = (
            f"You are an energy efficiency assistant. The user has uploaded an electricity bill "
            f"showing {usage_kwh:.1f} kWh usage (~{budget_data['original_credits']:.1f} kgCO₂). "
            f"They want to reduce consumption by {reduction_percent}% to reach "
            f"{budget_data['target_credits']:.1f} kgCO₂ target. "
            f"You have provided recommendations. Now answer any follow-up questions about "
            f"energy efficiency, the bill, or sustainability. Be helpful and conversational."
        )
        
        chat = model.start_chat(history=[
            {"role": "user", "parts": [
                initial_system_msg,
                {"mime_type": file.content_type, "data": file_data}
            ]}
        ])
        chat_sessions[user_id] = chat

        return {
            "budget_data": budget_data,
            "message": "Budget analysis complete! You can now chat about your energy usage and savings."
        }

    except Exception as e:
        return {"error": f"Failed to process bill: {str(e)}"}
    
    finally:
        # Clean up temp file
        if os.path.exists(temp_file):
            os.remove(temp_file)

@app.post("/chat-reply/")
async def chat_reply(user_id: str = Form(...), message: str = Form(...)):
    """Send a follow-up message in an existing chat session."""
    chat = chat_sessions.get(user_id)
    if not chat:
        return {"error": "No active chat session for this user. Please upload a bill first."}
    
    try:
        reply = chat.send_message(message)
        return {"reply": reply.text}
    except Exception as e:
        return {"error": f"Failed to get response: {str(e)}"}