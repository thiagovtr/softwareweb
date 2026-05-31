import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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

interface SubjectProps {
  id: number;
  name: string;
}

function Home() {
  const [files, setFiles] = useState<FileProps[]>([]);
  const [search, setSearch] = useState("");
  const [subjects, setSubjects] = useState<SubjectProps[]>([]);
  const [subjectId, setSubjectId] = useState("");
  const user = JSON.parse(localStorage.getItem("@user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/files?search=${search}&subjectId=${subjectId}`)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, subjectId]);

  useEffect(() => {
    async function loadSubjects() {
      try {
        const response = await api.get("/subjects");

        setSubjects(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadSubjects();
  }, []);

  async function handleLike(fileId: number) {
    try {
      await api.post(`/files/${fileId}/like`);

      const response = await api.get(
        `/files?search=${search}&subjectId=${subjectId}`,
      );

      setFiles(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao curtir arquivo");
    }
  }

  async function handleDelete(fileId: number) {
    const result = await Swal.fire({
      title: "Você realmente deseja excluir o arquivo?",
      text: "Essa ação não poderá ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await api.delete(`/files/${fileId}`);
      toast.success("Arquivo removido com sucesso!");

      const response = await api.get(
        `/files?search=${search}&subjectId=${subjectId}`,
      );

      setFiles(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao excluir arquivo");
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

        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar materiais..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              border
              border-gray-300
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              border
              border-gray-300
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              mt-4
            "
          >
            <option value="">Todas as matérias</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {files.length === 0 ? (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              text-center
              py-20
              text-gray-500
            "
          >
            <div className="text-7xl mb-4">📂</div>

            <h2 className="text-2xl font-bold mb-2">
              Nenhum material encontrado
            </h2>

            <p className="text-lg">
              Tente buscar outro termo ou selecionar outra matéria.
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
                shadow-md
                overflow-hidden
                hover:shadow-xl
                hover:scale-[1.01]
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

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-pink-600 font-bold text-base">
                      ❤️ {file.likes} curtidas
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(file.id);
                        }}
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

                      {(user.id === file.user.id || user.isAdmin) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(file.id);
                          }}
                          className="
                            bg-red-500
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            cursor-pointer
                            hover:bg-red-600
                            hover:scale-105
                            hover:shadow-lg
                            active:scale-95
                            transition
                            duration-200
                          "
                        >
                          Excluir
                        </button>
                      )}
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

export default Home;
