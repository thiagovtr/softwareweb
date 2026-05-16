import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

interface FileProps {
  id: number;
  title: string;
  description: string;
  url: string;
  likes: number;

  subject: {
    name: string;
  };

  user: {
    name: string;
  };
}

function Home() {

  const [files, setFiles] = useState<FileProps[]>([]);

  useEffect(() => {

    api.get("/files")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
    
      <Navbar />
    
      <div className="p-8">
    
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Últimos Uploads
        </h1>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
            
              <img
                src={file.url}
                alt={file.title}
                className="w-full h-56 object-cover"
              />
  
              <div className="p-5">
          
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {file.title}
                </h2>
          
                <p className="text-gray-600 mb-4">
                  {file.description}
                </p>
          
                <div className="space-y-1">
          
                  <p className="text-gray-500">
                    <span className="font-semibold text-gray-700">
                      Matéria:
                    </span>{" "}
                    {file.subject.name}
                  </p>
          
                  <p className="text-gray-500">
                    <span className="font-semibold text-gray-700">
                      Usuário:
                    </span>{" "}
                    {file.user.name}
                  </p>
          
                </div>
          
                <div className="mt-5 text-pink-600 font-bold text-lg">
                  ❤️ {file.likes} curtidas
                </div>
          
              </div>
          
            </div>
          ))}
  
        </div>
        
      </div>
        
    </div>
  );
}

export default Home;