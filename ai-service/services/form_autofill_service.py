import json

from core.llm import generate
from prompts.form_autofill_prompt import SYSTEM_PROMPT


def extract_form_data(text: str):
    """
    Extract structured information from a document.
    """

    response = generate(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=text,
        temperature=0.2,
    )

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        raise Exception(
            "AI returned an invalid JSON response."
        )