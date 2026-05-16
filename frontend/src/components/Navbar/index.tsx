import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem("@token");
    localStorage.removeItem("@user");

    navigate("/");

  }

  return (
    <>
      <div className="bg-blue-600 text-white p-4 flex items-center">

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl mr-4"
        >
          ☰
        </button>

        <h1 className="text-2xl font-bold">
          SoftwareWeb
        </h1>

      </div>

      {menuOpen && (

        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 z-50">

          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl mb-8"
          >
            ✕
          </button>

          <div className="flex flex-col gap-6 text-lg">

            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/upload"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600"
            >
              Upload
            </Link>

            <button
              onClick={handleLogout}
              className="text-left hover:text-red-600"
            >
              Sair
            </button>

          </div>

        </div>

      )}

    </>
  );
}

export default Navbar;