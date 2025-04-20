import ProductCart from "../components/Card/ProductCart";
import BrandLayout from "../components/Layout/BrandLayout";
import Navbar from "../components/Nav/Navbar";

export default function Brand() {
  return (
    <>
      <Navbar>
        <div className="p-10">
          <BrandLayout>
            {Array.from({ length: 16 }).map((_, i) => (
              <ProductCart
                key={i}
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://res.cloudinary.com/dvexdyqea/image/upload/v1744769418/EVO_RX-7_Magenta_-_2_800_xeiiow.png"
              />
            ))}
          </BrandLayout>
        </div>
      </Navbar>
    </>
  );
}
