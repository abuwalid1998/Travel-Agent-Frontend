import {API_ROUTES} from "../config/apiRoutes.ts";

export async function streamChatResponse(prompt: string, onMessage: (message: string) => void): Promise<void> {
    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
        throw new Error("Auth token not found in localStorage.");
    }

    const response = await fetch(API_ROUTES.CHAT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok || !response.body) {
        throw new Error(`Streaming failed with status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        onMessage(result); // continuously update UI
    }
}
