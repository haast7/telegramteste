export default function Teste() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6 animate-fade-in">
          {/* Ícone do Telegram */}
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-6 shadow-2xl">
              <svg
                className="w-20 h-20 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Entre no nosso
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Grupo do Telegram
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-white/90 max-w-xl mx-auto leading-relaxed">
            Junte-se à nossa comunidade e fique por dentro de todas as novidades,
            dicas exclusivas e muito mais!
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="https://t.me/+2_BqYmotlb04N2Zh"
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-button inline-block bg-white text-purple-600 font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-300 transform hover:bg-yellow-50"
            >
              🚀 Entrar Agora
            </a>
          </div>

          {/* Benefícios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-white mb-1">Comunidade Ativa</h3>
              <p className="text-sm text-white/80">Troque ideias com pessoas incríveis</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-white mb-1">Conteúdo Exclusivo</h3>
              <p className="text-sm text-white/80">Acesso a materiais especiais</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-white mb-1">Networking</h3>
              <p className="text-sm text-white/80">Conecte-se com profissionais</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

