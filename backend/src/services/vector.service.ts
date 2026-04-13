import { pipeline } from "@xenova/transformers";

type Doc = {
  id: string;
  text: string;
  embedding: number[];
};

export class VectorService {
  private static docs: Doc[] = [];
  private static embedder: any;

  // Load model once
  static async init() {
    if (!this.embedder) {
      this.embedder = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
      );
    }
  }

  // Generate embedding
  static async getEmbedding(text: string): Promise<number[]> {
    await this.init();

    const output = await this.embedder(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(output.data);
  }

  // Store document
  static async addDocument(id: string, text: string) {
    const embedding = await this.getEmbedding(text);

    this.docs.push({ id, text, embedding });
  }

  // Cosine similarity
  static cosineSimilarity(a: number[], b: number[]) {
    let dot = 0,
      normA = 0,
      normB = 0;

    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  // Semantic search
  static async queryDocs(query: string): Promise<string> {
    if (!query) return "";

    const queryEmbedding = await this.getEmbedding(query);

    const scored = this.docs.map((doc) => ({
      text: doc.text,
      score: this.cosineSimilarity(queryEmbedding, doc.embedding),
    }));

    const top = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((d) => d.text);

    return top.join("\n---\n");
  }
}