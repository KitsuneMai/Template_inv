import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso:", data);
          // Login exitoso:
        window.location.href = "/"; // fuerza recarga completa, se vuelve a montar todo y se toma la cookie

        setTimeout(() => navigate("/"), 0); // Redirige al dashboard
      } else {
        setErrorMessage(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setErrorMessage("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-md rounded">
        <h2 className="text-xl font-semibold text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3 w-full p-2 border border-gray-300 rounded"
            required
          />
          <CustomButton
            type="submit"
            disabled={loading}
            label={loading ? "Cargando..." : "Login"}
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded transition-colors"
            size="lg"
          />
        </form>
        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}
        <Link
          to="/register"
          className="block mt-4 text-center text-blue-500 hover:underline"
        >
          Registrarme
        </Link>
      </div>
    </div>
  );
}

