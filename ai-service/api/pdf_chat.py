from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from rag.ingest import ingest_pdf
from services.pdf_chat_service import ask_pdf
from rag.chroma import delete_documents
from pydantic import BaseModel

router = APIRouter(
    prefix="/pdf-chat",
    tags=["PDF Chat"],
)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    user_id: str = Form(...),
):
    """
    Upload a PDF and ingest it into ChromaDB.
    """

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    file_bytes = await file.read()

    result = ingest_pdf(
        file_bytes=file_bytes,
        user_id=user_id,
        filename=file.filename,
    )

    return {
        "success": True,
        "document": result,
    }


class PDFQuestionRequest(BaseModel):
    user_id: str
    document_id: str
    question: str

@router.post("/ask")
async def ask_pdf_question(
    request: PDFQuestionRequest,
):
    """
    Ask a question about a previously uploaded PDF.
    """

    answer = ask_pdf(
    question=request.question,
    user_id=request.user_id,
    document_id=request.document_id,
)

    return {
        "success": True,
        "answer": answer,
    }

@router.delete("/{document_id}")
async def delete_pdf(
    document_id: str,
):
    """
    Delete all chunks belonging to a document.
    """

    delete_documents(
        where={
            "document_id": document_id,
        }
    )

    return {
        "success": True,
        "message": "Document deleted successfully.",
    }