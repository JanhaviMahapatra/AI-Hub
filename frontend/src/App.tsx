import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Summarizer from "./pages/Summarizer";
import AIChat from "./pages/AIChat";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import PDFChat from "./pages/PDFChat";
import FormAutofill from "./pages/FormAutofill";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summarizer" element={<Summarizer />} />
      <Route path="/chat" element={<AIChat />} />
      <Route path="/resume" element={<ResumeAnalyzer />} />
      <Route path="/pdf" element={<PDFChat />} />
      <Route path="/form" element={<FormAutofill />} />
    </Routes>
  );
}

export default App;