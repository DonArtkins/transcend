"use client";

import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  id?: string;
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClass?: string;
  onClick?: () => void;
}

export const Button = ({ id, title, leftIcon, rightIcon, containerClass, onClick }: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black transition-all duration-500 hover:scale-105",
        containerClass || "bg-yellow-300"
      )}
    >
      {leftIcon}
      
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase font-semibold">
        <div className="translate-y-0 transition-transform duration-500 group-hover:-translate-y-[160%]">
          {title}
        </div>
        <div className="absolute inset-0 translate-y-[160%] transition-transform duration-500 group-hover:translate-y-0">
          {title}
        </div>
      </span>

      {rightIcon}
    </button>
  );
};
