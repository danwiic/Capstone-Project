import { Loader2 } from "lucide-react";

export default function SpinningLoader() {
  return (
    <div className="absolute top-[30%] left-[50%] flex items-center justify-center">
      <Loader2
        className="animate-spin size-12 
    text-mayormoto-pink"
      />
    </div>
  );
}
