import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";

import api from "../../services/api";

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

function FileDetails() {

  const { id } = useParams();

  const [file, setFile] = useState<FileProps | null>(null);

  useEffect(() => {

    async function loadFile() {

      try {

        const response = await api.get(`/files/${id}`);

        setFile(response.data);

      } catch (error) {

        console.log(error);

      }

    }

    loadFile();

  }, [id]);

  if (!file) {

    return (
      <div>
        Carregando...
      </div>
    );

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

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="
        max-w-4xl
        mx-auto
        p-8
      ">

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          overflow-hidden
        ">

          {isImage(file.filename) ? (

          <img
            src={file.url}
            alt={file.title}
            className="
              w-full
              h-[500px]
              object-cover
            "
          />

        ) : (
        
          <div
            className="
              w-full
              h-[500px]
              bg-gray-200
              flex
              items-center
              justify-center
              text-8xl
            "
          >
            📄
          </div>

        )}

          <div className="p-8">

            <h1 className="
              text-4xl
              font-bold
              text-gray-800
              mb-4
            ">
              {file.title}
            </h1>

            <p className="
              text-gray-600
              text-lg
              mb-6
            ">
              {file.description}
            </p>

            <div className="space-y-2 mb-6">

              <p>
                <span className="font-semibold">
                  Matéria:
                </span>{" "}
                {file.subject.name}
              </p>

              <p>
                <span className="font-semibold">
                  Usuário:
                </span>{" "}
                {file.user.name}
              </p>

            </div>

            <div className="
              flex
              items-center
              justify-between
            ">

              <span className="
                text-pink-600
                font-bold
                text-xl
              ">
                ❤️ {file.likes} curtidas
              </span>

              <a
                href={file.url}
                target="_blank"
                className="
                  bg-blue-600
                  text-white
                  px-6
                  py-3
                  rounded-lg
                  font-bold
                  hover:bg-blue-700
                  transition
                "
              >
                Download
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FileDetails;