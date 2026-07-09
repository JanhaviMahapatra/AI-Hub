import requests

from config import JINA_API_KEY


JINA_EMBEDDING_URL = "https://api.jina.ai/v1/embeddings"

HEADERS = {
    "Authorization": f"Bearer {JINA_API_KEY}",
    "Content-Type": "application/json",
}


def create_embedding(text: str) -> list[float]:
    response = requests.post(
        JINA_EMBEDDING_URL,
        headers=HEADERS,
        json={
            "model": "jina-embeddings-v3",
            "input": [text],
        },
        timeout=60,
    )

    response.raise_for_status()

    data = response.json()

    return data["data"][0]["embedding"]


def create_embeddings(texts: list[str]) -> list[list[float]]:
    response = requests.post(
        JINA_EMBEDDING_URL,
        headers=HEADERS,
        json={
            "model": "jina-embeddings-v3",
            "input": texts,
        },
        timeout=120,
    )

    response.raise_for_status()

    data = response.json()

    return [
        item["embedding"]
        for item in data["data"]
    ]
}