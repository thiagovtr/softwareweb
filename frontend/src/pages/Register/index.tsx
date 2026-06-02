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

    if (password.length < 6) {
      toast.error("A senha deve conter no mínimo 6 caracteres");
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

      toast.success("Conta criada com sucesso!");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full max-w-md relative z-10 border border-white/20">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 14l9-5-9-5-9 5 9 5z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-800 tracking-tight">
          Crie sua conta
        </h1>

        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Seu nome completo"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <input
            type="email"
            placeholder="E-mail institucional (@estudante.ufla.br)"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <input
            type="password"
            placeholder="Crie uma senha"
            minLength={6} 
            className="w-full border border-gray-200 bg-gray-50 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </div>
          <input
            type="password"
            placeholder="Confirme sua senha"
            minLength={6} 
            className="w-full border border-gray-200 bg-gray-50 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold cursor-pointer hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200 flex justify-center items-center gap-2"
        >
          Finalizar Cadastro
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            ></path>
          </svg>
        </button>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-gray-600">
            Já possui conta?{" "}
            <Link
              to="/"
              className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors cursor-pointer"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;