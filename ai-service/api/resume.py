from fastapi import APIRouter, File, HTTPException, UploadFile

from services.parser_service import extract_text_from_pdf
from services.resume_service import review_resume

router = APIRouter(
    prefix="/resume",
    tags=["Resume Reviewer"],
)


@router.post("/review")
async def review_resume_endpoint(
    file: UploadFile = File(...),
):
    """
    Upload a resume PDF and receive an AI review.
    """

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    file_bytes = await file.read()

    resume_text = extract_text_from_pdf(file_bytes)

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Unable to extract text from the resume.",
        )

    result = review_resume(resume_text)

    return {
        "success": True,
        "review": result,
    }