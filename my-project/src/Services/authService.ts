import {API_ROUTES} from "../config/apiRoutes";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(API_ROUTES.LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(message || "Invalid username or password");
        }

        return await response.json(); // should contain token or user info
    } catch (error: any) {
        throw new Error(error.message || "Login failed");
    }
};
