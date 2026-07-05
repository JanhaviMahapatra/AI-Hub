import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import PDFChat from "./pages/PDFChat";
import ResumeReviewer from "./pages/ResumeReviewer";
import CodeReviewer from "./pages/CodeReviewer";
import NotesSummarizer from "./pages/NotesSummarizer";
import FormAutofill from "./pages/FormAutofill";
import StudyAssistant from "./pages/StudyAssistant";
import WebSearch from "./pages/WebSearch";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pdf-chat"
                    element={
                        <ProtectedRoute>
                            <PDFChat />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume-reviewer"
                    element={
                        <ProtectedRoute>
                            <ResumeReviewer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/code-reviewer"
                    element={
                        <ProtectedRoute>
                        <CodeReviewer />   
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notes-summarizer"
                    element={
                        <ProtectedRoute>
                           <NotesSummarizer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/form-autofill"
                    element={
                        <ProtectedRoute>
                         <FormAutofill />   
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/study-assistant"
                    element={
                        <ProtectedRoute>
                            <StudyAssistant/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/web-search"
                    element={
                        <ProtectedRoute>
                            <WebSearch />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;