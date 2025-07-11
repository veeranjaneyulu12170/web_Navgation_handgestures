import React, { useRef, useEffect, useState } from 'react';
import { Camera, Settings, Home, Power, Activity, Hand, AlertCircle, CheckCircle } from 'lucide-react';

interface GestureNavigationProps {
  onNavigateToLanding: () => void;
}

const GestureNavigation: React.FC<GestureNavigationProps> = ({ onNavigateToLanding }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentGesture, setCurrentGesture] = useState<string>('None');
  const [confidence, setConfidence] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState({
    gesturesDetected: 0,
    actionsExecuted: 0,
    accuracy: 0
  });

  const gestureActions = {
    'pointing_up': () => {
      window.scrollBy(0, -100);
      setStats(prev => ({ ...prev, actionsExecuted: prev.actionsExecuted + 1 }));
    },
    'pointing_down': () => {
      window.scrollBy(0, 100);
      setStats(prev => ({ ...prev, actionsExecuted: prev.actionsExecuted + 1 }));
    },
    'pointing_left': () => {
      // Previous tab simulation
      if (document.hasFocus()) {
        window.history.back();
      }
      setStats(prev => ({ ...prev, actionsExecuted: prev.actionsExecuted + 1 }));
    },
    'pointing_right': () => {
      // Next tab simulation
      if (document.hasFocus()) {
        window.history.forward();
      }
      setStats(prev => ({ ...prev, actionsExecuted: prev.actionsExecuted + 1 }));
    },
    'open_palm': () => {
      // Stop/pause action
      setStats(prev => ({ ...prev, actionsExecuted: prev.actionsExecuted + 1 }));
    },
    'ok_sign': () => {
      // Click simulation
      setStats(prev => ({ ...prev, actionsExecuted: prev.actionsExecuted + 1 }));
    },
    'peace_sign': () => {
      // Refresh page
      window.location.reload();
      setStats(prev => ({ ...prev, actionsExecuted: prev.actionsExecuted + 1 }));
    },
    'pinch': () => {
      // Zoom simulation
      setStats(prev => ({ ...prev, actionsExecuted: prev.actionsExecuted + 1 }));
    }
  };

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsInitialized(true);
        setError('');
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
      console.error('Camera initialization failed:', err);
    }
  };

  const startGestureRecognition = () => {
    if (!isInitialized) {
      initializeCamera();
    }
    setIsActive(true);
    
    // Simulate gesture recognition
    const recognitionInterval = setInterval(() => {
      if (isActive) {
        const gestures = ['pointing_up', 'pointing_down', 'pointing_left', 'pointing_right', 'open_palm', 'ok_sign', 'peace_sign', 'pinch', 'none'];
        const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
        const randomConfidence = Math.random() * 100;
        
        setCurrentGesture(randomGesture);
        setConfidence(randomConfidence);
        
        if (randomConfidence > 70 && randomGesture !== 'none') {
          setStats(prev => ({ 
            ...prev, 
            gesturesDetected: prev.gesturesDetected + 1,
            accuracy: (prev.gesturesDetected / (prev.gesturesDetected + 1)) * 100
          }));
          
          if (gestureActions[randomGesture as keyof typeof gestureActions]) {
            gestureActions[randomGesture as keyof typeof gestureActions]();
          }
        }
      }
    }, 500);

    return () => clearInterval(recognitionInterval);
  };

  const stopGestureRecognition = () => {
    setIsActive(false);
    setCurrentGesture('None');
    setConfidence(0);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsInitialized(false);
    }
  };

  const formatGestureName = (gesture: string) => {
    return gesture.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
              <Hand className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Gesture Control
              </h1>
              <p className="text-gray-400">Advanced hand gesture recognition system</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera Feed */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-600/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Camera Feed</h2>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-400">
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                {error ? (
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                    <p className="text-red-400 text-center">{error}</p>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      playsInline
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full"
                    />
                    
                    {/* Gesture Overlay */}
                    {isActive && (
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-medium">Detecting Gestures</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Current: {formatGestureName(currentGesture)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Confidence: {confidence.toFixed(1)}%
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="flex justify-center mt-6">
                {!isActive ? (
                  <button
                    onClick={startGestureRecognition}
                    className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Camera className="w-5 h-5" />
                    Start Recognition
                  </button>
                ) : (
                  <button
                    onClick={stopGestureRecognition}
                    className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Power className="w-5 h-5" />
                    Stop Recognition
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-600/30">
              <h3 className="text-xl font-bold mb-4">Current Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Gesture</span>
                  <span className="font-semibold">{formatGestureName(currentGesture)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Confidence</span>
                  <span className="font-semibold">{confidence.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <div className="flex items-center gap-2">
                    {isActive ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span className="text-white">Active</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Inactive</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-600/30">
              <h3 className="text-xl font-bold mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Gestures Detected</span>
                  <span className="font-semibold">{stats.gesturesDetected}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Actions Executed</span>
                  <span className="font-semibold">{stats.actionsExecuted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="font-semibold">{stats.accuracy.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Gesture Guide */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-600/30">
              <h3 className="text-xl font-bold mb-4">Quick Guide</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>👆 Point Up</span>
                  <span className="text-gray-400">Scroll Up</span>
                </div>
                <div className="flex justify-between">
                  <span>👇 Point Down</span>
                  <span className="text-gray-400">Scroll Down</span>
                </div>
                <div className="flex justify-between">
                  <span>👈 Point Left</span>
                  <span className="text-gray-400">Previous</span>
                </div>
                <div className="flex justify-between">
                  <span>👉 Point Right</span>
                  <span className="text-gray-400">Next</span>
                </div>
                <div className="flex justify-between">
                  <span>✋ Open Palm</span>
                  <span className="text-gray-400">Stop</span>
                </div>
                <div className="flex justify-between">
                  <span>👌 OK Sign</span>
                  <span className="text-gray-400">Click</span>
                </div>
                <div className="flex justify-between">
                  <span>✌️ Peace Sign</span>
                  <span className="text-gray-400">Refresh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestureNavigation;