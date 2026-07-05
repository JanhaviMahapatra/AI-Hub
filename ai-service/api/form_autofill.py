from fastapi import APIRouter, File, HTTPException, UploadFile

from rag.pdf_parser import extract_text_from_pdf
from services.form_autofill_service import extract_form_data

router = APIRouter(
    prefix="/form-autofill",
    tags=["Form Autofill"],
)


@router.post("/extract")
async def extract_document_data(
    file: UploadFile = File(...),
):
    """
    Upload a PDF and extract structured information.
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

    data = extract_form_data(text)

    return {
        "success": True,
        "data": data,
    }