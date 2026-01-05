import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import PromptRequest
from Services.Openai_service import call_openai
from Services.Claude_service import call_claude
from Services.Gemini_Service import call_gemini

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/compare")
async def compare_models(request: PromptRequest):
    prompt = request.prompt
    results = await asyncio.gather(
        call_openai(prompt),
        call_claude(prompt),
        call_gemini(prompt),
    )
    return {
        "openai_response": results[0],
        "claude_response": results[1],
        "gemini_response": results[2],
    }