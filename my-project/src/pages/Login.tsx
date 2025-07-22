import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../Services/authService.ts";
import NavBar from "../components/NavBar.tsx";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            navigate("/ChatInterface");
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <NavBar/>
            <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        alt="Travel Agent Frontend"
                        src="/logo.png"
                        className="mx-auto h-25 w-auto"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            {error && <p className="text-red-600 text-sm">{error}</p>}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
export default Login;