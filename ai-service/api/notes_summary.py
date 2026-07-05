from fastapi import APIRouter, File, HTTPException, UploadFile

from rag.pdf_parser import extract_text_from_pdf
from services.notes_summary_service import summarize_notes

router = APIRouter(
    prefix="/notes-summary",
    tags=["Notes Summarizer"],
)


@router.post("/summarize")
async def summarize_document(
    file: UploadFile = File(...),
):
    """
    Upload a PDF and generate an AI summary.
    """

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    file_bytes = await file.read()

    text = extract_text_from_pdf(file_bytes)

    if not text.strip():
        raise HTTPException(
            status_code=400,
            detail="No text could be extracted from the PDF.",
        )

    summary = summarize_notes(text)

    return {
        "success": True,
        "summary": summary,
    }