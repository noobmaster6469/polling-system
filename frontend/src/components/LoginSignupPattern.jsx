import React from "react";
import { motion } from "framer-motion";

const LoginSignupPattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center gap-8 flex-col bg-base-200 p-4">
      <div className="flex justify-center items-center  p-10 ">
        <motion.div
          className="grid grid-cols-2 gap-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-24 h-24 bg-accent/60 rounded-full shadow-lg animate-pulse"
            ></div>
          ))}
        </motion.div>
      </div>
      <div className="text flex flex-col items-center">
        <h1 className="text-2xl align-center">{title}</h1>
        <p className="text-md">{subtitle}</p>
      </div>
    </div>
  );
};

export default LoginSignupPattern;
