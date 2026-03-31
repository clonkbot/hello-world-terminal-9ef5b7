import { useState, useEffect } from 'react';

function App() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const fullText = 'Hello, World!';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Scan lines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
        }}
      />

      {/* Vignette effect */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* CRT flicker animation */}
      <div className="pointer-events-none fixed inset-0 z-10 animate-flicker opacity-[0.02] bg-white" />

      {/* Main content */}
      <main className="relative z-20 flex flex-col items-center justify-center px-4 md:px-8">
        {/* Terminal window */}
        <div className="relative">
          {/* Glow effect behind text */}
          <div
            className="absolute inset-0 blur-[80px] md:blur-[120px] opacity-30"
            style={{
              background: 'radial-gradient(ellipse, #00ff41 0%, transparent 70%)',
            }}
          />

          {/* Terminal prompt */}
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 font-mono text-[#00ff41]/50 text-xs md:text-sm">
            <span className="animate-pulse">guest@world</span>
            <span>~</span>
            <span className="text-[#00ff41]/30">$</span>
          </div>

          {/* Main text with glow */}
          <h1
            className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight relative"
            style={{
              color: '#00ff41',
              textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff4180, 0 0 80px #00ff4140',
            }}
          >
            {displayText}
            <span
              className={`inline-block w-[3px] md:w-[5px] h-[0.85em] bg-[#00ff41] ml-1 align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              style={{
                boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41',
              }}
            />
          </h1>

          {/* Subtle reflection */}
          <div
            className="h-12 md:h-16 mt-2 md:mt-4 opacity-20 blur-[2px]"
            style={{
              background: 'linear-gradient(to bottom, #00ff41, transparent)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
            }}
          />
        </div>

        {/* Status line */}
        <div
          className={`mt-8 md:mt-12 font-mono text-[10px] md:text-xs tracking-widest text-[#00ff41]/30 transition-opacity duration-1000 ${typingComplete ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#00ff41] mr-2 animate-pulse"
            style={{ boxShadow: '0 0 8px #00ff41' }}
          />
          PROCESS COMPLETE
        </div>
      </main>

      {/* Decorative corner elements */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-[#00ff41]/20 z-20" />
      <div className="fixed top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 border-r-2 border-t-2 border-[#00ff41]/20 z-20" />
      <div className="fixed bottom-16 left-4 md:bottom-20 md:left-6 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-[#00ff41]/20 z-20" />
      <div className="fixed bottom-16 right-4 md:bottom-20 md:right-6 w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-[#00ff41]/20 z-20" />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 py-3 md:py-4 text-center">
        <p className="font-mono text-[10px] md:text-xs text-[#00ff41]/25 tracking-wide">
          Requested by <span className="text-[#00ff41]/40">@web-user</span> · Built by <span className="text-[#00ff41]/40">@clonkbot</span>
        </p>
      </footer>

      {/* Global styles */}
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.04; }
          92% { opacity: 0.02; }
          94% { opacity: 0.08; }
          96% { opacity: 0.02; }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
