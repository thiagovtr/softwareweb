import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

interface SubjectProps {
  id: number;
  name: string;
}

function EditFile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState<SubjectProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setFetchingData(true);
        const subjectsResponse = await api.get("/subjects");
        setSubjects(subjectsResponse.data);

        const fileResponse = await api.get(`/files/${id}`);
        const file = fileResponse.data;

        setTitle(file.title);
        setDescription(file.description || "");
        setSubjectId(String(file.subject.id));
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar arquivo");
      } finally {
        setFetchingData(false);
      }
    }

    loadData();
  }, [id]);

  async function handleUpdate() {
    if (loading) return;

    if (!title || !subjectId) {
      toast.warning("O título e a matéria são obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/files/${id}`, {
        title,
        description,
        subjectId,
      });

      toast.success("Arquivo atualizado com sucesso!");
      navigate(`/files/${id}`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar arquivo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] relative overflow-hidden flex flex-col transition-colors duration-300">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-500 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none transition-colors duration-300"></div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="flex-grow flex items-center justify-center p-8 relative z-10">
        <div className="bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-full max-w-lg border border-white/20 dark:border-gray-800 transition-colors duration-300">
          
          {fetchingData ? (
             <div className="flex flex-col items-center justify-center py-10">
                <svg className="animate-spin h-10 w-10 text-yellow-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-500 dark:text-gray-400 font-medium transition-colors">Carregando dados...</p>
             </div>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full text-yellow-600 dark:text-yellow-500 transition-colors duration-300">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-800 dark:text-gray-100 tracking-tight transition-colors duration-300">
                Editar Material
              </h1>

              <p className="text-center text-gray-500 dark:text-gray-400 mb-8 font-medium transition-colors duration-300">
                Atualize as informações do seu arquivo
              </p>

              <div className="space-y-5 mb-8">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Título do material"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                  </div>
                  <select
                    className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl py-4 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 focus:bg-white dark:focus:bg-gray-800 text-gray-700 dark:text-gray-200 transition-all appearance-none cursor-pointer"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                  >
                    <option value="">Selecione a disciplina</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 dark:text-gray-400">
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

                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                      ></path>
                    </svg>
                  </div>
                  <textarea
                    placeholder="Descrição ou detalhes sobre o conteúdo..."
                    rows={4}
                    className="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-all resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className={`w-full text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all duration-200 ${
                  loading
                    ? "bg-yellow-400 dark:bg-yellow-700 cursor-not-allowed"
                    : "bg-yellow-500 cursor-pointer hover:bg-yellow-600 dark:hover:bg-yellow-600 hover:-translate-y-1 hover:shadow-lg active:scale-95"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Salvando alterações...
                  </>
                ) : (
                  <>
                    Salvar Alterações
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
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditFile;