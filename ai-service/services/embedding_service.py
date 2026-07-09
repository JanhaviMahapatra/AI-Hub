from sentence_transformers import SentenceTransformer
from config import EMBEDDING_MODEL

_embedding_model = None


def get_embedding_model():
    global _embedding_model

    if _embedding_model is None:
        _embedding_model = SentenceTransformer(EMBEDDING_MODEL)

    return _embedding_model


def create_embedding(text: str):
    model = get_embedding_model()

    embedding = model.encode(
        text,
        normalize_embeddings=True,
    )

    return embedding.tolist()


def create_embeddings(texts):
    model = get_embedding_model()

    embeddings = model.encode(
        texts,
        normalize_embeddings=True,
    )

    return embeddings.tolist()