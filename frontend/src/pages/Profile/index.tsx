import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

interface FileProps {
  id: number;
  title: string;
  description: string;
  url: string;
  likes: number;
  hasLiked?: boolean;
  isFavorite?: boolean;
  subject: { name: string };
  user: { id: number; name: string };
}

interface ProfileData {
  profile: {
    id: number;
    name: string;
    email: string;
    totalUploads: number;
  };
  uploadedFiles: FileProps[];
  favoriteFiles: FileProps[];
}

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"uploads" | "favorites">("uploads");
  
  const currentUser = JSON.parse(localStorage.getItem("@user") || "{}");
  const isOwner = currentUser.id === Number(id);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const response = await api.get(`/users/${id}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar perfil do usuário");
        navigate("/home");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id, navigate]);

  function isImage(url: string) {
    const lowerCaseUrl = url.toLowerCase();
    return (
      lowerCaseUrl.endsWith(".png") ||
      lowerCaseUrl.endsWith(".jpg") ||
      lowerCaseUrl.endsWith(".jpeg") ||
      lowerCaseUrl.endsWith(".webp")
    );
  }

  if (loading) return <Loading />;
  if (!data) return null;

  const filesToDisplay = activeTab === "uploads" ? data.uploadedFiles : data.favoriteFiles;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 z-0 pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 z-0 pointer-events-none transition-colors duration-300"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-7xl mx-auto p-6 sm:p-10">
          
          <div className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white dark:border-gray-800 mb-10 flex flex-col sm:flex-row items-center gap-8 transition-colors duration-300">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center text-5xl font-extrabold shadow-lg border-4 border-white dark:border-[#1E1E1E]">
              {data.profile.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight mb-2 transition-colors duration-300">
                {data.profile.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-4 flex items-center justify-center sm:justify-start gap-2 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {data.profile.email}
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl font-bold text-sm transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                {data.profile.totalUploads} materiais enviados
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-px transition-colors duration-300">
            <button
              onClick={() => setActiveTab("uploads")}
              className={`pb-4 px-2 text-lg font-bold transition-all border-b-4 cursor-pointer ${
                activeTab === "uploads" 
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400" 
                  : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              Materiais Enviados
            </button>
            {isOwner && (
              <button
                onClick={() => setActiveTab("favorites")}
                className={`pb-4 px-2 text-lg font-bold transition-all border-b-4 cursor-pointer ${
                  activeTab === "favorites" 
                    ? "border-yellow-500 text-yellow-600 dark:text-yellow-500 dark:border-yellow-500" 
                    : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                Meus Favoritos
              </button>
            )}
          </div>

          {filesToDisplay.length === 0 ? (
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-16 text-center border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center transition-colors duration-300">
              <span className="text-6xl mb-4 block">👻</span>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300">Nada por aqui!</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 transition-colors duration-300">
                {activeTab === "uploads" 
                  ? "Este usuário ainda não enviou nenhum material para a comunidade." 
                  : "Você ainda não favoritou nenhum material. Explore a plataforma para encontrar conteúdos para estudar!"}
              </p>
              
              <button 
                onClick={() => navigate(activeTab === "uploads" ? "/upload" : "/home")}
                className="bg-blue-600 dark:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-700 transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                {activeTab === "uploads" ? (
                  <>
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                     Fazer primeiro envio
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    Explorar Materiais
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filesToDisplay.map((file) => (
                <div
                  key={file.id}
                  onClick={() => navigate(`/files/${file.id}`)}
                  className="group bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-800 overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    {isImage(file.url) ? (
                      <img src={file.url} alt={file.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 dark:group-hover:from-blue-900/20 dark:group-hover:to-blue-800/20 transition-colors duration-300">
                        <span className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-sm mt-4 transition-colors">Documento</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="inline-block self-start bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-3 transition-colors">
                      {file.subject.name}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {file.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 transition-colors">{file.description}</p>
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

export default Profile;