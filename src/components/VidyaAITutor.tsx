import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, StudentUser } from '../types';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  Zap, 
  Dna, 
  HelpCircle 
} from 'lucide-react';

interface VidyaAITutorProps {
  currentUser: StudentUser;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const VidyaAITutor: React.FC<VidyaAITutorProps> = ({
  currentUser,
  showToast
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatStreamRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      role: 'assistant',
      content: `Hello ${currentUser.name.split(' ')[0]}! I'm **Vidya AI**, your 24/7 Socratic tutor for **${currentUser.target_exam}** (${currentUser.student_class}). Ask me to break down derivations, explain JEE/NEET PYQs, or generate NCERT memory mnemonics!`,
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateAIResponse = (userText: string): string => {
    const lower = userText.toLowerCase();

    if (lower.includes('cbse') || lower.includes('derivation') || lower.includes('board') || lower.includes('step')) {
      return `### 📋 CBSE Board 5-Mark Derivation Guide:
Here is how to score **full 5/5 marks** according to official CBSE marking guidelines:

1. **Law Statement & Diagram (1 Mark)**: Always state the fundamental theorem verbatim from NCERT and draw a clean, labeled diagram with arrows.
2. **Assumptions & Variables (1 Mark)**: Explicitly state "Let mass = $m$, length = $L$, current = $I$".
3. **Step-by-step Derivation (2 Marks)**: Show intermediate integration/differentiation steps without skipping limits.
4. **Final Formula & SI Units (1 Mark)**: Box the final equation (e.g. $\\mathbf{\\varepsilon = -\\frac{d\\Phi}{dt}}$) with SI units (Volts).

*CBSE examiners reward logical step continuity over brevity!*`;
    } else if (lower.includes('elimination') || lower.includes('trick') || lower.includes('shortcut') || lower.includes('jee') || lower.includes('neet')) {
      return `### ⚡ JEE / NEET Rapid Elimination Hack:
Under severe time pressure (under 90 seconds per numerical):

1. **Dimensional Analysis**: Check the dimensions of all 4 options. In ~25% of JEE Mains Physics problems, 2 options are dimensionally invalid!
2. **Extreme Boundary Testing**: Substitute $\\theta = 0^\\circ$ or $\\theta = 90^\\circ$, or $t \\to \\infty$. Which formulas give impossible infinite or negative outputs?
3. **Order of Magnitude Check**: Approximate $\\pi \\approx 3$, $g \\approx 10\\text{ m/s}^2$, and $\\sqrt{2} \\approx 1.41$ to reject unfeasible numbers instantly.

*Never get bogged down for more than 2 minutes on a single question!*`;
    } else if (lower.includes('mnemonic') || lower.includes('biology') || lower.includes('remember')) {
      return `### 🧬 High-Yield NEET Biology Mnemonic:
**Stages of Prophase I in Meiosis**:
👉 **L**azita **Z**ara **P**ani **D**e **D**o

- **L** - **Leptotene**: Chromosomes condense & become visible
- **Z** - **Zygotene**: Synapsis & Synaptonemal complex formation
- **P** - **Pachytene**: Crossing over at Recombination nodules (Recombinase enzyme)
- **D** - **Diplotene**: Chiasmata becomes visible, dissolution of synaptonemal complex
- **D** - **Diakinesis**: Terminalisation of chiasmata

*Directly asked in NEET 2021, 2023 & 2025!*`;
    } else if (lower.includes('quiz') || lower.includes('pyq') || lower.includes('test')) {
      return `### 🎯 High-Yield JEE Mains / NEET Concept Check:
**Question (Physics - Mechanics)**:
A block of mass $m$ rests on a rough horizontal surface with friction coefficient $\\mu$. If a pulling force acts at angle $\\theta$ above the horizontal, the minimum force required to move the block is:

**A)** $\\mu m g$
**B)** $\\frac{\\mu m g}{\\cos\\theta + \\mu \\sin\\theta}$
**C)** $\\frac{\\mu m g}{\\sqrt{1 + \\mu^2}}$ when $\\tan\\theta = \\mu$
**D)** $\\frac{m g}{1 + \\mu}$

*Type your answer choice (A, B, C, or D) to see the full Free Body Diagram explanation!*`;
    } else {
      return `### 🎓 Vidya AI Study Companion:
Great question regarding your **${currentUser.target_exam}** revision!

1. **NCERT Core Principle**: \`${userText}\` connects directly to fundamental chapter concepts tested in Board sample papers and competitive exams.
2. **Problem-Solving Tip**: Draw a quick diagram, write down given quantities with SI units, and identify the governing conservation law.
3. **Action Step**: Check the **Modules** tab to take the diagnostic quiz for this unit, earn **+60 Stars**, and redeem stationery perks in EduBazaar!

*Ask me for a diagram analogy, formula derivation, or 3 tricky PYQs!*`;
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputMessage).trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAIResponse(content);
      const assistantMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: reply,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
        <button
          id="vidya-ai-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative p-3 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-2xl shadow-indigo-500/40 flex items-center gap-2.5 transition transform hover:scale-105 active:scale-95"
        >
          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide">
            Vidya AI Tutor
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0b0f19] animate-pulse"></span>
        </button>
      </div>

      {/* Flyout Drawer Panel */}
      {isOpen && (
        <div
          id="vidya-ai-drawer"
          className="fixed bottom-24 lg:bottom-20 right-3 sm:right-6 w-[94vw] sm:w-[420px] h-[540px] max-h-[80vh] glass-panel rounded-3xl shadow-2xl border border-indigo-500/40 z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Vidya AI Study Companion</h4>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Socratic CBSE & JEE/NEET Mode Active</span>
                </p>
              </div>
            </div>

            <button
              id="close-ai-tutor-btn"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Prompt Chips */}
          <div className="px-3 py-2 bg-slate-950/70 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            <button
              onClick={() => handleSendMessage('How to structure a 5-mark CBSE Board Derivation for Electromagnetic Induction?')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-indigo-400" />
              <span>📋 CBSE Derivation</span>
            </button>
            <button
              onClick={() => handleSendMessage('Give me the JEE / NEET Rapid Elimination Hack for Physics')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>⚡ Elimination Hack</span>
            </button>
            <button
              onClick={() => handleSendMessage('Give me an NCERT biology mnemonic for Prophase I Meiosis stages')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition flex items-center gap-1"
            >
              <Dna className="w-3 h-3 text-emerald-400" />
              <span>🧬 NEET Mnemonic</span>
            </button>
            <button
              onClick={() => handleSendMessage('Quiz me with a high-yield JEE Mains Physics PYQ question')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3 text-amber-400" />
              <span>🎯 Test on PYQ</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div 
            ref={chatStreamRef}
            className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-800/90 border border-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {m.content}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="animate-pulse">Vidya AI is writing explanation...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                id="ai-tutor-message-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask formula, derivation, or concept..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                id="send-ai-message-btn"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
