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

  useEffect(() => {
    async function loadData() {
      try {
        const subjectsResponse = await api.get("/subjects");

        setSubjects(subjectsResponse.data);

        const fileResponse = await api.get(`/files/${id}`);

        const file = fileResponse.data;

        setTitle(file.title);

        setDescription(file.description || "");

        setSubjectId(String(file.subjectId));
      } catch (error) {
        console.log(error);

        toast.error("Erro ao carregar arquivo");
      }
    }

    loadData();
  }, [id]);

  async function handleUpdate() {
    try {
      await api.put(`/files/${id}`, {
        title,
        description,
        subjectId,
      });

      toast.success("Arquivo atualizado!");

      navigate(`/files/${id}`);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao atualizar arquivo");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div
        className="
          flex
          items-center
          justify-center
          p-8
        "
      >
        <div
          className="
            bg-white
            p-8
            rounded-2xl
            shadow-md
            w-full
            max-w-md
          "
        >
          <h1
            className="
              text-3xl
              font-bold
              mb-6
              text-center
              text-gray-800
            "
          >
            Editar Arquivo
          </h1>

          <input
            type="text"
            placeholder="Título"
            className="
              w-full
              border
              rounded-lg
              p-3
              mb-4
            "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição"
            className="
              w-full
              border
              rounded-lg
              p-3
              mb-4
            "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="
              w-full
              border
              rounded-lg
              p-3
              mb-6
            "
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">Selecione uma matéria</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleUpdate}
            className="
              w-full
              bg-yellow-500
              text-white
              p-3
              rounded-lg
              font-bold
              hover:bg-yellow-600
              hover:scale-[1.02]
              transition
              duration-200
              shadow-md
            "
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditFile;
