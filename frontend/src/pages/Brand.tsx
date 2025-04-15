import ProductCart from "../components/Card/ProductCart";
import BrandLayout from "../components/Layout/BrandLayout";
import Navbar from "../components/Nav/Navbar";

export default function Brand() {
  return (
    <>
      <Navbar>
        <div className="px-16 py-10">
          <BrandLayout>
            {Array.from({ length: 16 }).map((_, i) => (
              <ProductCart
                key={i}
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
              />
            ))}
          </BrandLayout>
        </div>
      </Navbar>
    </>
  );
}
