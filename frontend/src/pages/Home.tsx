
import Navbar from "../components/Navbar";
import bg from "../images/home_bg1.jpg";
import CategoriesCard from "../ui/CategoriesCard";
import Search from "../ui/Search";

function Home() {




  

  return (
    <div>
      <Navbar>
        <div className="p-10 px-20 flex flex-col gap-10 justify-center ">
          <div className="relative h-100">
            <img
              src={bg}
              alt=""
              className="h-full w-full object-cover rounded-xs absolute object-center lg:w-screen"
            />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-2xl">Categories</span>
            <div className="grid gap-1 grid-cols-6 w-max justify-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <CategoriesCard
                  key={i}
                  label="Helmets"
                  image="https://www.motoworld.com.ph/cdn/shop/files/SHOEI_NEOTEC_3_MATTE_ANTHRACITE.jpg?v=1738236860&width=1214"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-2xl">New Items</span>
            <div className="grid gap-1 grid-cols-6 w-max justify-center">
              {Array.from({ length: 12 }).map((_, i) => (
                <CategoriesCard
                  key={i}
                  label="Waha"
                  image="data:image/jpeg;base64,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"
                />
              ))}
            </div>
          </div>

          <div>
              <Search/>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Home;
