from io import BytesIO

from pypdf import PdfReader


def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extract all text from a PDF file.

    Args:
        file_bytes: Raw PDF bytes.

    Returns:
        Extracted text as a single string.
    """

    pdf = PdfReader(BytesIO(file_bytes))

    text = []

    for page in pdf.pages:
        page_text = page.extract_text()

        if page_text:
            text.append(page_text)

    return "\n".join(text)