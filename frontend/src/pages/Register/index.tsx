import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister() {
    if (!email.endsWith("@estudante.ufla.br")) {
      toast.error("Use um e-mail institucional da UFLA");
      return;
    }

    try {
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem");
        return;
      }

      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      localStorage.setItem("@token", response.data.token);
      localStorage.setItem("@user", JSON.stringify(response.data.user));

      navigate("/home");
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Erro ao criar conta");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Criar Conta
        </h1>

        <input
          type="text"
          placeholder="Nome"
          className="w-full border rounded-lg p-3 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Confirme sua senha"
          className="w-full border rounded-lg p-3 mb-6"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 hover:scale-[1.02] transition duration-200"
        >
          Criar Conta
        </button>

        <p className="text-center text-gray-600 mt-6">
          Já possui conta?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
