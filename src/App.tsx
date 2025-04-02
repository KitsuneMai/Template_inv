import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";

function App() {
  return (
    <Router>
      <Navbar /> {/* Menú de navegación global */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;



