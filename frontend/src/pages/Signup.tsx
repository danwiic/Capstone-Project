import Footer from "../components/footer/Footer";
import CardSkeleton from "../components/ui/CardSkeleton";

export default function Signup() {
  return (
    <>
      <div className="px-20 py-10 flex flex-row gap-1">
        <div className="flex">
          <div>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <CardSkeleton className="sticky top-0 z-50 h-[400px]" />
        </div>
      </div>
      <Footer />
    </>
  );
}
