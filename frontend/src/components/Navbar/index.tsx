import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("@user") || "{}");

  function handleLogout() {
    localStorage.removeItem("@token");
    localStorage.removeItem("@user");

    navigate("/");
  }

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <>
      <div className="bg-blue-600 text-white p-4 flex items-center shadow-md">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            text-3xl
            mr-4
            hover:scale-110
            transition
            duration-200
            cursor-pointer
          "
        >
          ☰
        </button>

        <h1 className="text-2xl font-bold">DisciplinasUFLA</h1>
      </div>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div
            className="
            fixed
            top-0
            left-0
            w-72
            h-full
            bg-white
            shadow-2xl
            z-50
            flex
            flex-col
            justify-between
          "
          >
            <div>
              <div className="p-6 border-b">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="
                    text-2xl
                    hover:text-red-500
                    transition
                    cursor-pointer
                  "
                >
                  ✕
                </button>

                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                  "
                  >
                    {user.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Logado como</p>

                    <p className="font-semibold text-gray-800">{user.name}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <Link
                  to="/home"
                  onClick={() => setMenuOpen(false)}
                  className={`
                    p-3
                    rounded-lg
                    transition
                    font-medium

                    ${
                      isActive("/home")
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  Home
                </Link>

                <Link
                  to="/upload"
                  onClick={() => setMenuOpen(false)}
                  className={`
                    p-3
                    rounded-lg
                    transition
                    font-medium

                    ${
                      isActive("/upload")
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  Upload
                </Link>
              </div>
            </div>

            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="
                  w-full
                  text-left
                  p-3
                  rounded-lg
                  text-red-600
                  font-medium
                  cursor-pointer
                  hover:bg-red-50
                  hover:text-red-700
                  hover:scale-[1.02]
                  hover:shadow-md
                  active:scale-95
                  transition
                  duration-200
                "
              >
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
