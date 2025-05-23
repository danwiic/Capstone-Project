import { Loader2 } from "lucide-react";

export default function SpinningLoader() {
  return (
    <div className="absolute flex items-center justify-center z-10">
      <Loader2
        className="animate-spin size-12 
    text-mayormoto-pink"
      />
    </div>
  );
}
