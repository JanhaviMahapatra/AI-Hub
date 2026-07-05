from fastapi import APIRouter
from pydantic import BaseModel

from services.study_assistant_service import study_assistant

router = APIRouter(
    prefix="/study-assistant",
    tags=["Study Assistant"],
)


class StudyAssistantRequest(BaseModel):
    mode: str
    question: str
    user_id: str
    document_id: str


@router.post("/ask")
async def ask_question(
    request: StudyAssistantRequest,
):
    return study_assistant(
        mode=request.mode,
        question=request.question,
        user_id=request.user_id,
        document_id=request.document_id,
    )