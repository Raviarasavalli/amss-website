import React, { useState, useEffect, useRef } from 'react';

function Counter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Parse digits
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;
  const prefix = target.startsWith('₹') ? '₹' : '';
  const suffix = target.endsWith('+') ? '+' : '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted || numericTarget === 0) return;

    const start = 0;
    const end = numericTarget;
    const range = end - start;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * range);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, numericTarget, duration]);

  // Format count output
  const formatValue = (val) => {
    if (val === 0) return `${prefix}0${suffix}`;
    
    // Indian numbering format (en-IN)
    const formattedNum = val.toLocaleString('en-IN');
    return `${prefix}${formattedNum}${suffix}`;
  };

  return (
    <span ref={elementRef} className="counter-val">
      {formatValue(count)}
    </span>
  );
}

export default Counter;
