import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface FileProps {
  id: number;
  title: string;
  description: string;
  url: string;
  filename: string;
  likes: number;

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

      const commentsResponse = await api.get(`/files/${id}/comments`);

      setComments(commentsResponse.data);
    }

    loadFile();
  }, [id]);

  if (!file) {
    return <div>Carregando...</div>;
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

      toast.success("Download iniciado");
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
    if (!comment.trim()) {
      return;
    }

    try {
      await api.post(`/files/${file?.id}/comments`, {
        content: comment,
      });

      const response = await api.get(`/files/${id}/comments`);

      setComments(response.data);

      setComment("");

      toast.success("Comentário enviado!");
    } catch (error) {
      console.log(error);

      toast.error("Erro ao comentar");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {isImage(file.filename) ? (
            <div className="bg-gray-100 flex justify-center">
              <img
                src={file.url}
                alt={file.title}
                className="w-full max-h-[700px] object-contain"
              />
            </div>
          ) : isPdf(file.filename) ? (
            <iframe
              src={file.url}
              title={file.title}
              className="w-full h-[700px] border-0"
            />
          ) : (
            <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center text-8xl">
              📄
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {file.title}
            </h1>

            <p className="text-gray-600 text-lg mb-6">{file.description}</p>

            <div className="space-y-2 mb-8">
              <p>
                <span className="font-semibold">Matéria:</span>{" "}
                {file.subject.name}
              </p>
              <p>
                <span className="font-semibold">Usuário:</span> {file.user.name}
              </p>
            </div>

            {/* BARRA DE AÇÕES (Curtidas e Botões) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 w-full">
              <span className="text-pink-600 font-bold text-xl">
                ❤️ {file.likes} curtidas
              </span>

              <div className="flex gap-3">
                <button
                  onClick={handleLike}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-600 hover:scale-105 hover:shadow-lg active:scale-95 transition duration-200"
                >
                  Curtir
                </button>

                {(user.name === file.user.name || user.isAdmin) && (
                  <Link
                    to={`/edit-file/${file.id}`}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 hover:scale-105 hover:shadow-lg active:scale-95 transition duration-200"
                  >
                    Editar
                  </Link>
                )}

                <button
                  onClick={handleDownload}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95 transition duration-200"
                >
                  Download
                </button>
              </div>
            </div>

            {/* SEÇÃO DE COMENTÁRIOS */}
            <div className="w-full mt-8 border-t pt-8">
              <h2 className="text-2xl font-bold mb-4">Comentários</h2>

              <div className="flex flex-col gap-4 mb-8">
                <textarea
                  placeholder="Escreva um comentário..."
                  className="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button
                  onClick={handleComment}
                  className="self-end bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  Comentar
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 p-5 rounded-xl border border-gray-100"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <strong className="text-gray-800">
                        {comment.user.name}
                      </strong>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}

                {comments.length === 0 && (
                  <p className="text-gray-500 italic text-center py-4">
                    Nenhum comentário ainda. Seja o primeiro a comentar!
                  </p>
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
