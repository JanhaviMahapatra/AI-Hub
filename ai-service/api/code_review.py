from fastapi import APIRouter
from pydantic import BaseModel

from services.code_review_service import review_code

router = APIRouter(
    prefix="/code-review",
    tags=["Code Review"],
)


class CodeReviewRequest(BaseModel):
    code: str
    language: str


@router.post("")
async def code_review(
    request: CodeReviewRequest,
):
    review = review_code(
        code=request.code,
        language=request.language,
    )

    return {
        "success": True,
        "review": review,
    }