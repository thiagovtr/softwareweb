import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

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
    name: string;
  };
}

function Home() {
  const [files, setFiles] = useState<FileProps[]>([]);

  useEffect(() => {
    api
      .get("/files")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleLike(fileId: number) {
    try {
      await api.post(`/files/${fileId}/like`);

      const response = await api.get("/files");

      setFiles(response.data);
    } catch (error) {
      console.log(error);

      alert("Erro ao curtir arquivo");
    }
  }

  function isImage(url: string) {
    const lowerCaseUrl = url.toLowerCase();
    return (
      lowerCaseUrl.endsWith(".png") ||
      lowerCaseUrl.endsWith(".jpg") ||
      lowerCaseUrl.endsWith(".jpeg") ||
      lowerCaseUrl.endsWith(".webp")
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Últimos Uploads
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
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
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {file.title}
                </h2>

                <p className="text-gray-600 mb-4">{file.description}</p>

                <div className="space-y-1">
                  <p className="text-gray-500">
                    <span className="font-semibold text-gray-700">
                      Matéria:
                    </span>{" "}
                    {file.subject.name}
                  </p>

                  <p className="text-gray-500">
                    <span className="font-semibold text-gray-700">
                      Usuário:
                    </span>{" "}
                    {file.user.name}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-pink-600 font-bold text-lg">
                    ❤️ {file.likes} curtidas
                  </span>

                  <button
                    onClick={() => handleLike(file.id)}
                    className="
                    bg-pink-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    cursor-pointer
                    hover:bg-pink-600
                    hover:scale-105
                    hover:shadow-lg
                    active:scale-95
                    transition
                    duration-200
                    "
                  >
                    Curtir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
