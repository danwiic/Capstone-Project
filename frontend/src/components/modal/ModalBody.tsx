import { X } from "lucide-react";

interface ModalBodyProps {
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
  isOpen?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizeClasses = {
  sm: "w-72",
  md: "w-96",
  lg: "w-[32rem]",
  xl: "w-[36rem]",
  "2xl": "w-[42rem]",
};

export default function ModalBody({
  children,
  title,
  onClose,
  isOpen,
  size = "md",
}: ModalBodyProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45
     bg-opacity-50"
    >
      <div
        className={`bg-white rounded-md flex flex-col max-h-[40rem] overflow-hidden  ${sizeClasses[size]} `}
      >
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="text-lg font-bold">{title}</span>
          <span>
            <X
              onClick={onClose}
              size={20}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
            />
          </span>
        </div>
        <main className="px-4 py-2 flex flex-col gap-2 overflow-auto ">{children}</main>
      </div>
    </div>
  );
}
