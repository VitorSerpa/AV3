import React from "react";
import style from "./Button.module.css"

interface ButtonProps {
  title: string;
  link?: string;
  onClick?: () => void;
}

export default function Button({ title, link, onClick }: ButtonProps) {
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
