import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, RotateCw, Maximize2, Sparkles, Plus, HelpCircle, AlertCircle, Copy } from 'lucide-react';

interface ShapeItem {
  id: string;
  type: 'vertical' | 'diagonal' | 'curved' | 'horizontal';
  color: 'red' | 'yellow' | 'blue' | 'purple' | 'green' | 'orange';
  x: number; // in pixels relative to container
  y: number; // in pixels relative to container
  width: number;
  height: number;
  rotation: number;
}

interface VisualSandboxProps {
  onCompositionChange?: (desc: string) => void;
}

export default function VisualSandbox({ onCompositionChange }: VisualSandboxProps) {
  const [shapes, setShapes] = useState<ShapeItem[]>([
    { id: '1', type: 'vertical', color: 'red', x: 80, y: 50, width: 24, height: 180, rotation: 0 },
    { id: '2', type: 'horizontal', color: 'green', x: 50, y: 240, width: 260, height: 20, rotation: 0 },
    { id: '3', type: 'curved', color: 'blue', x: 280, y: 80, width: 100, height: 100, rotation: 0 },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const colors = {
    red: { bg: 'bg-red-500', hex: '#ef4444', name: 'Vermelho (Colérico)' },
    yellow: { bg: 'bg-yellow-400', hex: '#facc15', name: 'Amarelo (Sanguíneo)' },
    blue: { bg: 'bg-blue-500', hex: '#3b82f6', name: 'Azul (Melancólico)' },
    purple: { bg: 'bg-purple-500', hex: '#a855f7', name: 'Roxo (Melancólico)' },
    green: { bg: 'bg-emerald-500', hex: '#10b981', name: 'Verde (Fleumático)' },
    orange: { bg: 'bg-orange-500', hex: '#f97316', name: 'Laranja (Fleumático)' },
  };

  const addShape = (type: 'vertical' | 'diagonal' | 'curved' | 'horizontal') => {
    let newShape: ShapeItem = {
      id: Date.now().toString(),
      type,
      color: type === 'vertical' ? 'red' : type === 'diagonal' ? 'yellow' : type === 'curved' ? 'blue' : 'green',
      x: 100 + Math.random() * 80,
      y: 100 + Math.random() * 80,
      width: type === 'horizontal' ? 180 : type === 'vertical' ? 20 : 80,
      height: type === 'vertical' ? 180 : type === 'horizontal' ? 20 : 80,
      rotation: type === 'diagonal' ? 45 : 0,
    };
    setShapes([...shapes, newShape]);
    setSelectedId(newShape.id);
  };

  const updateSelectedShape = (key: keyof ShapeItem, value: any) => {
    if (!selectedId) return;
    setShapes(shapes.map(s => s.id === selectedId ? { ...s, [key]: value } : s));
  };

  const duplicateSelected = () => {
    if (!selectedId) return;
    const shape = shapes.find(s => s.id === selectedId);
    if (!shape) return;
    const duplicated: ShapeItem = {
      ...shape,
      id: Date.now().toString(),
      x: shape.x + 20,
      y: shape.y + 20,
    };
    setShapes([...shapes, duplicated]);
    setSelectedId(duplicated.id);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setShapes(shapes.filter(s => s.id !== selectedId));
    setSelectedId(null);
  };

  const clearCanvas = () => {
    setShapes([]);
    setSelectedId(null);
  };

  // Analysis of Canvas
  const selectedShape = shapes.find(s => s.id === selectedId);

  const calculateComposition = () => {
    if (shapes.length === 0) {
      return {
        colerico: 0,
        sanguineo: 0,
        melancolico: 0,
        fleumatico: 0,
        atmosphere: 'Vazio',
        message: 'Adicione formas ao laboratório para iniciar a leitura simbólica do seu subconsciente visual.',
      };
    }

    let colericoWeight = 0;
    let sanguineoWeight = 0;
    let melancolicoWeight = 0;
    let fleumaticoWeight = 0;

    shapes.forEach(s => {
      // Shape Type Weights
      if (s.type === 'vertical') colericoWeight += 3;
      if (s.type === 'diagonal') sanguineoWeight += 3;
      if (s.type === 'curved') melancolicoWeight += 3;
      if (s.type === 'horizontal') fleumaticoWeight += 3;

      // Color Weights
      if (s.color === 'red') colericoWeight += 2;
      if (s.color === 'yellow') sanguineoWeight += 2;
      if (s.color === 'blue' || s.color === 'purple') melancolicoWeight += 2;
      if (s.color === 'green' || s.color === 'orange') fleumaticoWeight += 2;
    });

    const totalWeight = colericoWeight + sanguineoWeight + melancolicoWeight + fleumaticoWeight;
    const colerico = Math.round((colericoWeight / totalWeight) * 100);
    const sanguineo = Math.round((sanguineoWeight / totalWeight) * 100);
    const melancolico = Math.round((melancolicoWeight / totalWeight) * 100);
    const fleumatico = Math.round((fleumaticoWeight / totalWeight) * 100);

    // Determine atmosphere and message
    let atmosphere = 'Equilibrada';
    let message = '';

    const maxVal = Math.max(colerico, sanguineo, melancolico, fleumatico);

    if (maxVal === colerico) {
      atmosphere = 'Poder, Comando e Estrutura';
      message = 'Sua composição é dominada por linhas verticais e tons de comando. Ela transmite uma atmosfera de autoridade inabalável, foco em metas claras e liderança. O olhar é direcionado para cima, inspirando crescimento e imponência soberana.';
    } else if (maxVal === sanguineo) {
      atmosphere = 'Dinamismo, Energia e Expansão';
      message = 'O predomínio de diagonais e tons solares confere à sua criação uma energia pulsante de movimento, velocidade e otimismo. Não há espaço para a estagnação: sua imagem clama por inovação, sociabilidade e mudança contínua.';
    } else if (maxVal === melancolico) {
      atmosphere = 'Introspecção, Sensibilidade e Profundidade';
      message = 'Composta majoritariamente por curvas e tons profundos, sua obra evoca acolhimento, mistério e refinamento emocional. Ela convida o observador à contemplação interna, expressando uma rica sensibilidade poética e artística.';
    } else {
      atmosphere = 'Estabilidade, Serenidade e Equilíbrio';
      message = 'A força das horizontais e tons terrosos ou verdes ancora sua composição na calma e na segurança. Ela transmite uma sensação reconfortante de permanência, abrigo confiável e sustentação pacífica contra o caos.';
    }

    // Hybrid atmospheres
    if (colerico > 30 && melancolico > 30) {
      atmosphere = 'Liderança Empática';
      message = 'Uma combinação fascinante de estrutura vertical (poder) e curvas fluidas (sensibilidade). Sua composição sugere uma autoridade que sabe acolher, unindo força racional com inteligência emocional profunda.';
    } else if (sanguineo > 30 && fleumatico > 30) {
      atmosphere = 'Criatividade Sustentada';
      message = 'O dinamismo diagonal (sanguíneo) encontra o porto seguro horizontal (fleumático). Sua composição equilibra o entusiasmo e a inovação com a constância e a segurança necessárias para fazer as ideias durarem.';
    } else if (colerico > 30 && sanguineo > 30) {
      atmosphere = 'Ação de Alto Impacto';
      message = 'Verticalidade impiedosa unida a diagonais velozes. Esta composição transborda urgência, coragem empreendedora, foco implacável no objetivo e velocidade de execução. É a assinatura de um realizador nato.';
    }

    return { colerico, sanguineo, melancolico, fleumatico, atmosphere, message };
  };

  const comp = calculateComposition();

  return (
    <div className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0 -z-10 opacity-20" />
      
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-400 tracking-wider uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            LABORATÓRIO INTERATIVO
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-100">
            Laboratório de Sintaxe Visual
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light text-sm">
            Adicione formas e cores geométricas ao canvas. Arraste, redimensione, rotacione e observe em tempo real como o sistema decifra a atmosfera psicológica da sua composição.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Canvas Workspace - 7 Cols on desktop */}
          <div className="lg:col-span-7 space-y-4">
            {/* Shape Insertion Controls */}
            <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <span className="text-xs font-serif font-bold text-slate-400 w-full mb-1">Adicionar Elemento:</span>
              <button
                onClick={() => addShape('vertical')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/40 hover:bg-slate-900 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-red-500" />
                Vertical (Vermelho)
              </button>
              <button
                onClick={() => addShape('diagonal')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-yellow-500/40 hover:bg-slate-900 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-yellow-400" />
                Diagonal (Amarelo)
              </button>
              <button
                onClick={() => addShape('curved')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-blue-400" />
                Curva (Azul)
              </button>
              <button
                onClick={() => addShape('horizontal')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5 text-emerald-400" />
                Horizontal (Verde)
              </button>
            </div>

            {/* Bounded Canvas Container */}
            <div 
              ref={canvasRef}
              onClick={() => setSelectedId(null)}
              className="relative w-full h-[450px] md:h-[500px] rounded-3xl border-2 border-dashed border-slate-800 bg-slate-950/90 overflow-hidden bg-grid-pattern flex items-center justify-center cursor-default"
            >
              {shapes.length === 0 && (
                <div className="text-center p-6 max-w-sm space-y-3 pointer-events-none">
                  <HelpCircle className="h-10 w-10 text-slate-600 mx-auto animate-pulse" />
                  <p className="font-serif text-slate-500 text-sm font-semibold uppercase tracking-wider">Canvas Vazio</p>
                  <p className="text-xs text-slate-600 font-light">Clique nos botões acima para inserir linhas e formas e iniciar sua composição.</p>
                </div>
              )}

              {shapes.map((shape) => {
                const isSelected = shape.id === selectedId;
                const colorHex = colors[shape.color].hex;

                return (
                  <motion.div
                    key={shape.id}
                    drag
                    dragMomentum={false}
                    dragConstraints={canvasRef}
                    onDragStart={() => setSelectedId(shape.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(shape.id);
                    }}
                    style={{
                      position: 'absolute',
                      left: shape.x,
                      top: shape.y,
                      width: shape.width,
                      height: shape.height,
                      rotate: shape.rotation,
                      cursor: 'grab',
                    }}
                    className={`transition-shadow ${
                      isSelected ? 'ring-2 ring-amber-500 shadow-2xl shadow-amber-500/20 z-30' : 'hover:ring-1 hover:ring-slate-700 z-10'
                    }`}
                  >
                    {/* Visual Shape Rendering */}
                    {shape.type === 'vertical' && (
                      <div className="w-full h-full rounded-sm" style={{ backgroundColor: colorHex }} />
                    )}
                    {shape.type === 'horizontal' && (
                      <div className="w-full h-full rounded-sm" style={{ backgroundColor: colorHex }} />
                    )}
                    {shape.type === 'curved' && (
                      <div className="w-full h-full rounded-full border-4" style={{ borderColor: colorHex, backgroundColor: `${colorHex}15` }} />
                    )}
                    {shape.type === 'diagonal' && (
                      <div 
                        className="w-0 h-0 border-l-transparent border-r-transparent"
                        style={{
                          borderLeftWidth: shape.width / 2,
                          borderRightWidth: shape.width / 2,
                          borderBottomWidth: shape.height,
                          borderBottomColor: colorHex,
                        }}
                      />
                    )}

                    {/* Drag and Selection indicators */}
                    {isSelected && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap pointer-events-none">
                        Ativo
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Clear Canvas Button */}
            {shapes.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={clearCanvas}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Limpar Canvas
                </button>
              </div>
            )}
          </div>

          {/* Controls & Analysis Side Panel - 5 Cols */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contextual Shape Editor */}
            {selectedShape ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4 backdrop-blur-sm">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h4 className="font-serif font-bold text-slate-200 text-sm uppercase tracking-wider">
                    Editar Elemento
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={duplicateSelected}
                      title="Duplicar"
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={deleteSelected}
                      title="Excluir"
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-red-900 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Color Selector */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 block font-medium">Cor &amp; Temperamento:</span>
                  <div className="flex gap-2">
                    {(Object.keys(colors) as Array<keyof typeof colors>).map((col) => (
                      <button
                        key={col}
                        onClick={() => updateSelectedShape('color', col)}
                        style={{ backgroundColor: colors[col].hex }}
                        className={`h-7 w-7 rounded-full border-2 transition-transform cursor-pointer ${
                          selectedShape.color === col ? 'border-white scale-110 shadow-md' : 'border-transparent hover:scale-105'
                        }`}
                        title={colors[col].name}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 italic">
                    Cor atual: {colors[selectedShape.color].name}
                  </span>
                </div>

                {/* Dimension Sliders */}
                <div className="space-y-3">
                  {/* Width Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Largura</span>
                      <span className="text-slate-500">{selectedShape.width}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      value={selectedShape.width}
                      onChange={(e) => updateSelectedShape('width', parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* Height Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Altura</span>
                      <span className="text-slate-500">{selectedShape.height}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      value={selectedShape.height}
                      onChange={(e) => updateSelectedShape('height', parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* Rotation Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Rotação</span>
                      <span className="text-slate-500">{selectedShape.rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={selectedShape.rotation}
                      onChange={(e) => updateSelectedShape('rotation', parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/10 p-5 flex gap-3 items-start">
                <AlertCircle className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Selecione um elemento no canvas para ajustar suas dimensões, rotação, cores e temperamentos associados.
                </p>
              </div>
            )}

            {/* Live Symbolic Reading of Composition */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-6 backdrop-blur-sm">
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold tracking-widest uppercase mb-1">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Leitura Simbólica Live
                </div>
                <h4 className="font-serif font-bold text-slate-100 text-lg">
                  Atmosfera: <span className="text-amber-400 block sm:inline">{comp.atmosphere}</span>
                </h4>
              </div>

              {/* Interpretation Message */}
              <p className="text-xs text-slate-300 font-light leading-relaxed italic">
                &quot;{comp.message}&quot;
              </p>

              {/* Progress Gauges for Composition */}
              {shapes.length > 0 && (
                <div className="space-y-3.5 pt-2">
                  <h5 className="font-serif font-bold text-slate-400 text-[11px] uppercase tracking-wider">
                    Distribuição da Gramática Visual
                  </h5>
                  <div className="space-y-3">
                    {/* Colérico */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-slate-400">Força Vertical (Colérico)</span>
                        <span className="text-red-400 font-bold">{comp.colerico}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${comp.colerico}%` }} />
                      </div>
                    </div>

                    {/* Sanguíneo */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-slate-400">Dinamismo Diagonal (Sanguíneo)</span>
                        <span className="text-yellow-400 font-bold">{comp.sanguineo}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${comp.sanguineo}%` }} />
                      </div>
                    </div>

                    {/* Melancólico */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-slate-400">Acolhimento Curvo (Melancólico)</span>
                        <span className="text-blue-400 font-bold">{comp.melancolico}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${comp.melancolico}%` }} />
                      </div>
                    </div>

                    {/* Fleumático */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-slate-400">Estabilidade Horizontal (Fleumático)</span>
                        <span className="text-emerald-400 font-bold">{comp.fleumatico}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800/60">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${comp.fleumatico}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
