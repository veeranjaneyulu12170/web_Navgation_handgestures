# 🌌 Hand Gesture Navigation System

A cutting-edge web application that enables browser navigation through AI-powered hand gesture recognition. Experience the future of web browsing with intuitive hand movements in a beautiful space-themed interface.

![Hand Gesture Navigation](https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🚀 Live Demo

**Deployed Site**: [https://rad-froyo-34cf23.netlify.app](https://rad-froyo-34cf23.netlify.app)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Hand Gesture Recognition** - Advanced AI detects hand gestures through your camera
- **Universal Browser Control** - Navigate across all browser tabs and applications
- **Cross-tab Communication** - Gestures work system-wide using BroadcastChannel API
- **Live Statistics** - Track gesture accuracy, detection rate, and actions executed

### 🎨 Design & UX
- **Space-themed Interface** - Beautiful black-gray gradient with animated stars
- **Parallax Scrolling** - Immersive depth effects throughout the landing page
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Professional micro-interactions and transitions
- **Glassmorphism Effects** - Modern UI with backdrop blur and transparency

### 🤲 Supported Gestures

| Gesture | Action | Description |
|---------|--------|-------------|
| 👆 **Point Up** | Scroll Up | Point index finger upward |
| 👇 **Point Down** | Scroll Down | Point index finger downward |
| 👈 **Point Left** | Previous Tab/Page | Point index finger left |
| 👉 **Point Right** | Next Tab/Page | Point index finger right |
| ✋ **Open Palm** | Stop/Pause | Show open palm |
| 👌 **OK Sign** | Click/Select | Make OK gesture |
| ✌️ **Peace Sign** | Refresh Page | Show peace sign |
| 🤏 **Pinch** | Zoom/Fullscreen | Pinch gesture |

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite
- **Computer Vision**: MediaPipe Tasks Vision (ready for integration)
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hand-gesture-navigation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 Usage

### Getting Started
1. **Launch the application** and land on the beautiful space-themed homepage
2. **Click "Start Gesture Control"** to navigate to the gesture recognition interface
3. **Allow camera permissions** when prompted
4. **Click "Start Recognition"** to begin gesture detection
5. **Perform gestures** in front of your camera to control navigation

### Camera Setup
- Ensure good lighting for optimal gesture detection
- Position yourself 2-3 feet from the camera
- Keep your hand clearly visible in the camera frame
- Avoid cluttered backgrounds for better recognition

### Cross-tab Navigation
The system uses BroadcastChannel API to communicate between browser tabs:
- Gestures performed in one tab affect all open tabs
- Universal scroll, navigation, and control actions
- Real-time synchronization across your browsing session

## 🏗️ Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx      # Space-themed landing page
│   └── GestureNavigation.tsx # Main gesture control interface
├── hooks/
│   └── useGestureRecognition.ts # Gesture recognition logic
├── utils/
│   └── gestureActions.ts    # Browser action implementations
├── App.tsx                  # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### MediaPipe Integration
To enable real computer vision (currently simulated):

1. **Install MediaPipe**
   ```bash
   npm install @mediapipe/tasks-vision
   ```

2. **Update gesture recognition hook** to use actual MediaPipe models
3. **Configure gesture recognition parameters** in `useGestureRecognition.ts`

## 🌟 Key Components

### LandingPage Component
- **Parallax scrolling effects** with multiple layers
- **Animated star field** with 150+ twinkling stars
- **Interactive nebula effects** that respond to mouse movement
- **Shooting star animations** for dynamic visual appeal
- **Responsive feature showcase** with gesture guide

### GestureNavigation Component
- **Live camera feed** with gesture overlay
- **Real-time gesture detection** and confidence scoring
- **Statistics dashboard** with accuracy tracking
- **Interactive controls** for starting/stopping recognition
- **Comprehensive gesture guide** with visual indicators

### Custom Hooks
- **useGestureRecognition**: Manages camera access and gesture detection
- **Cross-browser compatibility** with fallback support
- **Error handling** for camera permissions and device support

## 🎨 Animations & Effects

### Landing Page Animations
- **Twinkling stars** with randomized timing
- **Floating nebula clouds** with gentle movement
- **Parallax scrolling** at multiple speeds
- **Fade-in-up animations** with staggered delays
- **Interactive hover effects** with scale and rotation

### Gesture Interface Animations
- **Real-time confidence meters** with smooth transitions
- **Status indicators** with color-coded feedback
- **Card animations** with lift and glow effects
- **Button interactions** with scale and shadow effects

## 🚀 Deployment

### Netlify Deployment
The application is configured for easy Netlify deployment:

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Node version**: 18+

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔒 Privacy & Security

- **Local processing**: All gesture recognition happens in your browser
- **No data collection**: Camera feed is not stored or transmitted
- **Secure permissions**: Camera access requires explicit user consent
- **Cross-origin security**: BroadcastChannel API respects same-origin policy

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MediaPipe** for computer vision capabilities
- **React Team** for the amazing framework
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons
- **Pexels** for stock photography

## 📞 Support

For support, questions, or feature requests:
- **Create an issue** on GitHub
- **Check the documentation** for common solutions
- **Review the gesture guide** for usage tips

---

**Built with ❤️ using React, TypeScript, and cutting-edge web technologies**

*Experience the future of web navigation today!* 🌟
