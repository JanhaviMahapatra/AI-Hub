from services.embedding_service import create_embedding
from rag.chroma import search_documents


def retrieve_context(
    question: str,
    user_id: str,
    document_id: str,
    n_results: int = 5,
):
    """
    Retrieve the most relevant chunks for a user's question.
    """

    query_embedding = create_embedding(question)

    results = search_documents(
    embedding=query_embedding,
    where={
        "$and": [
            {
                "user_id": user_id,
            },
            {
                "document_id": document_id,
            },
        ]
    },
    n_results=n_results,
)

    documents = results.get("documents", [])

    if not documents:
        return ""

    chunks = documents[0] if documents else []

    return "\n\n".join(chunks)