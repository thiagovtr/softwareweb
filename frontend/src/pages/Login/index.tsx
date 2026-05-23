import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("@token", response.data.token);

      localStorage.setItem("@user", JSON.stringify(response.data.user));

      toast.success("Login realizado!");

      navigate("/home");
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Erro no login");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">DisciplinasUFLA</h1>

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

        <p className="text-center text-gray-600 mt-6">
          Não possui conta?{" "}
          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
