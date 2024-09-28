import { ReactNode } from "react";
import BlurBackground from "../BlurBackground";
import mergeTW from "utils/mergeTW";

type Props = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  isActive: boolean;
  variant?: "default" | "custom";
  className?: string;
  classNameContainer?: string;
  onCancel?: () => void;
};

export default ({
  children,
  title,
  description,
  icon,
  isActive,
  variant = "default",
  className = "",
  classNameContainer,
  onCancel,
}: Props) => {
  return (
    <div className={`fixed w-full h-full inset-0 z-40 overflow-y-auto ${isActive ? 'transition-opacity duration-500 ease-in-out opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <BlurBackground isActive={true} setActive={onCancel} />
      <div
        className={mergeTW(
          `flex items-center min-h-screen px-10 py-12 ${classNameContainer}`
        )}
      >
        <div
          className={mergeTW(
            `relative z-10 w-full max-w-4xl p-4 mx-auto bg-slate-800 rounded-xl shadow-xl transform transition-transform duration-500 ease-in-out ${isActive ? 'scale-100' : 'scale-95'}` // Añadir transformación
          )}
        >
          {variant == "default" ? (
            <div className="py-3 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-zinc-800 rounded-full">
                {icon}
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="font-medium text-zinc-50 text-lg">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {description}
                </p>
                <div className="items-center gap-2 mt-3 sm:flex">
                  {children}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {variant == "custom" ? children : ""}
        </div>
      </div>
    </div>
  );
};
