import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

interface FileProps {
  id: number;
  title: string;
  description: string;
  url: string;
  filename: string;
  likes: number;
  hasLiked?: boolean;

  subject: {
    name: string;
  };

  user: {
    name: string;
  };
}

interface CommentProps {
  id: number;
  content: string;
  createdAt: string;

  user: {
    id: number;
    name: string;
  };
}

function FileDetails() {
  const { id } = useParams();

  const [file, setFile] = useState<FileProps | null>(null);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

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

  if (!file) {
    return <Loading />;
  }

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
    if (!comment.trim() || isCommenting || !file) {
      return;
    }

    try {
      setIsCommenting(true);

      await api.post(`/files/${file.id}/comments`, {
        content: comment,
      });

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

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="flex-grow max-w-5xl mx-auto w-full p-6 sm:p-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 overflow-hidden">
          {isImage(file.filename) ? (
            <div className="bg-gray-100 flex justify-center border-b border-gray-100">
              <img
                src={file.url}
                alt={file.title}
                className="w-full max-h-[600px] object-contain"
              />
            </div>
          ) : isPdf(file.filename) ? (
            <iframe
              src={file.url}
              title={file.title}
              className="w-full h-[70vh] border-b border-gray-100"
            />
          ) : (
            <div className="w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-100 flex flex-col items-center justify-center">
              <div className="bg-white p-6 rounded-3xl shadow-sm mb-4">
                <svg
                  className="w-16 h-16 text-blue-500"
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
              <p className="text-gray-500 font-medium text-lg">
                Pré-visualização indisponível
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Faça o download para acessar o conteúdo
              </p>
            </div>
          )}

          <div className="p-8 sm:p-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
              {file.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-full">
                <svg
                  className="w-4 h-4"
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
                {file.subject.name}
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[10px] overflow-hidden">
                  👤
                </div>
                {file.user.name}
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {file.description ||
                "Nenhuma descrição fornecida para este material."}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-t border-b border-gray-100 mb-10 w-full">
              <div className="flex items-center gap-2">
                <div className="bg-pink-50 p-2.5 rounded-2xl">
                  <svg
                    className="w-6 h-6 text-pink-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="text-gray-800 font-bold text-xl">
                  {file.likes}{" "}
                  <span className="text-gray-500 font-medium text-base">
                    curtidas
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleLike}
                  className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 active:scale-95 ${
                    file.hasLiked
                      ? "bg-pink-100 text-pink-600 shadow-inner"
                      : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
                  }`}
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
                  {file.hasLiked ? "Descurtir" : "Curtir"}
                </button>

                {(user.name === file.user.name || user.isAdmin) && (
                  <Link
                    to={`/edit-file/${file.id}`}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-yellow-100 hover:text-yellow-700 active:scale-95 transition-all duration-200 flex items-center gap-2"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                    Editar
                  </Link>
                )}

                <button
                  onClick={handleDownload}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center gap-2"
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                  Download
                </button>
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                Comentários ({comments.length})
              </h2>

              <div className="flex flex-col gap-4 mb-10 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <textarea
                  placeholder="Escreva um comentário sobre o material..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleComment}
                    disabled={!comment.trim() || isCommenting}
                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 ${
                      !comment.trim() || isCommenting
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg active:scale-95"
                    }`}
                  >
                    {isCommenting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5"
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
                        Enviando...
                      </>
                    ) : (
                      "Publicar Comentário"
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {comments.length === 0 ? (
                  <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center flex flex-col items-center shadow-sm">
                    <div className="bg-gray-50 p-4 rounded-full mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-gray-800 font-bold text-lg mb-1">
                      Nenhum comentário ainda
                    </p>
                    <p className="text-gray-500 text-sm">
                      Seja o primeiro a compartilhar sua opinião ou dúvida sobre
                      este material!
                    </p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                            {comment.user.name.charAt(0).toUpperCase()}
                          </div>
                          <strong className="text-gray-800">
                            {comment.user.name}
                          </strong>
                        </div>

                        <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-gray-600 leading-relaxed pl-11">
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileDetails;
