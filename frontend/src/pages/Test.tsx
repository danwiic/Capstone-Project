import DisplayProductCard from "../components/Card/DisplayProductCard";

export default function Test() {
  return (
    <div className="p-20">
      <DisplayProductCard
        name="Gille Astral Honda Grey"
        price={4800}
        brand="gille"
        imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
      />
    </div>
  );
}
