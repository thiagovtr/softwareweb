import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

interface SubjectProps {
  id: number;
  name: string;
}

function Upload() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [subjects, setSubjects] = useState<SubjectProps[]>([]);

  useEffect(() => {

    api.get("/subjects")
      .then((response) => {
        setSubjects(response.data);
      });

  }, []);

  async function handleUpload() {

    try {

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("subjectId", subjectId);

      if (file) {
        formData.append("file", file);
      }

      await api.post("/files/upload", formData);

      setTitle("");
      setDescription("");
      setSubjectId("");
      setFile(null);

      alert("Arquivo enviado!");

    } catch (error) {

      console.log(error);

      alert("Erro ao enviar arquivo");

    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <Navbar />
      
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Upload
        </h1>

        <input
          type="text"
          placeholder="Título"
          className="w-full border rounded-lg p-3 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          className="w-full border rounded-lg p-3 mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full border rounded-lg p-3 mb-4"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >

          <option value="">
            Selecione uma matéria
          </option>

          {subjects.map((subject) => (
            <option
              key={subject.id}
              value={subject.id}
            >
              {subject.name}
            </option>
          ))}

        </select>

        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition mb-4">

          <span className="text-gray-600 font-medium">
            Clique para selecionar um arquivo
          </span>

          {file && (
            <span className="mt-2 text-blue-600 text-sm">
              {file.name}
            </span>
          )}

          <input
            type="file"
            className="hidden"
            onChange={(e) => {
            
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            
            }}
          />

        </label>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700"
        >
          Enviar
        </button>

      </div>

    </div>
  );
}

export default Upload;