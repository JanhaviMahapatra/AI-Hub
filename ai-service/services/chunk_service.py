from langchain_text_splitters import RecursiveCharacterTextSplitter

from config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=CHUNK_SIZE,
    chunk_overlap=CHUNK_OVERLAP,
    separators=[
        "\n\n",
        "\n",
        ". ",
        " ",
        "",
    ],
)


def split_text(text: str) -> list[str]:
    return text_splitter.split_text(text)