from fastapi import APIRouter
from pydantic import BaseModel

from services.web_search_service import web_search

router = APIRouter(
    prefix="/web-search",
    tags=["Web Search"],
)


class WebSearchRequest(BaseModel):
    query: str


@router.post("/search")
async def search(request: WebSearchRequest):
    result = web_search(request.query)

    return {
        "success": True,
        "answer": result["answer"],
        "sources": result["sources"],
    }