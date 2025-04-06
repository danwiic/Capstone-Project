import CardSkeleton from "../components/ui/CardSkeleton";

export default function Signup() {
  return (
    <div className="p-4 flex flex-row gap-1">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
