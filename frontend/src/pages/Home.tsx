import Navbar from "../components/Navbar";
import bg from "../images/home_bg1.jpg";
import CategoriesCard from "../ui/CategoriesCard";

function Home() {
  return (
    <div>
      <Navbar>
        <div className="p-10 px-20 flex flex-col gap-10">
          <div className="relative h-100">
            <img
              src={bg}
              alt=""
              className="h-full w-full object-cover rounded-xs absolute object-center"
            />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-2xl">Categories</span>
            <div className="grid gap-1 grid-cols-6 w-max">
              {Array.from({ length: 6 }).map((_, i) => (
                <CategoriesCard
                  key={i}
                  label="Helmets"
                  image="https://www.motoworld.com.ph/cdn/shop/files/SHOEI_NEOTEC_3_MATTE_ANTHRACITE.jpg?v=1738236860&width=1214"
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-2xl">Featured Products</span>
            <div className="grid gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <CategoriesCard
                  key={i}
                  label="Helmets"
                  image="https://www.motoworld.com.ph/cdn/shop/files/SHOEI_NEOTEC_3_MATTE_ANTHRACITE.jpg?v=1738236860&width=1214"
                />
              ))}
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Home;
