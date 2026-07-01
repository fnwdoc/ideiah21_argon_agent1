import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Loader2, Bot } from 'lucide-react';
import { useAI, AppContext } from './useAI';

interface AIHelpButtonProps {
  /** Pergunta pré-definida ou contexto para enviar à IA */
  prompt: string;
  /** Label do botão */
  label?: string;
  /** Contexto da aba atual */
  context: AppContext;
  /** Chave OpenRouter */
  apiKey: string;
  /** Variante visual */
  variant?: 'inline' | 'badge';
}

export default function AIHelpButton({
  prompt,
  label = 'Pedir ajuda à IA',
  context,
  apiKey,
  variant = 'inline',
}: AIHelpButtonProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { sendMessage, loading } = useAI(apiKey);

  const handleAsk = async () => {
    if (loading) return;
    setIsOpen(true);
    if (response) return; // já tem resposta, só abre
    try {
      const reply = await sendMessage([{ role: 'user', content: prompt }], context);
      setResponse(reply);
    } catch {
      setResponse('Não foi possível obter uma resposta. Verifique sua chave da API.');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setResponse(null);
  };

  if (variant === 'badge') {
    return (
      <div className="relative inline-block">
        <button
          onClick={handleAsk}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1 rounded-full transition-all duration-200"
        >
          <Sparkles className="h-3 w-3" />
          {label}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute bottom-full mb-2 left-0 z-40 w-72 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Bot className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">IA Explica</span>
                </div>
                <button onClick={handleClose} className="text-slate-500 hover:text-slate-300">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              {loading ? (
                <div className="flex justify-center py-3">
                  <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
                </div>
              ) : (
                <p className="text-xs text-slate-300 leading-relaxed">{response}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // variant = 'inline'
  return (
    <div className="space-y-3">
      <button
        onClick={handleAsk}
        disabled={loading}
        className="flex items-center gap-2 text-sm font-medium text-amber-400 border border-amber-500/30 bg-amber-500/8 hover:bg-amber-500/15 rounded-xl px-4 py-2.5 transition-all duration-200 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {loading ? 'Consultando IA...' : label}
      </button>

      <AnimatePresence>
        {isOpen && response && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Bot className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Análise da IA</span>
                </div>
                <button onClick={handleClose} className="text-slate-500 hover:text-slate-300">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{response}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
