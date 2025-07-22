import {API_ROUTES} from "../config/apiRoutes.ts";

interface ChatMessage {
    prompt: string;
    response: string;
    timestamp?: string;
}

export async function saveChat(chat: ChatMessage): Promise<void> {
    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
        throw new Error("Auth token not found in localStorage.");
    }

    const response = await fetch(API_ROUTES.SAVE_CHAT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(chat)
    });

    if (!response.ok) {
        throw new Error(`Failed to save chat. Status: ${response.status}`);
    }
}
