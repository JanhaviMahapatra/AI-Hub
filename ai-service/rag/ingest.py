import uuid

from services.parser_service import extract_text_from_pdf
from services.chunk_service import split_text
from services.embedding_service import create_embeddings

from rag.chroma import add_documents


def ingest_pdf(
    file_bytes: bytes,
    user_id: str,
    filename: str,
):
    """
    Complete RAG ingestion pipeline.

    PDF
      ↓
    Extract Text
      ↓
    Split into Chunks
      ↓
    Generate Embeddings
      ↓
    Create Metadata
      ↓
    Store in ChromaDB
    """

    # Extract text
    text = extract_text_from_pdf(file_bytes)

    if not text.strip():
        raise Exception("No text found in PDF.")

    # Split into chunks
    chunks = split_text(text)

    # Generate embeddings
    embeddings = create_embeddings(chunks)

    # Unique document id
    document_id = str(uuid.uuid4())

    ids = []
    metadatas = []

    for index in range(len(chunks)):
        ids.append(f"{document_id}_{index}")

        metadatas.append(
            {
                "user_id": user_id,
                "document_id": document_id,
                "filename": filename,
                "chunk_index": index,
            }
        )

    add_documents(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas,
    )

    return {
        "document_id": document_id,
        "filename": filename,
        "chunks": len(chunks),
    }