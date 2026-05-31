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
  hasLiked?: boolean;

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFiles() {
      try {
        setLoading(true);

        const response = await api.get(
          `/files?search=${search}&subjectId=${subjectId}`,
        );

        setFiles(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadFiles();
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
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-7xl mx-auto p-6 sm:p-10">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-3">
              Descubra novos <span className="text-blue-600">materiais</span>
            </h1>
          </div>

          <div className="mb-12 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Busque por resumos, exercícios, slides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 font-medium placeholder-gray-400"
              />
            </div>

            <div className="relative md:w-1/3 min-w-[250px]">
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  ></path>
                </svg>
              </div>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 font-medium appearance-none cursor-pointer"
              >
                <option value="">Todas as matérias</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
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
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden animate-pulse"
                >
                  <div className="w-full h-52 bg-gray-200" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4" />
                    <div className="h-4 bg-gray-100 rounded-full w-full mb-2" />
                    <div className="h-4 bg-gray-100 rounded-full w-5/6 mb-6" />
                    <div className="h-6 bg-blue-50 rounded-full w-1/3 mb-4" />
                    <div className="flex justify-between items-center mt-6">
                      <div className="h-5 bg-gray-200 rounded-full w-20" />
                      <div className="h-10 bg-gray-200 rounded-xl w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Ops! Nenhum material encontrado.
              </h2>
              <p className="text-gray-500 max-w-md">
                Não conseguimos achar nada com a sua busca atual. Tente usar
                outros termos ou mudar o filtro da disciplina.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => navigate(`/files/${file.id}`)}
                  className="group bg-white rounded-3xl shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    {isImage(file.url) ? (
                      <img
                        src={file.url}
                        alt={file.title}
                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors duration-300">
                        <div className="bg-white p-4 rounded-2xl shadow-sm mb-3">
                          <svg
                            className="w-10 h-10 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm">
                          Documento
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5 text-pink-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {file.likes}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="inline-block self-start bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {file.subject.name}
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {file.title}
                    </h2>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                      {file.description || "Sem descrição."}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs overflow-hidden">
                          👤
                        </div>
                        <span className="truncate max-w-[100px]">
                          {file.user.name}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(file.id);
                          }}
                          className={`p-2.5 rounded-xl transition-all duration-200 ${
                            file.hasLiked
                              ? "bg-pink-100 text-pink-600 shadow-inner"
                              : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
                          }`}
                          title={file.hasLiked ? "Descurtir" : "Curtir"}
                        >
                          <svg
                            className="w-5 h-5"
                            fill={file.hasLiked ? "currentColor" : "none"}
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
                        </button>

                        {(user.id === file.user.id || user.isAdmin) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(file.id);
                            }}
                            className="bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 p-2.5 rounded-xl transition-all duration-200"
                            title="Excluir"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
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
    </div>
  );
}

export default Home;
