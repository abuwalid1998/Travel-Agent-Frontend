import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token-id");
        setIsLoggedIn(!!token);
    }, []);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            localStorage.removeItem("token-id");
            setIsLoggedIn(false);
            navigate("/login");
        } else {
            navigate("/");
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Left spacer for layout symmetry */}
                <div className="w-24 hidden sm:block" />

                {/* Centered Logo */}
                <div className="flex items-center justify-center flex-1">
                    <div className="flex items-center space-x-2">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-8 w-auto"
                        />
                        <span className="text-xl font-semibold text-[#1e3a8a]">Travel Agent</span>
                    </div>
                </div>

                {/* Login/Logout Button */}
                <div className="w-24 flex justify-end">
                    <button
                        onClick={handleButtonClick}
                        className="bg-[#1e3a8a] text-white px-4 py-2 rounded-md text-sm hover:bg-[#223d9a] transition"
                    >
                        {isLoggedIn ? "Logout" : "Login"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
