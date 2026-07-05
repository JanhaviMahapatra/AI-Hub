from openai import OpenAI

from config import (
    MODEL,
    OPENROUTER_API_KEY,
)

client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
)


def generate(
    *,
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.7,
    max_tokens: int | None = None,
):
    messages = [
        {
            "role": "system",
            "content": system_prompt,
        },
        {
            "role": "user",
            "content": user_prompt,
        },
    ]

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
    )

    return response.choices[0].message.content


def stream(
    *,
    messages: list,
    temperature: float = 0.7,
    max_tokens: int | None = None,
):
    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        stream=True,
        temperature=temperature,
        max_tokens=max_tokens,
    )

    for chunk in response:
        delta = chunk.choices[0].delta

        if delta.content:
            yield delta.content