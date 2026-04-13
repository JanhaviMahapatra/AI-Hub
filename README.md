# 🚀 AI Hub – All-in-One AI Tools Platform

AI Hub is a modern full-stack web application that brings multiple powerful AI tools together in one place.
Built with a scalable architecture and real AI integrations, it delivers smart automation, document understanding, and productivity tools.

---

## ✨ Features

### 🤖 AI Chat

* Ask anything and get intelligent responses instantly
* Powered by OpenRouter API
* Clean conversational interface

---

### 📄 Resume Analyzer

* Upload your resume (PDF)
* Get AI-powered feedback:

  * Strengths
  * Weaknesses
  * Score out of 10

---

### 📚 Chat with PDF (Semantic Search)

* Upload any PDF
* Ask questions from its content
* Uses **local embeddings + semantic search**
* Understands meaning, not just keywords

---

### 📝 Form Autofill AI

* Enter basic details (name + purpose)
* AI generates full form data:

  * Email
  * Phone
  * Address
  * Description
* Clean formatted output using Markdown

---

### ✂️ Text Summarizer

* Convert long text into short, clear summaries
* Fast and efficient

---

## 🧠 Tech Stack

### Frontend

* React.js (TypeScript)
* Axios
* React Markdown

### Backend

* Node.js + Express
* TypeScript
* Multer (file upload)

### AI & ML

* OpenRouter API (LLM responses)
* Local Embeddings using:

  * `@xenova/transformers`
  * `all-MiniLM-L6-v2` model

---

## ⚙️ How It Works

### 🔍 Semantic PDF Search (RAG Pipeline)

1. Upload PDF
2. Extract text
3. Split into chunks
4. Convert to embeddings
5. Store in memory
6. Query → embedding → similarity search
7. Send context to AI → generate answer

---

## 📁 Project Structure

```
AIHub/
├── frontend/
│   ├── pages/
│   ├── services/
│   └── components/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── src/index.ts
```

---

## 🚀 Installation & Setup

### 1. Clone repo

```
git clone https://github.com/your-username/ai-hub.git
cd ai-hub
```

---

### 2. Backend setup

```
cd backend
npm install
```

Create `.env` file:

```
OPENROUTER_API_KEY=your_api_key_here
PORT=5000
```

Run backend:

```
npm run dev
```

---

### 3. Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 🌐 Usage

* Open: `http://localhost:5173`
* Use different tools from homepage
* Upload PDFs, chat, analyze, generate data

---

## 🔥 Highlights

* ✅ Fully working AI system (not mock)
* ✅ Semantic search (not keyword-based)
* ✅ Local embeddings (no cost)
* ✅ Clean UI + Markdown rendering
* ✅ Multiple AI tools in one platform

---

## ⚠️ Notes

* First run downloads embedding model (~100MB)
* Runs locally after that
* No external vector DB required

---

## 💡 Inspiration

Built as a practical AI project combining:

* RAG (Retrieval Augmented Generation)
* LLM integration
* Real-world use cases

---

## ❤️ Author

**Janhavi Mahapatra**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share it 🚀
