'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface BlobCursorProps {
    opacity?: number;
    size?: number;
}

export const BlobCursor: React.FC<BlobCursorProps> = ({
    opacity = 0.5,
    size = 40,
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const { theme } = useTheme();

    // Theme-based colors
    const getThemeColor = () => {
        switch (theme) {
            case 'light':
                return '#3b82f6'; // Blue for light theme
            case 'dark':
                return '#60a5fa'; // Lighter blue for dark theme
            case 'red':
                return '#ef4444'; // Red
            case 'blue':
                return '#3b82f6'; // Blue
            case 'purple':
                return '#a855f7'; // Purple
            case 'green':
                return '#10b981'; // Green
            default:
                return '#3b82f6';
        }
    };

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className="pointer-events-none fixed z-[9999] mix-blend-difference"
            style={{
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -50%)',
            }}
        >
            <div
                className="animate-pulse"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: getThemeColor(),
                    opacity: opacity,
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    transition: 'all 0.15s ease-out',
                }}
            />
        </div>
    );
};

export default BlobCursor;
