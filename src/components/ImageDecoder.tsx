import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Award, HelpCircle, CheckCircle2, AlertCircle, Compass, Sparkles, RefreshCw } from 'lucide-react';

interface ImageCase {
  id: string;
  title: string;
  artist: string;
  imagePath: string;
  correctAnswer: 'colerico' | 'sanguineo' | 'melancolico' | 'fleumatico';
  hint: string;
  linesOverlay: React.ReactNode; // SVG overlay for structural lines
  palette: { hex: string; name: string; desc: string; temp: string }[];
  curatorialText: string;
  structuralAnalysis: string;
}

export default function ImageDecoder() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('brutalist');
  const [showOverlays, setShowOverlays] = useState<boolean>(false);
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const [userGuess, setUserGuess] = useState<'colerico' | 'sanguineo' | 'melancolico' | 'fleumatico' | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const cases: ImageCase[] = [
    {
      id: 'brutalist',
      title: 'Monólito de Poder',
      artist: 'Fotografia de Arquitetura Brutalista',
      imagePath: '/images/vertical-colerico.png',
      correctAnswer: 'colerico',
      hint: 'Observe as gigantescas colunas de concreto subindo verticalmente e o feixe de luz vermelha que ativa urgência e autoridade.',
      linesOverlay: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 562" fill="none">
          {/* Vertical structural lines */}
          <line x1="280" y1="0" x2="280" y2="562" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
          <line x1="500" y1="0" x2="500" y2="562" stroke="#ef4444" strokeWidth="6" strokeDasharray="8 8" className="animate-pulse" />
          <line x1="720" y1="0" x2="720" y2="562" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 8" className="animate-pulse" />
          {/* Vertical arrows */}
          <path d="M500 80 L480 110 M500 80 L520 110" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          <path d="M280 120 L265 145 M280 120 L295 145" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          <path d="M720 120 L705 145 M720 120 L735 145" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
      palette: [
        { hex: '#ef4444', name: 'Vermelho Brasa', desc: 'Ativa urgência, coragem, intensidade e comando soberano.', temp: 'Colérico' },
        { hex: '#1e293b', name: 'Cinza Ardósia', desc: 'Estrutura fria, rigidez, estabilidade corporativa e impessoalidade.', temp: 'Colérico' },
        { hex: '#0f172a', name: 'Preto Absoluto', desc: 'Poder, mistério, luxo aristocrático e autoridade inabalável.', temp: 'Colérico' },
      ],
      curatorialText: 'Este monólito brutalista é uma aula viva de sintaxe visual colérica. A composição é totalmente ancorada na verticalidade, que remete à postura ereta, ao crescimento e ao poder inabalável. O ponto focal é um feixe de luz vermelha que corta a frieza do concreto, injetando urgência e dominância. O ângulo de visão de baixo para cima (contra-plongée) engrandece o edifício, forçando o observador a se sentir pequeno diante de tamanha autoridade.',
      structuralAnalysis: 'Predomínio absoluto de linhas verticais ascendentes que dividem o quadro em seções rígidas e estruturadas. A simetria e a rigidez geométrica eliminam qualquer sensação de hesitação ou fluidez, transmitindo uma mensagem direta: "Eu lidero".',
    },
    {
      id: 'dynamic',
      title: 'Velocidade e Ruptura',
      artist: 'Pintura Futurista Abstrata',
      imagePath: '/images/inclinada-sanguineo.png',
      correctAnswer: 'sanguineo',
      hint: 'Foque nas fortes linhas inclinadas que cruzam a tela de ponta a ponta e na explosão de tons amarelos e dourados energéticos.',
      linesOverlay: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 562" fill="none">
          {/* Diagonal structural lines */}
          <line x1="0" y1="562" x2="1000" y2="0" stroke="#facc15" strokeWidth="5" strokeDasharray="10 10" className="animate-pulse" />
          <line x1="100" y1="562" x2="900" y2="0" stroke="#facc15" strokeWidth="3" strokeDasharray="8 8" />
          <line x1="0" y1="300" x2="700" y2="0" stroke="#facc15" strokeWidth="3" strokeDasharray="8 8" />
          {/* Dynamic arrows */}
          <path d="M900 50 L840 55 M900 50 L885 110" stroke="#facc15" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M700 30 L650 35 M700 30 L685 80" stroke="#facc15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      palette: [
        { hex: '#facc15', name: 'Amarelo Solar', desc: 'Simboliza luz, calor, comunicação expansiva e entusiasmo.', temp: 'Sanguíneo' },
        { hex: '#f97316', name: 'Laranja Elétrico', desc: 'Estimula a sociabilidade, o dinamismo e a criatividade pulsante.', temp: 'Sanguíneo' },
        { hex: '#e2e8f0', name: 'Branco Dinâmico', desc: 'Traz leveza, abertura a novas ideias e velocidade de pensamento.', temp: 'Sanguíneo' },
      ],
      curatorialText: 'Nesta obra expressionista-futurista, a estática é completamente destruída. O uso de linhas inclinadas e diagonais cria uma tensão de movimento constante, sugerindo aceleração e mudança de rumo. O amarelo brilhante é a cor sanguínea por excelência: ela irradia extroversão, otimismo e sociabilidade. Não há simetria ou repouso; a obra vive em um eterno fluxo de energia.',
      structuralAnalysis: 'As diagonais cruzadas rompem com a estabilidade do horizonte. Linhas inclinadas forçam o cérebro a interpretar instabilidade e ação imediata: a imagem está "caindo" ou "subindo" rapidamente, gerando a leitura visual: "Eu movimento".',
    },
    {
      id: 'misty',
      title: 'O Silêncio da Alma',
      artist: 'Fotografia Poética ao Crepúsculo',
      imagePath: '/images/curva-melancolico.png',
      correctAnswer: 'melancolico',
      hint: 'Observe as ondulações suaves da água, os galhos arqueados do salgueiro e a predominância do azul marinho e violeta.',
      linesOverlay: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 562" fill="none">
          {/* Curved structural lines */}
          <path d="M100 450 Q 500 520, 900 450" stroke="#3b82f6" strokeWidth="4" strokeDasharray="8 8" fill="none" className="animate-pulse" />
          <path d="M200 480 Q 500 540, 800 480" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 6" fill="none" />
          {/* Curved willow branches lines */}
          <path d="M150 100 Q 120 280, 180 400" stroke="#a855f7" strokeWidth="3" strokeDasharray="6 6" fill="none" />
          <path d="M200 80 Q 240 250, 220 380" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
        </svg>
      ),
      palette: [
        { hex: '#1d4ed8', name: 'Azul Crepúsculo', desc: 'Evoca profundidade, introspecção, silêncio e inteligência emocional.', temp: 'Melancólico' },
        { hex: '#6b21a8', name: 'Violeta Místico', desc: 'Simboliza transcendência, mistério, dor poética e espiritualidade.', temp: 'Melancólico' },
        { hex: '#64748b', name: 'Cinza Bruma', desc: 'Traz melancolia suave, refinamento estético e recolhimento interno.', temp: 'Melancólico' },
      ],
      curatorialText: 'Uma obra-prima da atmosfera melancólica. O salgueiro-chorão, com seus galhos que se curvam delicadamente em direção à água, cria um padrão orgânico de acolhimento e dor sutil. A água do lago, marcada por ondulações curvas suaves, elimina qualquer agressividade geométrica. O azul e o roxo dominantes conduzem o cérebro à introspecção, ao silêncio e à contemplação de sentimentos profundos.',
      structuralAnalysis: 'Total ausência de linhas retas duras. As curvas orgânicas envolvem o olhar e criam um ritmo lento e respirável. A curvatura acolhe e protege, comunicando de forma sensível: "Eu sinto".',
    },
    {
      id: 'horizon',
      title: 'O Alicerce do Ser',
      artist: 'Fotografia Minimalista de Paisagem',
      imagePath: '/images/horizontal-fleumatico.png',
      correctAnswer: 'fleumatico',
      hint: 'O segredo está na linha do horizonte perfeitamente reta que divide o céu laranja do campo verde, transmitindo paz inabalável.',
      linesOverlay: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 562" fill="none">
          {/* Horizontal structural lines */}
          <line x1="0" y1="281" x2="1000" y2="281" stroke="#10b981" strokeWidth="5" strokeDasharray="10 10" className="animate-pulse" />
          <line x1="0" y1="400" x2="1000" y2="400" stroke="#10b981" strokeWidth="3" strokeDasharray="8 8" />
          <line x1="0" y1="180" x2="1000" y2="180" stroke="#f97316" strokeWidth="3" strokeDasharray="8 8" />
        </svg>
      ),
      palette: [
        { hex: '#059669', name: 'Verde Alface/Oliva', desc: 'Simboliza equilíbrio natural, harmonia, saúde e paz.', temp: 'Fleumático' },
        { hex: '#f97316', name: 'Laranja Suave', desc: 'Traz acolhimento, calor humano sutil e proximidade confortável.', temp: 'Fleumático' },
        { hex: '#0f172a', name: 'Slate Escuro', desc: 'Garante o peso visual, a segurança e a constância da base.', temp: 'Fleumático' },
      ],
      curatorialText: 'A harmonia fleumática é perfeitamente capturada neste horizonte infinito. A linha horizontal divide a composição de forma exata e simétrica, transmitindo estabilidade, repouso e segurança. Não há movimento, conflito ou pressa. O verde do campo traz equilíbrio biológico, enquanto o laranja suave do pôr do sol aquece o ambiente sem agredir, criando um espaço de acolhimento e constância.',
      structuralAnalysis: 'O império da linha horizontal. Na sintaxe visual, a horizontalidade é a imagem do corpo deitado, da terra firme e do repouso. É o alicerce absoluto, comunicando: "Eu sustento".',
    },
  ];

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const handleGuessSubmit = (guess: 'colerico' | 'sanguineo' | 'melancolico' | 'fleumatico') => {
    setUserGuess(guess);
    setQuizSubmitted(true);
    if (guess === activeCase.correctAnswer) {
      setShowOverlays(true);
      setShowPalette(true);
    }
  };

  const handleCaseChange = (id: string) => {
    setSelectedCaseId(id);
    setShowOverlays(false);
    setShowPalette(false);
    setUserGuess(null);
    setQuizSubmitted(false);
  };

  return (
    <div className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0 -z-10 opacity-20" />
      <div className="absolute top-1/4 right-0 -z-10 h-[400px] w-[400px] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0,transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <Compass className="h-3.5 w-3.5" />
            JOGO DE ANÁLISE VISUAL
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-100">
            Decodificador de Imagens
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light text-sm">
            Toda imagem esconde uma estrutura geométrica de linhas e cores. Escolha um caso, tente decodificar seu temperamento e revele as linhas de força ocultas!
          </p>
        </div>

        {/* Case Selector Thumbnails */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {cases.map((c) => {
            const isActive = c.id === selectedCaseId;
            return (
              <button
                key={c.id}
                onClick={() => handleCaseChange(c.id)}
                className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-300 w-28 sm:w-36 aspect-video cursor-pointer ${
                  isActive ? 'border-amber-500 scale-105 shadow-lg shadow-amber-500/20' : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                <img src={c.imagePath} alt={c.title} className="object-cover w-full h-full brightness-75 group-hover:brightness-90 transition-all" />
                <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2">
                  <span className="text-[10px] font-serif font-bold text-slate-200 line-clamp-1 group-hover:text-white">
                    {c.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Image Display Panel (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-3 overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                <img 
                  src={activeCase.imagePath} 
                  alt={activeCase.title} 
                  className="w-full h-full object-cover transition-transform duration-500"
                />

                {/* Structural Lines SVG Overlay */}
                <AnimatePresence>
                  {showOverlays && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"
                    >
                      {activeCase.linesOverlay}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Overlay Control Toggles */}
              {quizSubmitted && userGuess === activeCase.correctAnswer && (
                <div className="flex flex-wrap gap-3 mt-4 justify-between items-center border-t border-slate-800/60 pt-4 px-1">
                  <span className="text-xs text-slate-400 font-medium">Controles do Decodificador:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowOverlays(!showOverlays)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        showOverlays
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {showOverlays ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {showOverlays ? 'Ocultar Linhas' : 'Ver Linhas Ocultas'}
                    </button>
                    <button
                      onClick={() => setShowPalette(!showPalette)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        showPalette
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {showPalette ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {showPalette ? 'Ocultar Cores' : 'Ver Mapa de Cores'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Case Artist details */}
            <div className="flex justify-between items-center px-2">
              <div>
                <h4 className="font-serif font-bold text-slate-200 text-base">{activeCase.title}</h4>
                <p className="text-xs text-slate-500 italic">{activeCase.artist}</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 border border-slate-800 px-2 py-1 rounded-md">
                Caso de Estudo #{activeCase.id === 'brutalist' ? '1' : activeCase.id === 'dynamic' ? '2' : activeCase.id === 'misty' ? '3' : '4'}
              </span>
            </div>
          </div>

          {/* Right: Interactive Quiz & Analysis Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {!quizSubmitted ? (
                <motion.div
                  key="guess-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-5 backdrop-blur-sm"
                >
                  <div className="border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
                      <HelpCircle className="h-4 w-4" />
                      Desafio de Leitura
                    </div>
                    <h4 className="font-serif font-bold text-slate-100 text-lg">
                      Qual é o temperamento dominante desta imagem?
                    </h4>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Analise as direções das formas, a distribuição do peso visual e a paleta cromática. Qual temperamento de Hipócrates melhor se alinha a esta estética?
                  </p>

                  {/* Guess buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleGuessSubmit('colerico')}
                      className="px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-red-500/40 hover:bg-slate-900 text-xs font-serif font-bold text-slate-200 transition-all cursor-pointer"
                    >
                      🔴 Colérico
                    </button>
                    <button
                      onClick={() => handleGuessSubmit('sanguineo')}
                      className="px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-yellow-500/40 hover:bg-slate-900 text-xs font-serif font-bold text-slate-200 transition-all cursor-pointer"
                    >
                      🟡 Sanguíneo
                    </button>
                    <button
                      onClick={() => handleGuessSubmit('melancolico')}
                      className="px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-blue-500/40 hover:bg-slate-900 text-xs font-serif font-bold text-slate-200 transition-all cursor-pointer"
                    >
                      🔵 Melancólico
                    </button>
                    <button
                      onClick={() => handleGuessSubmit('fleumatico')}
                      className="px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-emerald-500/40 hover:bg-slate-900 text-xs font-serif font-bold text-slate-200 transition-all cursor-pointer"
                    >
                      🟢 Fleumático
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* Feedback Banner */}
                  {userGuess === activeCase.correctAnswer ? (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif font-bold text-emerald-400 text-sm">Leitura Correta!</h4>
                        <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">
                          Você decifrou com precisão a sintaxe visual deste caso. As linhas estruturais e a paleta de cores foram reveladas na imagem!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 flex gap-3 items-start">
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-serif font-bold text-red-400 text-sm">Leitura Imprecisa</h4>
                        <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">
                          Sua leitura não capturou a essência estrutural primária. <strong>Dica:</strong> {activeCase.hint}
                        </p>
                        <button
                          onClick={() => setQuizSubmitted(false)}
                          className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 hover:text-amber-300 mt-3 transition-colors cursor-pointer"
                        >
                          <RefreshCw className="h-3 w-3" /> Tentar Novamente
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Curatorial Deep Dive (only shown on correct answer) */}
                  {userGuess === activeCase.correctAnswer && (
                    <div className="space-y-5">
                      {/* Curatorial text */}
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold tracking-widest uppercase border-b border-slate-800 pb-2">
                          <Sparkles className="h-3.5 w-3.5" />
                          Leitura Curatorial
                        </div>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                          {activeCase.curatorialText}
                        </p>
                      </div>

                      {/* Structural details */}
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold tracking-widest uppercase border-b border-slate-800 pb-2">
                          <Compass className="h-3.5 w-3.5" />
                          Análise Estrutural
                        </div>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                          {activeCase.structuralAnalysis}
                        </p>
                      </div>

                      {/* Color Palette breakdown (if toggled) */}
                      {showPalette && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4 backdrop-blur-sm"
                        >
                          <h5 className="font-serif font-bold text-slate-400 text-xs uppercase tracking-wider">
                            Mapa Cromático Extraído
                          </h5>
                          <div className="space-y-3">
                            {activeCase.palette.map((color, idx) => (
                              <div key={idx} className="flex gap-3 items-start border-b border-slate-800/40 pb-2.5 last:border-0 last:pb-0">
                                <div 
                                  className="h-8 w-8 rounded-lg border border-slate-700 flex-shrink-0" 
                                  style={{ backgroundColor: color.hex }}
                                />
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-200">{color.name}</span>
                                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                                      {color.temp}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                                    {color.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
