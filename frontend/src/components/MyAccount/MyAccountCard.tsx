import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
type Props = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  className?: string;
  cartPosition?: string;
};

export default function MyAccountCard({
  setter,
  children,
  className,
  cartPosition,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  useClickOutside(ref, () => setter(false))

  return (
    <div
      className={`${cartPosition} top-2 absolute -left-12.5 z-55 shadow-2xl `}
    >
      <div
        className={`rounded shadow-md h-auto bg-white
                  max-h-[400px] w-[12rem]
                  relative
                  after:content-[''] after:absolute after:-top-2 ${className} 
                  after:w-0 after:h-0 
                  after:border-l-[8px] after:border-l-transparent
                  after:border-r-[8px] after:border-r-transparent
                  after:border-b-[8px] after:border-b-white
                  after:shadow-t-sm
                `}
      >
        <div className="flex flex-col py-4">{children}</div>
      </div>
    </div>
  );
}
