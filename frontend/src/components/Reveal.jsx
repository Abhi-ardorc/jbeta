import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const MaskedLines = ({ lines, className = "", lineClassName = "", delay = 0.1 }) => (
  <span className={`block ${className}`}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
        <motion.span
          className={`block ${lineClassName}`}
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, delay: delay + i * 0.13, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

export const FadeUp = ({ children, delay = 0, className = "", y = 36 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.85, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);
