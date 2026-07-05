import json

from core.llm import generate

from prompts.study_assistant_prompt import SYSTEM_PROMPT
from rag.retrieve import retrieve_context


MODE_INSTRUCTIONS = {
    "question": """
Answer the student's question clearly using the study material.
""",
    "summary": """
Generate a structured summary.
""",
    "quiz": """
Generate a quiz.
""",
    "flashcards": """
Generate flashcards.
""",
    "important_topics": """
List the most important topics.
""",
    "explain": """
Explain the topic like a teacher.
""",
}


def study_assistant(
    *,
    mode: str,
    question: str,
    user_id: str,
    document_id: str,
):
    """
    AI Study Assistant using Retrieval-Augmented Generation (RAG).
    """

    context = retrieve_context(
        question=question,
        user_id=user_id,
        document_id=document_id,
    )

    if not context:
        return {
            "success": False,
            "message": "No relevant study material found.",
        }

    instruction = MODE_INSTRUCTIONS.get(
        mode,
        MODE_INSTRUCTIONS["question"],
    )

    user_prompt = f"""
Study Material

{context}

Student Request

{question}

Task

{instruction}

Return ONLY valid JSON.
"""

    response = generate(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=user_prompt,
        temperature=0.3,
    )

    print("\n========== AI RESPONSE ==========")
    print(response)
    print(type(response))
    print("=================================\n")

    try:
        parsed = json.loads(response)

        return {
            "success": True,
            "mode": mode,
            "result": parsed,
        }

    except json.JSONDecodeError:
        raise Exception(
            "AI returned an invalid JSON response."
        )