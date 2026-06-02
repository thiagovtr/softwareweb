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
  isFavorite?: boolean;

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

  async function handleFavorite(fileId: number) {
    try {
      await api.post(`/files/${fileId}/favorite`);

      const response = await api.get(
        `/files?search=${search}&subjectId=${subjectId}`,
      );

      setFiles(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao favoritar arquivo");
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
      customClass: {
        popup: "rounded-3xl dark:bg-gray-800 dark:text-white",
      }
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 z-0 pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 z-0 pointer-events-none transition-colors duration-300"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-7xl mx-auto p-6 sm:p-10">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight mb-3 transition-colors duration-300">
              Descubra novos <span className="text-blue-600 dark:text-blue-400">materiais</span>
            </h1>
          </div>

          <div className="mb-12 bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 transition-colors duration-300">
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
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 transition-all text-gray-700 dark:text-gray-200 font-medium placeholder-gray-400 dark:placeholder-gray-500"
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
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 transition-all text-gray-700 dark:text-gray-200 font-medium appearance-none cursor-pointer"
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
                  className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse transition-colors"
                >
                  <div className="w-full h-52 bg-gray-200 dark:bg-gray-800" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-4" />
                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-full mb-2" />
                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-5/6 mb-6" />
                    <div className="h-6 bg-blue-50 dark:bg-blue-900/30 rounded-full w-1/3 mb-4" />
                    <div className="flex justify-between items-center mt-6">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
                      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-32 bg-white dark:bg-[#1E1E1E] rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 transition-colors">
              <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-gray-400 dark:text-gray-500"
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
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                Ops! Nenhum material encontrado.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
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
                  className="group bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm dark:shadow-none hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    {isImage(file.url) ? (
                      <img
                        src={file.url}
                        alt={file.title}
                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 dark:group-hover:from-blue-900/20 dark:group-hover:to-blue-800/20 transition-colors duration-300">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm mb-3">
                          <svg
                            className="w-10 h-10 text-blue-500 dark:text-blue-400"
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
                        <span className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-sm">
                          Documento
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1.5 transition-colors">
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
                    <div className="inline-block self-start bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-3 transition-colors">
                      {file.subject.name}
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {file.title}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow transition-colors">
                      {file.description || "Sem descrição."}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 transition-colors">
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

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(file.id);
                          }}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                            file.hasLiked
                              ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 shadow-inner"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400"
                          }`}
                          title={file.hasLiked ? "Descurtir" : "Curtir"}
                        >
                          <svg
                            className="w-5 h-5 transition-all"
                            fill={file.hasLiked ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavorite(file.id);
                          }}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                            file.isFavorite
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 shadow-inner"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-600 dark:hover:text-yellow-500"
                          }`}
                          title={
                            file.isFavorite ? "Remover favorito" : "Favoritar"
                          }
                        >
                          <svg
                            className="w-5 h-5 transition-all"
                            fill={file.isFavorite ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z"
                            />
                          </svg>
                        </button>

                        {(user.id === file.user.id || user.isAdmin) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(file.id);
                            }}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 p-2.5 rounded-xl transition-all duration-200"
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