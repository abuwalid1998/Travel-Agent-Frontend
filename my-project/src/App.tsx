import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ChatInterface from "./pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/ChatInterface" element={<ChatInterface />} />
            </Routes>
        </Router>
    );
}

export default App;
