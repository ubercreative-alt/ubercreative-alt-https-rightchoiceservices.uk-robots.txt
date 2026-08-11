import { motion } from "framer-motion";

const DEFAULT_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fades content in with a subtle upward slide once it enters the viewport.
 * Runs once per element (no re-trigger on scroll back).
 *
 * Props:
 *  - delay: seconds of delay before the animation starts (for stagger)
 *  - duration: seconds the animation takes (default 0.6)
 *  - as: element tag (default "div")
 *  - amount: fraction of the element that must be visible before triggering (0-1)
 *  - className, children, ...rest — passed through
 */
export const Reveal = ({
  children,
  delay = 0,
  duration = 0.6,
  amount = 0.15,
  as = "div",
  className,
  ...rest
}) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={DEFAULT_VARIANTS}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};
