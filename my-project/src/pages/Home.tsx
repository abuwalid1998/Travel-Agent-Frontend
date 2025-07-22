import React, { useEffect, useState } from "react";
import { streamChatResponse } from "../Services/chatService";
import { saveChat } from "../Services/saveChatService";
import { Loader2 } from "lucide-react";
import NavBar from "../components/NavBar.tsx";
import {API_ROUTES} from "../config/apiRoutes.ts"; // optional spinner icon

interface ChatMessage {
    prompt: string;
    response: string;
    timestamp?: string;
}

const ChatInterface: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchHistory = async () => {
        try {
            const authToken = localStorage.getItem("auth_token");
            const res = await fetch(API_ROUTES.GET_CHATS, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setChatHistory(data.reverse()); // show latest first
            } else {
                console.error("Failed to fetch chat history.");
            }
        } catch (err) {
            console.error("Error loading chat history:", err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleAsk = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setResponse("");

        try {
            await streamChatResponse(prompt, (partial) => {
                setResponse(partial); // live update
            });

            const chat: ChatMessage = {
                prompt,
                response,
                timestamp: new Date().toISOString(),
            };

            await saveChat(chat);
            setChatHistory([chat, ...chatHistory]);
            setPrompt("");
        } catch (err) {
            console.error("Error during chat:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="h-screen w-full flex bg-gray-100 font-sans">
                {/* Sidebar */}
                <aside className="w-1/4 min-w-[260px] bg-white shadow-lg p-6 overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2">📜 History</h2>
                    {chatHistory.length === 0 && <p className="text-gray-500">No history yet.</p>}
                    {chatHistory.map((chat, index) => (
                        <div key={index} className="mb-4">
                            <div className="font-medium text-blue-700">Q: {chat.prompt}</div>
                            <div className="text-gray-700 text-sm mt-1 whitespace-pre-wrap">A: {chat.response}</div>
                            <hr className="my-3 border-gray-300" />
                        </div>
                    ))}
                </aside>

                {/* Main Panel */}
                <main className="flex-1 p-8 flex flex-col relative">
                    {/* Header */}
                    <header className="sticky top-0 bg-white shadow-md z-10 px-4 py-3 mb-6 rounded-md border">
                        <h1 className="text-3xl font-bold text-blue-800">💬 AI Assistant</h1>
                    </header>

                    {/* Chat Box */}
                    <section className="flex-1 flex flex-col justify-between">
                        <div className="bg-white p-6 rounded-lg shadow border mb-6 flex-1">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">AI Response</h2>
                            <div className="min-h-[150px] whitespace-pre-wrap text-gray-700">
                                {loading ? (
                                    <div className="flex items-center space-x-2 text-blue-500">
                                        <Loader2 className="animate-spin" /> <span>Waiting for response...</span>
                                    </div>
                                ) : response ? (
                                    response
                                ) : (
                                    <p className="text-gray-400">Response will appear here...</p>
                                )}
                            </div>
                        </div>

                        {/* Input Form */}
                        <div className="bg-white p-6 rounded-lg shadow border">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="Ask me anything..."
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-gray-800"
            />

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleAsk}
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {loading ? "Asking..." : "Ask"}
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>

    );
};

export default ChatInterface;
