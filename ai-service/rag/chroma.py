import chromadb

from config import (
    CHROMA_DB_PATH,
    COLLECTION_NAME,
)

client = chromadb.PersistentClient(
    path=CHROMA_DB_PATH
)

collection = client.get_or_create_collection(
    name=COLLECTION_NAME
)


def add_documents(
    ids: list[str],
    documents: list[str],
    embeddings: list[list[float]],
    metadatas: list[dict],
):
    """
    Store chunks together with metadata.
    """

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas,
    )


def search_documents(
    embedding: list[float],
    where: dict | None = None,
    n_results: int = 5,
):
    """
    Semantic search with optional metadata filtering.
    """

    return collection.query(
        query_embeddings=[embedding],
        where=where,
        n_results=n_results,
    )


def delete_documents(
    where: dict,
):
    """
    Delete documents matching metadata.
    """

    collection.delete(
        where=where,
    )


def get_documents(
    where: dict | None = None,
):
    """
    Retrieve stored documents.
    """

    return collection.get(
        where=where,
    )


def clear_collection():
    """
    Delete the entire collection.
    """

    global collection

    try:
        client.delete_collection(COLLECTION_NAME)
    except Exception:
        pass

    collection = client.get_or_create_collection(
        name=COLLECTION_NAME
    )