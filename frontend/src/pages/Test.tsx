import CardSkeleton from "../components/ui/CardSkeleton";
import DisplayProductCard from "../components/Card/DisplayProductCard";
// this component is for testing or editing a component

export default function Test() {
  return (
    <div className="p-10">
      <DisplayProductCard name="" imageUrl="" stock={1} price={2}/>

  

      <CardSkeleton/>
    </div>
  );
}
