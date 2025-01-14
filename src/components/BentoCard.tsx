import { ReactElement } from "react";

interface BentoCardProps {
  src: string;
  title: ReactElement;
  desc: string;
}

const BentoCard = ({ src, title, desc }: BentoCardProps) => {
  return (
    <div className="size-full relative">
      <video src={src} loop muted autoPlay className="absolute left-0 top-0 size-full object-cover object-center" />

      <div className="relative z-10 size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
        </div>
        {desc && <p className="mt-3 max-w-64 text-xs md:text-base">{desc}</p>}
      </div>
    </div>
  );
};

export default BentoCard;
