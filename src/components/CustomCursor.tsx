import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useResponsive } from '../hooks/useResponsive';

export const CustomCursor = () => {
    const { isMobile } = useResponsive();
    if (Platform.OS !== 'web' || isMobile) return null;

    useEffect(() => {
        // Main cursor (the sharp pointer/circle)
        const cursor = document.createElement('div');
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.backgroundColor = '#00ff9d'; // Neon green
        cursor.style.borderRadius = '50%';
        cursor.style.position = 'fixed';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.transition = 'transform 0.1s ease, width 0.2s, height 0.2s, background-color 0.2s';
        document.body.appendChild(cursor);

        // Follower/Lag element (optional, for warmer feel)
        const follower = document.createElement('div');
        follower.style.width = '30px';
        follower.style.height = '30px';
        follower.style.border = '1px solid rgba(0, 255, 157, 0.5)';
        follower.style.borderRadius = '50%';
        follower.style.position = 'fixed';
        follower.style.pointerEvents = 'none';
        follower.style.zIndex = '9998';
        follower.style.transform = 'translate(-50%, -50%)';
        follower.style.transition = 'left 0.15s ease-out, top 0.15s ease-out, transform 0.2s';
        document.body.appendChild(follower);

        const onMouseMove = (e: MouseEvent) => {
            // Instant move for main cursor
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            // Slight delay for follower handled by CSS transition
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;

            // "Sprinkle" trail
            if (Math.random() > 0.9) { // 10% chance per move event
                const sprinkle = document.createElement('div');
                const size = Math.random() * 4 + 2;
                sprinkle.style.width = `${size}px`;
                sprinkle.style.height = `${size}px`;
                sprinkle.style.background = 'rgba(255, 255, 255, 0.8)';
                sprinkle.style.position = 'fixed';
                sprinkle.style.left = `${e.clientX}px`;
                sprinkle.style.top = `${e.clientY}px`;
                sprinkle.style.borderRadius = '50%';
                sprinkle.style.pointerEvents = 'none';
                sprinkle.style.zIndex = '9997';

                // Random direction drift
                const driftX = (Math.random() - 0.5) * 40;
                const driftY = (Math.random() - 0.5) * 40;

                sprinkle.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'ease-out',
                    fill: 'forwards'
                }).onfinish = () => sprinkle.remove();

                document.body.appendChild(sprinkle);
            }
        };

        // Hover effects
        const addHover = () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.5)'; // Shrink pointer
            cursor.style.backgroundColor = 'transparent'; // Hide center
            follower.style.transform = 'translate(-50%, -50%) scale(2.5)'; // Expand ring
            follower.style.backgroundColor = 'rgba(0, 255, 157, 0.1)'; // Fill ring slightly
            follower.style.borderColor = 'transparent';
        };

        const removeHover = () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = '#00ff9d';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.backgroundColor = 'transparent';
            follower.style.borderColor = 'rgba(0, 255, 157, 0.5)';
        };

        const setupListeners = () => {
            const interactiveelements = document.querySelectorAll('a, button, [role="button"], input');
            interactiveelements.forEach(el => {
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', removeHover);
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        // Setup listeners on mount and periodcally (for new elements)
        setupListeners();
        const observer = new MutationObserver(setupListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        // Hide default cursor
        document.body.style.cursor = 'none';
        const style = document.createElement('style');
        style.innerHTML = `* { cursor: none !important; }`;
        style.id = 'hide-cursor-style';
        document.head.appendChild(style);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            if (document.body.contains(cursor)) document.body.removeChild(cursor);
            if (document.body.contains(follower)) document.body.removeChild(follower);
            const styleEl = document.getElementById('hide-cursor-style');
            if (styleEl) styleEl.remove();
            document.body.style.cursor = 'auto';
        };
    }, []);

    return null;
};
