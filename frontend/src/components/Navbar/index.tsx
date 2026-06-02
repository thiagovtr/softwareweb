import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("@user") || "{}");

  async function handleLogout() {
    const result = await Swal.fire({
      title: "Você realmente quer sair?",
      text: "Será necessário fazer login novamente para acessar os materiais.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sair da conta",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "rounded-3xl",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    localStorage.removeItem("@token");
    localStorage.removeItem("@user");
    navigate("/");
  }

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-xl text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Abrir menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>

              <Link to="/home" className="flex items-center gap-2 group">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  </svg>
                </div>
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight hidden sm:block">
                  Disciplinas<span className="text-blue-600">UFLA</span>
                </h1>
              </Link>
            </div>

            <Link 
              to={`/profile/${user.id}`} 
              className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-all duration-200"
              title="Acessar meu perfil"
            >
              <span className="text-sm font-semibold text-gray-600 hidden sm:block group-hover:text-blue-600 transition-colors">
                Olá, {user.name?.split(" ")[0]}
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center text-lg font-bold shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-80 max-w-[85%] h-full bg-white shadow-2xl z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 relative">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="mt-2 flex flex-col gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                  Logado como
                </p>
                <p className="font-bold text-gray-800 text-lg leading-tight">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate mt-0.5">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-2 mt-2">
            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all duration-200 ${
                isActive("/home")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Página Inicial
            </Link>

            <Link
              to={`/profile/${user.id}`}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all duration-200 ${
                location.pathname.startsWith("/profile")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Meu Perfil
            </Link>

            <Link
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all duration-200 ${
                isActive("/favorites")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              Favoritos
            </Link>

            <Link
              to="/upload"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all duration-200 ${
                isActive("/upload")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              Enviar Material
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl text-red-600 font-bold bg-red-50 hover:bg-red-100 active:scale-95 transition-all duration-200 cursor-pointer"
          >
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Sair da conta
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;