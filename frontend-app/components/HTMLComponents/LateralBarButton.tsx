import React from "react";
import style from "./LateralBarButton.module.css";

interface LateralBarButtonProps {
  title: string;
  link?: string;       // opcional
  onClick?: () => void; // opcional
}

export default function LateralBarButton({ title, link, onClick }: LateralBarButtonProps) {
  if (link) {
    return (
      <a className={style.a} href={link}>
        <button className={style.button} onClick={onClick}>
          {title}
        </button>
      </a>
    );
  }

  return (
    <button className={style.button} onClick={onClick}>
      {title}
    </button>
  );
}
