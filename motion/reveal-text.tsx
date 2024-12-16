import { motion } from "framer-motion";

interface RevealTextProps {
  className?: string;
  text: string;
  transitionDuration?: number;
  transitionDelay?: number;
}

function RevealText({
  className,
  text,
  transitionDuration,
  transitionDelay,
}: RevealTextProps) {
  const splited = text.split(" ");

  return (
    <>
      {splited.map((el, i) => (
        <motion.span
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: transitionDuration || 0.25,
            delay: i / (transitionDelay || 20),
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </>
  );
}

export default RevealText;
