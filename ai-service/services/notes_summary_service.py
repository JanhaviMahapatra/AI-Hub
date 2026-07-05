import json

from core.llm import generate
from prompts.notes_summary_prompt import SYSTEM_PROMPT


def summarize_notes(text: str):
    """
    Generate an AI summary for notes or documents.
    """

    response = generate(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=text,
        temperature=0.3,
    )

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        raise Exception(
            "AI returned an invalid JSON response."
        )