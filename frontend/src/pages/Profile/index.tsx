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
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-7xl mx-auto p-6 sm:p-10">
          
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white mb-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center text-5xl font-extrabold shadow-lg border-4 border-white">
              {data.profile.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
                {data.profile.name}
              </h1>
              <p className="text-gray-500 font-medium mb-4 flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {data.profile.email}
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                {data.profile.totalUploads} materiais enviados
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8 border-b border-gray-200 pb-px">
            <button
              onClick={() => setActiveTab("uploads")}
              className={`pb-4 px-2 text-lg font-bold transition-all border-b-4 cursor-pointer ${
                activeTab === "uploads" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Materiais Enviados
            </button>
            {isOwner && (
              <button
                onClick={() => setActiveTab("favorites")}
                className={`pb-4 px-2 text-lg font-bold transition-all border-b-4 cursor-pointer ${
                  activeTab === "favorites" ? "border-yellow-500 text-yellow-600" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Meus Favoritos
              </button>
            )}
          </div>

          {filesToDisplay.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nada por aqui!</h3>
              <p className="text-gray-500">
                {activeTab === "uploads" ? "Este usuário ainda não enviou nenhum material." : "Você ainda não favoritou nenhum material."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filesToDisplay.map((file) => (
                <div
                  key={file.id}
                  onClick={() => navigate(`/files/${file.id}`)}
                  className="group bg-white rounded-3xl shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    {isImage(file.url) ? (
                      <img src={file.url} alt={file.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors duration-300">
                        <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm mt-4">Documento</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="inline-block self-start bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {file.subject.name}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {file.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2">{file.description}</p>
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