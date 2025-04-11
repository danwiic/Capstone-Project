import Navbar from "../components/Nav/Navbar";
import bg from "../images/gille-astral.png";
import CategoriesCard from "../components/ui/CategoriesCard";
import gille from "../images/logo/gille_logo.png";
import Footer from "../components/footer/Footer";

// import { useUserContext } from "../context/UserContext";
// import { useEffect } from "react";
function Home() {
  // const { userID, isLoggedIn, setUser } = useUserContext();

  // useEffect(() => {
  //   // Set user only once on mount
  //   setUser({
  //     userID: "12345",
  //     isLoggedIn: true,
  //   });
  //   console.log(userID, isLoggedIn);

  // }, [setUser])

  return (
    <div>
      <Navbar>
        <div className="flex flex-col gap-10 justify-center pb-10">
          <div className="relative h-auto w-full">
            <img
            title="Background Image"
              src={bg}
              alt=""
              className="h-full w-full object-cover cursor-pointer"
            />
          </div>

          <div className="px-20 flex flex-col gap-10">
            <div className="flex flex-col gap-4 m-20">
              <span className="text-2xl font-medium">Featured Brands</span>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 auto-cols-auto gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CategoriesCard key={i} image={gille} label="Gille" />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 ">
              <span className="text-2xl font-medium">Featured Brands</span>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 auto-cols-auto gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <CategoriesCard key={i} label="Gille" image={"https://i.postimg.cc/bvV8St8p/FTR-Premium-45-L-Plastic-3-800.png"} />
                ))}
              </div>
            </div>

            
          </div>

          {/*  */}
          {/* <div className="bg-gray-200 w-full p-2 flex flex-row gap-1 rounded-lg shadow-lg">
            {Array.from({length : 6}).map((_, i) => (
              <button className="cursor-pointer py-2 px-4 hover:bg-white rounded-lg text-gray-500 hover:shadow:xl hover:text-gray-800 transition-all duration-300">
              1asdasd{i}
            </button>
            ))}
           
          </div> */}
        </div>
      </Navbar>
      <Footer/>
    </div>
  );
}

export default Home;
