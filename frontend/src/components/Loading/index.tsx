function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
        
        <div className="relative w-24 h-24 flex items-center justify-center mb-8">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          
          <div className="bg-white p-2 rounded-full shadow-sm">
            <svg className="w-8 h-8 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mb-2">
          Carregando...
        </h2>
        <p className="text-gray-500 font-medium">
          Preparando os materiais para você
        </p>
        
      </div>
    </div>
  );
}

export default Loading;