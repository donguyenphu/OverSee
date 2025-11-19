import { useEffect } from 'react';

const ZoomControl = () => {
  useEffect(() => {
    // Prevent zoom via keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')
      ) {
        e.preventDefault();
      }
    };

    // Prevent zoom via mouse wheel
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Prevent pinch zoom on touch devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent double-tap zoom on mobile
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Prevent gesture events (iOS Safari specific)
    const handleGesture = (e: Event) => {
      e.preventDefault();
    };

    // Force scale to stay at 0.8
    const enforceScale = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          'content',
          'width=device-width, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8, user-scalable=no, viewport-fit=cover'
        );
      }
      
      // Force visual viewport scale for mobile browsers
      if (window.visualViewport) {
        document.body.style.transform = 'scale(1)';
        document.body.style.transformOrigin = 'top left';
      }
    };

    // Prevent iOS Safari bounce and zoom
    const handleTouchStart = (e: TouchEvent) => {
      // Prevent pull-to-refresh
      if (e.touches.length === 1 && window.scrollY === 0) {
        const touch = e.touches[0];
        if (touch.clientY > 0) {
          // Allow scroll down
          return;
        }
      }
    };

    // Add CSS to body to prevent zoom
    document.body.style.touchAction = 'pan-x pan-y';
    document.documentElement.style.touchAction = 'pan-x pan-y';

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('gesturestart', handleGesture, { passive: false });
    document.addEventListener('gesturechange', handleGesture, { passive: false });
    document.addEventListener('gestureend', handleGesture, { passive: false });
    
    // Enforce scale on load and resize
    enforceScale();
    window.addEventListener('resize', enforceScale);
    window.addEventListener('orientationchange', enforceScale);

    // Additional mobile viewport handling
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', enforceScale);
      window.visualViewport.addEventListener('scroll', enforceScale);
    }

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('gesturestart', handleGesture);
      document.removeEventListener('gesturechange', handleGesture);
      document.removeEventListener('gestureend', handleGesture);
      window.removeEventListener('resize', enforceScale);
      window.removeEventListener('orientationchange', enforceScale);
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', enforceScale);
        window.visualViewport.removeEventListener('scroll', enforceScale);
      }
    };
  }, []);

  return null;
};

export default ZoomControl;