import json

from core.llm import generate
from prompts.resume import SYSTEM_PROMPT


def review_resume(resume_text: str):
    """
    Analyze a resume using the LLM and return
    structured JSON feedback.
    """

    response = generate(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=f"""
Review the following resume.

Resume:

{resume_text}
""",
        temperature=0.3,
    )

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        return {
            "score": 0,
            "summary": "The AI returned an invalid response.",
            "strengths": [],
            "weaknesses": [],
            "suggestions": [
                "Please try again."
            ],
            "missing_keywords": [],
            "ats": {
                "score": 0,
                "issues": [
                    "Unable to evaluate ATS compatibility."
                ],
            },
        }