//framer motion
import { motion } from "framer-motion";

//hooks
import { useState } from "react";

const HoverMotion = ({ children, hoverScale = 1.1, hoverRotate = 5 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? hoverScale : 1,
        rotate: isHovered ? hoverRotate : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
};

export default HoverMotion;
