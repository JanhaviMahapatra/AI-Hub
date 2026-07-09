import os
from dotenv import load_dotenv

load_dotenv()

# LLM Configuration

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("MODEL")

# Web Search Configuration


TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")


# Embedding Configuration


JINA_API_KEY = os.getenv("JINA_API_KEY")


# Chunking Configuration


CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

# ChromaDB Configuration
CHROMA_DB_PATH = os.getenv(
    "CHROMA_DB_PATH",
    "/tmp/chroma_db",
)

COLLECTION_NAME = "documents"