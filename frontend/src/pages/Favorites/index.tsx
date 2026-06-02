import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";
import Loading from "../../components/Loading";

interface FileProps {
  id: number;
  title: string;
  description: string;
  url: string;
  likes: number;

  subject: {
    name: string;
  };

  user: {
    id: number;
    name: string;
  };
}

function Favorites() {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await api.get("/files/favorites/me");

        setFiles(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  function isImage(url: string) {
    const lowerCaseUrl = url.toLowerCase();

    return (
      lowerCaseUrl.endsWith(".png") ||
      lowerCaseUrl.endsWith(".jpg") ||
      lowerCaseUrl.endsWith(".jpeg") ||
      lowerCaseUrl.endsWith(".webp")
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] relative overflow-hidden transition-colors duration-300">
      {/* Background Blobs para manter o padrão das outras telas */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-500 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 pointer-events-none transition-colors duration-300"></div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 transition-colors duration-300">
          Seus Favoritos ❤️
        </h1>

        {files.length === 0 ? (
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 text-center transition-colors duration-300">
            <p className="text-6xl mb-4">💔</p>

            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
              Nenhum favorito ainda
            </h2>

            <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Favorite materiais para encontrá-los aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => navigate(`/files/${file.id}`)}
                className="
                  bg-white dark:bg-[#1E1E1E]
                  rounded-3xl
                  shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
                  border border-gray-100 dark:border-gray-800
                  overflow-hidden
                  hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  cursor-pointer
                  flex flex-col
                "
              >
                {isImage(file.url) ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={file.url}
                      alt={file.title}
                      className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ) : (
                  <div
                    className="
                      w-full
                      h-52
                      bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900
                      flex
                      items-center
                      justify-center
                      text-6xl
                      transition-colors
                      duration-300
                    "
                  >
                    📄
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div
                    className="
                      inline-block
                      self-start
                      bg-blue-50 dark:bg-blue-900/30
                      text-blue-700 dark:text-blue-400
                      text-xs
                      font-bold
                      px-3
                      py-1
                      rounded-full
                      mb-3
                      transition-colors
                      duration-300
                    "
                  >
                    {file.subject.name}
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 transition-colors duration-300">
                    {file.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 min-h-[60px] flex-grow transition-colors duration-300">
                    {file.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${file.user.id}`);
                      }}
                      className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors group/user"
                      title={`Ver perfil de ${file.user.name}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 group-hover/user:bg-blue-100 dark:group-hover/user:bg-blue-900/50 flex items-center justify-center text-xs overflow-hidden transition-colors">
                        👤
                      </div>
                      <span className="truncate max-w-[100px]">
                        {file.user.name}
                      </span>
                    </div>

                    <div className="bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors duration-300">
                      ❤️ {file.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;