from prompts.pdf_chat import PDF_CHAT_SYSTEM_PROMPT

from core.llm import generate
from rag.retrieve import retrieve_context


def ask_pdf(
    question: str,
    user_id: str,
    document_id: str,
):
    context = retrieve_context(
        question=question,
        user_id=user_id,
        document_id=document_id,
    )

    if not context.strip():
        return (
            "I couldn't find that information "
            "in the uploaded document."
        )

    return generate(
        system_prompt=PDF_CHAT_SYSTEM_PROMPT,
        user_prompt=f"""
Context:

{context}

----------------------------

Question:

{question}
""",
    )
