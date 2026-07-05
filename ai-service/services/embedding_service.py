from sentence_transformers import SentenceTransformer

from config import EMBEDDING_MODEL

embedding_model = SentenceTransformer(EMBEDDING_MODEL)


def create_embedding(text: str) -> list[float]:
    embedding = embedding_model.encode(
        text,
        normalize_embeddings=True,
    )

    return embedding.tolist()


def create_embeddings(texts: list[str]) -> list[list[float]]:
    embeddings = embedding_model.encode(
        texts,
        normalize_embeddings=True,
    )

    return embeddings.tolist()