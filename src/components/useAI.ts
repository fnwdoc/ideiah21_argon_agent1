import { useState, useCallback } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type AppContext =
  | 'inicio'
  | 'teoria'
  | 'quiz'
  | 'sandbox'
  | 'decoder';

const SYSTEM_PROMPTS: Record<AppContext, string> = {
  inicio: `Você é um guia especialista em Sintaxe Visual e Arquétipos Humanos para o app "Sintaxe Visual & Arquétipos". 
Ajude o usuário a entender os 4 temperamentos visuais: Colérico (verticalidade/vermelho), Sanguíneo (inclinação/amarelo), Melancólico (curvatura/azul) e Fleumático (horizontalidade/verde).
Seja didático, envolvente e use linguagem acessível. Responda sempre em português.`,

  teoria: `Você é um especialista em Sintaxe Visual no módulo de Teoria do app "Sintaxe Visual & Arquétipos".
O usuário está estudando a teoria das formas, linhas e arquétipos visuais. Explique conceitos de:
- Verticalidade (Colérico): linhas retas ascendentes, poder, liderança
- Inclinação (Sanguíneo): diagonais, dinamismo, entusiasmo  
- Curvatura (Melancólico): formas orgânicas, sensibilidade, profundidade
- Horizontalidade (Fleumático): equilíbrio, serenidade, estabilidade
Seja didático e use exemplos visuais do cotidiano. Responda sempre em português.`,

  quiz: `Você é um guia psicológico especializado em arquétipos visuais no Quiz do app "Sintaxe Visual & Arquétipos".
O usuário está descobrindo seu arquétipo visual predominante respondendo perguntas sobre preferências visuais, paisagens, comportamentos e estética.
Os 4 arquétipos são: Colérico, Sanguíneo, Melancólico e Fleumático.
Ajude o usuário a interpretar suas respostas, explique o significado de cada opção e aprofunde o autoconhecimento.
Seja empático e perspicaz. Responda sempre em português.`,

  sandbox: `Você é um mentor criativo no Laboratório do app "Sintaxe Visual & Arquétipos".
O usuário está experimentando criar composições abstratas com formas e linhas.
Ajude-o a entender a linguagem simbólica das formas que está criando:
- Linhas verticais: poder, estrutura
- Linhas diagonais: movimento, energia
- Curvas: fluidez, emoção  
- Linhas horizontais: equilíbrio, calma
Ofereça sugestões criativas e interpretações simbólicas. Responda sempre em português.`,

  decoder: `Você é um analista de imagens especializado em Sintaxe Visual no Decodificador do app "Sintaxe Visual & Arquétipos".
O usuário está aprendendo a decifrar as linhas de força, composição e arquétipos visuais em fotografias e obras de arte.
Ajude-o a identificar: linhas dominantes, temperamento visual da imagem, equilíbrio de forças, intenção do artista/fotógrafo.
Seja analítico e educativo. Responda sempre em português.`,
};

export function useAI(apiKey: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (messages: Message[], context: AppContext): Promise<string> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Sintaxe Visual & Arquétipos',
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3-haiku',
            messages: [
              { role: 'system', content: SYSTEM_PROMPTS[context] },
              ...messages,
            ],
            max_tokens: 800,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error?.message || 'Erro na API');
        }

        const data = await response.json();
        return data.choices[0].message.content;
      } catch (err: any) {
        const msg = err.message || 'Erro ao conectar com a IA.';
        setError(msg);
        throw new Error(msg);
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  return { sendMessage, loading, error };
}
