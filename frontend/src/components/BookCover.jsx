import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const BookCover = ({ image = "/illustrations/cover.png", className = "" }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 120, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 120, damping: 16 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
      className={`relative ${className}`}
      data-testid="book-cover"
    >
      <div className="absolute -inset-10 rounded-full bg-copper/30 blur-3xl" aria-hidden="true" />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[904/1160] w-full overflow-hidden rounded-[4px] shadow-[0_40px_80px_-20px_rgba(33,40,58,0.5)]"
      >
        <img
          src={image}
          alt="Believe, Joanie, Believe by Jay. A Lions — official book cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/35 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/15" aria-hidden="true" />
      </motion.div>
    </div>
  );
};
