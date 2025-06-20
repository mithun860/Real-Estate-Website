import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const CountUp = ({
  from = 0,
  to,
  duration = 1,
  delay = 0,
  separator = ",",
  className = "",
  style = {},
}) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, motionValue, to, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = new Intl.NumberFormat("en-US", {
          useGrouping: !!separator,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(latest);

        ref.current.textContent = separator
          ? formatted.replace(/,/g, separator)
          : formatted;
      }
    });

    return () => unsubscribe();
  }, [springValue, separator]);

  return (
    <span
      ref={ref}
      className={`font-medium text-[#425036] ${className}`}
      style={{ fontFamily: "'Queensides', serif", ...style }}
      aria-label={`Animated count up to ${to}`}
    />
  );
};

export default CountUp;
