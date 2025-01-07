// Quantum Market Visualization
import { useEffect, useRef } from 'react';

export function QuantumFieldVisualizer({ data, dimensions = 4 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    function drawQuantumField() {
      ctx.clearRect(0, 0, width, height);
      
      // Draw velocity field
      data.states.forEach(state => {
        const x = (state.phase.angle + Math.PI) * width / (2 * Math.PI);
        const y = state.phase.magnitude * height / 2;
        const intensity = state.probability * 255;
        
        ctx.fillStyle = `rgba(${intensity}, ${intensity * 0.5}, 255, 0.5)`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw quantum tunneling events
      data.tunnelEvents?.forEach(event => {
        const x = (event.phase.angle + Math.PI) * width / (2 * Math.PI);
        const y = event.magnitude * height / 2;
        
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      });
    }

    const animationFrame = requestAnimationFrame(drawQuantumField);
    return () => cancelAnimationFrame(animationFrame);
  }, [data, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      width={800}
      height={600}
    />
  );
}
