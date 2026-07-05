from fastapi import FastAPI
from dotenv import load_dotenv

from api.chat import router as chat_router
from api.pdf_chat import router as pdf_chat_router
from api.resume import router as resume_router
from api.code_review import router as code_review_router
from api.notes_summary import router as notes_summary_router
from api.form_autofill import router as form_autofill_router
from api.study_assistant import router as study_assistant_router
from api.web_search import router as web_search_router

load_dotenv()

app = FastAPI(
    title="AI Hub AI Service",
    version="1.0.0",
)

# Register Chat Router
app.include_router(chat_router)
app.include_router(pdf_chat_router)
app.include_router(resume_router)
app.include_router(code_review_router)
app.include_router(notes_summary_router)
app.include_router(form_autofill_router)
app.include_router(study_assistant_router)
app.include_router(web_search_router)

@app.get("/")
def root():
    return {
        "message": "AI Hub FastAPI is running"
    }


@app.get("/health")
def health():
    return {
        "success": True,
        "message": "FastAPI service is healthy"
    }