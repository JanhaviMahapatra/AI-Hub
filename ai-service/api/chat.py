from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from services.chat_service import generate_chat, stream_chat

router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    messages: list
    stream: bool = False


@router.post("")
async def chat(request: ChatRequest):
    if request.stream:
        return StreamingResponse(
            stream_chat(request.messages),
            media_type="text/plain",
        )

    reply = generate_chat(request.messages)

    return {
        "success": True,
        "reply": reply,
    }