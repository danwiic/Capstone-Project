import ProductCart from "../components/Card/ProductCart";
import Navbar from "../components/Nav/Navbar";
import Button from "../components/ui/button/Button";
import { formatMoney } from "../utils/formatMoney";

export default function ProductDetails() {
  return (
    <>
      <Navbar>
        <main className="px-30 py-10 flex gap-10">
          <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-4 w-full">
            <div
              className=" w-full h-auto md:col-span-1 
              lg:col-span-2 bg-white shadow-1
              p-6 rounded flex gap-4 "
            >
              <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <>
                    <div
                      key={i}
                      className="w-20 h-20 flex justify-center first:border-b-mayormoto-blue-hover
                      first:border-2 rounded"
                    >
                      <img
                        src="https://res.cloudinary.com/dvexdyqea/image/upload/v1745207283/EVO_RX-7_Magenta_-_2_800_kajpcz.png"
                        className="w-auto h-auto rounded-md scale-90"
                      />
                    </div>
                  </>
                ))}
              </div>

              <div className=" w-full flex justify-center">
                <img
                  src="https://res.cloudinary.com/dvexdyqea/image/upload/v1745207283/EVO_RX-7_Magenta_-_2_800_kajpcz.png"
                  className="w-auto h-auto rounded-md scale-80"
                />
              </div>
            </div>

            <div
              className="md:col-span-1 
              lg:col-span-2 row-span-3"
            >
              <div
                className=" w-full h-110  lg:sticky lg:top-40 bg-white 
              shadow-1 p-6 rounded flex flex-col justify-between
              "
              >
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl font-bold">
                    Gille Astral Honda Grey
                  </h2>
                  <hr className="text-gray-300" />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="font-medium flex gap-2">
                    <span>Size:</span>
                    <span>SM</span>
                  </div>
                  <div className=" flex gap-2">
                    <span
                      className="p-1 bg-white border-1 border-mayormoto-blue
                text-gray-700 hover:text-gray-700 cursor-pointer font-medium"
                    >
                      MD
                    </span>

                    <span
                      className="p-1 bg-white border-1 border-gray-200 
                text-gray-400 hover:text-gray-700 cursor-pointer font-medium"
                    >
                      LG
                    </span>
                    <span
                      className="p-1 bg-white border-1 border-gray-200 
                text-gray-400 hover:text-gray-700 cursor-pointer font-medium"
                    >
                      XL
                    </span>
                    <span
                      className="p-1 bg-white border-1 border-gray-200 
                text-gray-400 hover:text-gray-700 cursor-pointer font-medium"
                    >
                      2XL
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="font-medium">Price:</span>
                  <span className="text-2xl text-red-500 font-medium">
                    {formatMoney(10000)}
                  </span>
                </div>

                <div className="flex flex-row gap-2 items-center">
                  <span className="font-medium">Quantity: </span>
                  <div className="border-1 border-gray-200">
                    <button className="p-1 border-r-1 px-3 border-gray-200 text-xl font-medium text-gray-400 hover:text-gray-700 cursor-pointer">
                      -
                    </button>
                    <input
                      type="text"
                      defaultValue={1}
                      className="w-10 outline-0 text-center text-gray-700 text-sm"
                    />
                    <button className="p-1 border-l-1 px-3 border-gray-200 text-xl font-medium text-gray-400 hover:text-gray-700 cursor-pointer">
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="rounded-xs">Add to cart</Button>
                  <Button className="bg-red-500 hover:bg-red-400 rounded-xs">
                    Buy it now
                  </Button>
                </div>
              </div>
            </div>

            <div
              className="bg-white w-full h-auto md:col-span-1 lg:col-span-2
              top-30 flex flex-col gap-2 shadow-1 p-6 rounded"
            >
              <span className="text-md font-medium text-gray-700">
                PRODUCT DESCRIPTION
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-gray-700">
                  Gille Astral Honda Grey
                </h3>
                <p className="text-gray-500 text-sm leading-loose">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Autem, rerum alias. Quae dicta optio repellendus. Ipsa laborum
                  voluptates magnam dolorum eius, unde, autem eligendi nesciunt
                  molestias nobis aliquam, deleniti maiores? Sequi ipsa, nam
                  recusandae veritatis perspiciatis necessitatibus sint
                  molestiae unde voluptatem ut optio expedita non reprehenderit,
                  possimus minima nihil error nisi quidem. Itaque libero quia
                  quo doloribus pariatur praesentium quae! Ut mollitia ad iste
                  culpa enim? Illo ab pariatur, necessitatibus nemo blanditiis,
                  voluptas aperiam soluta officiis esse quas corporis? Magni
                  enim alias veritatis autem, corrupti dicta iure quasi! Sequi,
                  cupiditate.
                </p>
              </div>
            </div>

            <div
              className="bg-white w-full h-auto md:col-span-1 lg:col-span-2
              top-30 flex flex-col gap-2 shadow-1 p-6 rounded"
            >
              <span className="text-md font-medium text-gray-700">Reviews</span>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-gray-700">
                  This product has no reviews yet.
                </h3>
                <p className="text-gray-500 text-sm leading-loose"></p>
              </div>
            </div>
          </div>
        </main>

        {/* SUGGESTED PRODUCTS */}
        <div className=" w-full px-30 py-10 mb-10 flex flex-col gap-4 h-auto">
          <h2 className="text-xl font-bold text-gray-700">You may also like</h2>
          <div className="flex rounded w-full gap-1 shadow-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCart
                key={i}
                name="Gille Astral Honda Grey"
                price={4800}
                brand="gille"
                imageUrl="https://res.cloudinary.com/dvexdyqea/image/upload/v1745207283/EVO_RX-7_Magenta_-_2_800_kajpcz.png"
              />
            ))}
          </div>
        </div>
      </Navbar>
    </>
  );
}
