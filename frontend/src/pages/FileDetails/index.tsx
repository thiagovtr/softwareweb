import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface FileProps {
  id: number;
  title: string;
  description: string;
  url: string;
  filename: string;
  likes: number;
  hasLiked?: boolean;
  subject: { name: string };
  user: { id: number; name: string };
}

interface CommentProps {
  id: number;
  content: string;
  createdAt: string;
  user: { id: number; name: string };
}

function FileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState<FileProps | null>(null);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("@user") || "{}");

  useEffect(() => {
    async function loadFile() {
      try {
        const response = await api.get(`/files/${id}`);
        setFile(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar arquivo");
      }

      try {
        const commentsResponse = await api.get(`/files/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.log("Erro ao carregar comentários", error);
      }
    }
    loadFile();
  }, [id]);

  function isImage(filename: string) {
    const lowerCaseFilename = filename.toLowerCase();
    return (
      lowerCaseFilename.endsWith(".png") ||
      lowerCaseFilename.endsWith(".jpg") ||
      lowerCaseFilename.endsWith(".jpeg") ||
      lowerCaseFilename.endsWith(".webp")
    );
  }

  function isPdf(filename: string) {
    return filename.toLowerCase().endsWith(".pdf");
  }

  async function handleDownload() {
    if (!file) return;
    try {
      toast.info("Iniciando download...");
      const response = await fetch(file.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Download concluído!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao baixar arquivo");
    }
  }

  async function handleLike() {
    if (!file) return;
    try {
      await api.post(`/files/${file.id}/like`);
      const response = await api.get(`/files/${id}`);
      setFile(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao curtir arquivo");
    }
  }

  async function handleComment() {
    if (!comment.trim() || isCommenting || !file) return;
    try {
      setIsCommenting(true);
      await api.post(`/files/${file.id}/comments`, { content: comment });
      const response = await api.get(`/files/${id}/comments`);
      setComments(response.data);
      setComment("");
      toast.success("Comentário enviado!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao comentar");
    } finally {
      setIsCommenting(false);
    }
  }

  async function handleDelete() {
    if (!file) return;
    const result = await Swal.fire({
      title: "Você realmente deseja excluir o arquivo?",
      text: "Essa ação não poderá ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Excluir",
      cancelButtonText: "Cancelar",
      customClass: { popup: "rounded-3xl dark:bg-gray-800 dark:text-white" },
    });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/files/${file.id}`);
      toast.success("Arquivo removido com sucesso!");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir arquivo");
    }
  }

  if (!file) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex flex-col relative overflow-hidden transition-colors duration-300">
        <Navbar />
        <div className="flex-grow max-w-5xl mx-auto w-full p-6 sm:p-8 relative z-10">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse">
            <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-800"></div>
            <div className="p-8 sm:p-10">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4 mb-6"></div>
              <div className="flex gap-3 mb-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
              </div>
              <div className="space-y-3 mb-10">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] relative overflow-hidden flex flex-col transition-colors duration-300">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-500 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 pointer-events-none transition-colors duration-300"></div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full p-6 sm:p-8 relative z-10">
        <div className="bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-md rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
          {isImage(file.filename) ? (
            <div className="bg-gray-100 dark:bg-gray-900 flex justify-center border-b border-gray-100 dark:border-gray-800 relative group transition-colors duration-300">
              <img
                src={file.url}
                alt={file.title}
                onClick={() => setLightboxOpen(true)}
                className="w-full max-h-[600px] object-contain cursor-zoom-in hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="bg-black/50 text-white px-4 py-2 rounded-full font-medium backdrop-blur-sm">
                   Clicar para ampliar
                 </div>
              </div>
            </div>
          ) : isPdf(file.filename) ? (
            <iframe
              src={file.url}
              title={file.title}
              className="w-full h-[70vh] border-b border-gray-100 dark:border-gray-800 transition-colors duration-300"
            />
          ) : (
            <div className="w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center transition-colors duration-300">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm mb-4 transition-colors duration-300">
                <svg className="w-16 h-16 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg transition-colors duration-300">Pré-visualização indisponível</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 transition-colors duration-300">Faça o download para acessar o conteúdo</p>
            </div>
          )}

          <div className="p-8 sm:p-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight transition-colors duration-300">
              {file.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold px-4 py-2 rounded-full transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                {file.subject.name}
              </div>
              <Link to={`/profile/${file.user.id}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-400 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer" title="Ver perfil do autor">
                <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-[10px] overflow-hidden transition-colors">👤</div>
                {file.user.name}
              </Link>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 transition-colors duration-300">
              {file.description || "Nenhuma descrição fornecida para este material."}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-t border-b border-gray-100 dark:border-gray-800 mb-10 w-full transition-colors duration-300">
              <div className="flex items-center gap-2">
                <div className="bg-pink-50 dark:bg-pink-900/30 p-2.5 rounded-2xl transition-colors duration-300">
                  <svg className="w-6 h-6 text-pink-500 dark:text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                </div>
                <span className="text-gray-800 dark:text-gray-100 font-bold text-xl transition-colors duration-300">{file.likes} <span className="text-gray-500 dark:text-gray-400 font-medium text-base">curtidas</span></span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={handleLike} className={`px-6 py-3 rounded-xl cursor-pointer font-bold flex items-center gap-2 transition-all duration-200 active:scale-95 ${file.hasLiked ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 shadow-inner" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400"}`}>
                  <svg className="w-5 h-5" fill={file.hasLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  {file.hasLiked ? "Descurtir" : "Curtir"}
                </button>

                {(user.id === file.user.id || user.isAdmin) && (
                  <>
                    <Link to={`/edit-file/${file.id}`} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-bold hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-500 active:scale-95 transition-all duration-200 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      Editar
                    </Link>
                    <button onClick={handleDelete} className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-700 dark:hover:text-red-300 active:scale-95 transition-all duration-200 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      Excluir
                    </button>
                  </>
                )}

                <button onClick={handleDownload} className="bg-blue-600 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download
                </button>
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                Comentários ({comments.length})
              </h2>

              <div className="flex flex-col gap-4 mb-10 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <textarea
                  placeholder="Escreva um comentário sobre o material..."
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <button onClick={handleComment} disabled={!comment.trim() || isCommenting} className={`px-8 py-3 rounded-xl cursor-pointer font-bold flex items-center gap-2 transition-all duration-200 ${!comment.trim() || isCommenting ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg active:scale-95"}`}>
                    {isCommenting ? "Enviando..." : "Publicar Comentário"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {comments.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl p-10 text-center flex flex-col items-center shadow-sm transition-colors duration-300">
                    <p className="text-gray-800 dark:text-gray-300 font-bold text-lg mb-1">Nenhum comentário ainda</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <Link to={`/profile/${comment.user.id}`} className="flex items-center gap-3 group/commenter cursor-pointer" title="Ver perfil">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover/commenter:bg-blue-600 dark:group-hover/commenter:bg-blue-500 group-hover/commenter:text-white transition-colors flex items-center justify-center font-bold text-sm">
                            {comment.user.name.charAt(0).toUpperCase()}
                          </div>
                          <strong className="text-gray-800 dark:text-gray-200 group-hover/commenter:text-blue-600 dark:group-hover/commenter:text-blue-400 transition-colors">{comment.user.name}</strong>
                        </Link>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-700 transition-colors">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-11 transition-colors">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- O MODAL DO LIGHTBOX --- */}
      {lightboxOpen && isImage(file.filename) && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setLightboxOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors p-2 cursor-pointer"
            onClick={() => setLightboxOpen(false)}
            title="Fechar (Esc)"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <img 
            src={file.url} 
            alt={file.title} 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}

export default FileDetails;