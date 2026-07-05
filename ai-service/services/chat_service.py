from prompts.chat import SYSTEM_PROMPT

from core.llm import (
    generate,
    stream,
)


def generate_chat(messages):
    conversation = "\n".join(
        f"{msg['role']}: {msg['content']}"
        for msg in messages
    )

    return generate(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=conversation,
    )


def stream_chat(messages):
    return stream(
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            *messages,
        ]
    )