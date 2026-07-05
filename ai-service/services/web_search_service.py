from tavily import TavilyClient

from config import TAVILY_API_KEY
from core.llm import generate
from prompts.web_search_prompt import SYSTEM_PROMPT

client = TavilyClient(api_key=TAVILY_API_KEY)


def web_search(query: str):
    """
    Search the web and generate an AI answer.
    """

    results = client.search(
        query=query,
        search_depth="advanced",
        max_results=5,
    )

    context = []

    for item in results.get("results", []):
        context.append(
            f"""
Title: {item['title']}

Source: {item['url']}

Content:
{item['content']}
"""
        )

    user_prompt = f"""
Question

{query}

Web Search Results

{chr(10).join(context)}

Answer using ONLY the web search results.

At the end include:

Sources

listing all websites used.
"""

    answer = generate(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=user_prompt,
        temperature=0.2,
    )

    return {
        "answer": answer,
        "sources": [
            {
                "title": item["title"],
                "url": item["url"],
            }
            for item in results.get("results", [])
        ],
    }