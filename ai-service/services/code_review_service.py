import json

from core.llm import generate
from prompts.code_review_prompt import SYSTEM_PROMPT


def review_code(
    code: str,
    language: str,
):
    """
    Review source code using the LLM.
    """

    user_prompt = f"""
Programming Language:
{language}

Review the following code:

{code}
"""

    response = generate(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=user_prompt,
        temperature=0.2,
    )

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        raise Exception(
            "AI returned an invalid JSON response."
        )