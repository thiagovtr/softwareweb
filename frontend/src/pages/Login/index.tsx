import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {

    try {

      const response = await api.post("/login", {
        email,
        password
      });

      localStorage.setItem(
          "@token",
          response.data.token
        );
        
        localStorage.setItem(
          "@user",
          JSON.stringify(response.data.user)
        );

navigate("/home");

    } catch (error) {

      console.log(error);

      alert("Erro no login");

    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          SoftwareWeb
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border rounded-lg p-3 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700"
        >
          Entrar
        </button>

      </div>

    </div>
  );
}

export default Login;