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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Seus Favoritos ❤️
        </h1>

        {files.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-6xl mb-4">💔</p>

            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Nenhum favorito ainda
            </h2>

            <p className="text-gray-500">
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
                  bg-white
                  rounded-2xl
                  shadow-lg
                  overflow-hidden
                  hover:shadow-xl
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  transition
                  duration-300
                  cursor-pointer
                "
              >
                {isImage(file.url) ? (
                  <img
                    src={file.url}
                    alt={file.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div
                    className="
                      w-full
                      h-56
                      bg-gray-200
                      flex
                      items-center
                      justify-center
                      text-6xl
                    "
                  >
                    📄
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {file.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3 min-h-[72px]">
                    {file.description}
                  </p>

                  <div className="space-y-2">
                    <div
                      className="
                        inline-block
                        bg-blue-100
                        text-blue-700
                        text-sm
                        font-semibold
                        px-3
                        py-1
                        rounded-full
                      "
                    >
                      {file.subject.name}
                    </div>

                    <p className="text-gray-500">{file.user.name}</p>

                    <p className="text-pink-600 font-bold">❤️ {file.likes}</p>
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
