'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ClickSparkProps {
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    extraScale?: number;
}

interface Spark {
    x: number;
    y: number;
    angle: number;
    startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<Spark[]>([]);
    const startTimeRef = useRef<number | null>(null);
    const { theme } = useTheme();

    // Theme-based colors
    const getThemeColor = useCallback(() => {
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
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const easeFunc = useCallback(
        (t: number) => {
            switch (easing) {
                case 'linear':
                    return t;
                case 'ease-in':
                    return t * t;
                case 'ease-in-out':
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default:
                    return t * (2 - t);
            }
        },
        [easing]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        const draw = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }
            ctx?.clearRect(0, 0, canvas.width, canvas.height);

            sparksRef.current = sparksRef.current.filter((spark: Spark) => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) {
                    return false;
                }

                const progress = elapsed / duration;
                const eased = easeFunc(progress);

                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);

                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                ctx.strokeStyle = getThemeColor();
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                return true;
            });

            animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale, getThemeColor]);

    useEffect(() => {
        const handleClick = (e: MouseEvent): void => {
            const x = e.clientX;
            const y = e.clientY;

            const now = performance.now();
            const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
                x,
                y,
                angle: (2 * Math.PI * i) / sparkCount,
                startTime: now
            }));

            sparksRef.current.push(...newSparks);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [sparkCount]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9998]"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default ClickSpark;
