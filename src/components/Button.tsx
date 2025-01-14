import { ReactElement } from "react";

interface ButtonType {
  containerClass: string;
  id: string;
  title: string;
  leftIcon?: ReactElement;
  righIcon?: ReactElement;
}

const Button = ({ containerClass, id, title, leftIcon, righIcon }: ButtonType) => {
  return (
    <button id={id} className={`group relative z-10 cursor-pointer w-fit rounded-full overflow-hidden bg-violet-50 py-3 px-7 text-black ${containerClass}`}>
      {leftIcon}
      <span className="inline-flex font-general relative overflow-hidden text-xs uppercase">{title}</span>
      {righIcon}
    </button>
  );
};

export default Button;
