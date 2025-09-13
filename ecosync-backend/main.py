import os
import google.generativeai as genai
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import shutil

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

# CORS so frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/carbon-budget/")
async def carbon_budget(
    file: UploadFile = File(...),
    reduction_percent: int = Form(...)
):
    # Save temp file
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Send to Gemini for OCR + extraction
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        [f"Extract electricity usage (kWh) from this bill and return only the number.", 
         {"mime_type": file.content_type, "data": open(temp_file, "rb").read()}]
    )

    try:
        usage_kwh = float(response.text.strip())
    except:
        usage_kwh = 0.0

    # Convert usage → carbon credits (simple factor)
    carbon_credits = usage_kwh * 0.92  # 0.92 kgCO2 per kWh (example)

    # New budget
    target_credits = carbon_credits * (1 - reduction_percent / 100)

    # Suggestions
    suggestions = [
        "Switch to LED lighting",
        "Unplug idle appliances",
        "Use energy-efficient AC settings",
        "Consider rooftop solar",
        "Reduce peak-time electricity use"
    ]

    return {
        "original_credits": round(carbon_credits, 2),
        "target_credits": round(target_credits, 2),
        "reduction_percent": reduction_percent,
        "suggestions": suggestions
    }
