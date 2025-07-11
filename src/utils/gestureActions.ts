// Browser navigation actions triggered by gestures
export const executeGestureAction = (gesture: string) => {
  switch (gesture) {
    case 'pointing_up':
      // Scroll up
      window.scrollBy({ top: -100, behavior: 'smooth' });
      break;
      
    case 'pointing_down':
      // Scroll down
      window.scrollBy({ top: 100, behavior: 'smooth' });
      break;
      
    case 'pointing_left':
      // Previous page/tab
      if (window.history.length > 1) {
        window.history.back();
      }
      break;
      
    case 'pointing_right':
      // Next page/tab
      window.history.forward();
      break;
      
    case 'open_palm':
      // Stop all animations/videos
      document.querySelectorAll('video').forEach(video => {
        if (!video.paused) {
          video.pause();
        }
      });
      break;
      
    case 'ok_sign':
      // Simulate click on focused element
      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement && focusedElement.click) {
        focusedElement.click();
      }
      break;
      
    case 'peace_sign':
      // Refresh page
      window.location.reload();
      break;
      
    case 'pinch':
      // Toggle fullscreen
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      break;
      
    default:
      break;
  }
};

// Cross-tab communication using BroadcastChannel
export const broadcastGestureAction = (gesture: string, data?: any) => {
  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel('gesture-navigation');
    channel.postMessage({
      type: 'gesture-action',
      gesture,
      data,
      timestamp: Date.now()
    });
  }
};

// Listen for gesture actions from other tabs
export const setupGestureListener = (callback: (gesture: string, data?: any) => void) => {
  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel('gesture-navigation');
    
    channel.onmessage = (event) => {
      if (event.data.type === 'gesture-action') {
        callback(event.data.gesture, event.data.data);
      }
    };
    
    return () => {
      channel.close();
    };
  }
  
  return () => {};
};