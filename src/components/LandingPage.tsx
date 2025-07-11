import React, { useEffect, useState } from 'react';
import { Hand, Zap, Globe, ArrowRight, Aperture as Gesture, Eye, Navigation, Sparkles, Star } from 'lucide-react';

interface LandingPageProps {
  onNavigateToGesture: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToGesture }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate stars
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.1,
    }));
  };

  const [stars] = useState(() => generateStars(150));

  return (
    <div className="min-h-screen text-white overflow-hidden relative bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Animated Space Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Moving Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transform: `translate(${scrollY * star.speed * 0.1}px, ${scrollY * star.speed * 0.05}px)`,
              animationDelay: `${star.id * 0.1}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Nebula Effects */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
        <div 
          className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full blur-3xl animate-float-delayed"
          style={{
            transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px) translate(${mousePosition.x * -0.008}px, ${mousePosition.y * 0.008}px)`,
          }}
        />
        <div 
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${scrollY * 0.06}px, ${scrollY * -0.04}px) translate(${mousePosition.x * 0.005}px, ${mousePosition.y * -0.005}px)`,
          }}
        />

        {/* Shooting Stars */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-shooting-star" />
        <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 animate-shooting-star-delayed" />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8 min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-black/60 backdrop-blur-sm"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        <div className="relative max-w-6xl mx-auto w-full">
          <div className="text-center">
            <div 
              className="flex justify-center mb-8"
              style={{
                transform: `translateY(${scrollY * -0.2}px) rotateX(${scrollY * 0.1}deg)`,
              }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-white rounded-full blur-xl opacity-40 animate-pulse group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl opacity-20 animate-ping"></div>
                <div className="relative bg-gradient-to-r from-gray-600 to-gray-400 p-6 rounded-full transform hover:scale-110 transition-transform duration-500 hover:rotate-12 shadow-2xl">
                  <Hand className="w-16 h-16 text-white animate-pulse" />
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Star className="w-4 h-4 text-cyan-400 animate-twinkle" />
                  </div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s' }}>
                  <div className="absolute bottom-0 left-0 transform">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-fade-in-up"
              style={{
                transform: `translateY(${scrollY * -0.1}px)`,
              }}
            >
              <span className="inline-block hover:animate-bounce">Gesture</span>{' '}
              <span className="inline-block hover:animate-bounce delay-100">Navigation</span>
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300"
              style={{
                transform: `translateY(${scrollY * -0.05}px)`,
              }}
            >
              Experience the future of web browsing with AI-powered hand gesture recognition. 
              Control your browser tabs, scroll, and navigate with simple hand movements through the digital cosmos.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              <button
                onClick={onNavigateToGesture}
                className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-600 rounded-full font-semibold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-white/25 hover:scale-105 transform hover:-translate-y-1 hover:border-white/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <span className="relative flex items-center gap-2">
                  Start Gesture Control
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 group-hover:scale-110" />
                </span>
              </button>
              
              <button className="px-8 py-4 border-2 border-gray-500 rounded-full font-semibold text-lg transition-all duration-500 hover:bg-white/10 hover:border-white hover:shadow-lg hover:shadow-white/20 transform hover:-translate-y-1">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div 
          className="max-w-6xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-fade-in-up">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Powered by advanced computer vision and machine learning for seamless interaction across the digital universe
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/60 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-white/40 transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 animate-fade-in-up delay-300"
              style={{
                transform: `translateY(${scrollY * 0.05}px) scale(1) translateY(0px)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-white rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-gray-600 to-gray-800 p-3 rounded-xl w-fit mb-4 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-200 transition-colors duration-300">Real-time Recognition</h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Advanced AI detects and interprets hand gestures in real-time with 99% accuracy, 
                  ensuring smooth and responsive navigation through space and time.
                </p>
              </div>
            </div>
            
            <div 
              className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/60 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-white/40 transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 animate-fade-in-up delay-500"
              style={{
                transform: `translateY(${scrollY * 0.03}px) scale(1) translateY(0px)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-white rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-gray-600 to-gray-800 p-3 rounded-xl w-fit mb-4 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-200 transition-colors duration-300">Universal Browser Control</h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Control any browser tab, switch between applications, and navigate 
                  across your entire browsing experience seamlessly through the cosmos.
                </p>
              </div>
            </div>
            
            <div 
              className="group relative p-8 bg-gradient-to-br from-gray-900/80 to-black/60 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-white/40 transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 animate-fade-in-up delay-700"
              style={{
                transform: `translateY(${scrollY * 0.07}px) scale(1) translateY(0px)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-white rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-gray-600 to-gray-800 p-3 rounded-xl w-fit mb-4 transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-200 transition-colors duration-300">Lightning Fast</h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Ultra-low latency processing ensures your gestures are recognized 
                  and executed instantly, providing a fluid experience at light speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gesture Guide Section */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div 
          className="max-w-6xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.08}px)`,
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent animate-fade-in-up">
              Simple Gestures, Cosmic Control
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Learn the intuitive hand gestures that will transform how you navigate through the digital universe
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { gesture: "👆", action: "Scroll Up", description: "Point index finger up" },
              { gesture: "👇", action: "Scroll Down", description: "Point index finger down" },
              { gesture: "👈", action: "Previous Tab", description: "Point index finger left" },
              { gesture: "👉", action: "Next Tab", description: "Point index finger right" },
              { gesture: "✋", action: "Stop/Pause", description: "Show open palm" },
              { gesture: "👌", action: "Click/Select", description: "Make OK sign" },
              { gesture: "✌️", action: "Refresh Page", description: "Show peace sign" },
              { gesture: "🤏", action: "Zoom", description: "Pinch gesture" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative p-6 bg-gradient-to-br from-gray-900/60 to-black/40 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-white/40 transition-all duration-500 hover:scale-110 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ 
                  animationDelay: `${300 + index * 100}ms`,
                  transform: `translateY(${scrollY * (0.02 + index * 0.005)}px) scale(1) translateY(0px)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-gray-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-white rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                <div className="relative text-center">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300 group-hover:animate-bounce">
                    {item.gesture}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-200 transition-colors duration-300">{item.action}</h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div 
          className="max-w-4xl mx-auto text-center"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
          }}
        >
          <div className="relative p-12 bg-gradient-to-r from-gray-900/70 to-black/50 rounded-3xl backdrop-blur-sm border border-gray-600/50 transform hover:scale-105 transition-all duration-500 animate-fade-in-up shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-gray-500/5 rounded-3xl animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-white rounded-3xl opacity-0 hover:opacity-20 blur transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Sparkles className="w-16 h-16 text-gray-300 animate-pulse" />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles className="w-16 h-16 text-white opacity-30" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Ready to Navigate the Cosmos?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of digital explorers who have revolutionized their browsing experience with gesture control
              </p>
              <button
                onClick={onNavigateToGesture}
                className="group relative px-10 py-5 bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-600 rounded-full font-bold text-xl transition-all duration-500 hover:shadow-2xl hover:shadow-white/25 hover:scale-110 transform hover:-translate-y-2 hover:border-white/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <span className="relative flex items-center gap-3">
                  <Gesture className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Launch Gesture Control
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2 group-hover:scale-110" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(8px) rotate(-1deg); }
          66% { transform: translateY(-12px) rotate(1deg); }
        }
        
        @keyframes shooting-star {
          0% { transform: translateX(-100vw) translateY(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(-50px); opacity: 0; }
        }
        
        @keyframes shooting-star-delayed {
          0% { transform: translateX(-100vw) translateY(0px); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateX(100vw) translateY(-30px); opacity: 0; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-shooting-star {
          animation: shooting-star 3s linear infinite;
          animation-delay: 2s;
        }
        
        .animate-shooting-star-delayed {
          animation: shooting-star-delayed 4s linear infinite;
          animation-delay: 5s;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1500 { animation-delay: 1500ms; }
        .delay-2000 { animation-delay: 2000ms; }
      `}</style>
    </div>
  );
};

export default LandingPage;