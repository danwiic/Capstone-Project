import Navbar from "../components/Nav/Navbar";

export default function ProductDetails() {
  return (
    <>
      <Navbar>
        <main className="px-12 pt-16 flex gap-10">
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
                        src="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
                        className="w-auto h-auto rounded-md scale-90"
                      />
                    </div>
                  </>
                ))}
              </div>

              <div className=" w-full flex justify-center">
                <img
                  src="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
                  className="w-auto h-auto rounded-md scale-80"
                />
              </div>
            </div>

            <div
              className=" w-full h-100 md:col-span-1 
              lg:col-span-2 lg:sticky lg:top-30 bg-white 
              shadow-1 p-6 rounded 
              "
            >
              <h2>Helmet s72s Zebra</h2>

              <hr className="text-gray-300" />
              <span>SIZE</span>
              <div className="bg-red-200 h-5"></div>
            </div>

            <div
              className="bg-white w-full h-auto md:col-span-1 lg:col-span-2
              top-30 flex flex-col gap-2 shadow-1 p-6 rounded"
            >
              <span className="text-md font-medium text-gray-700">
                PRODUCT DESCRIPTION
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold text-gray-700">
                  Helmet s72s Zebra
                </h3>
                <p className="text-gray-500 text-sm leading-loose">
                  No description available.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* SUGGESTED PRODUCTS */}
        <div className=" w-full px-12 py-10 mb-10 flex flex-col gap-4 h-auto">
          <h2 className="text-xl font-bold text-gray-700">You may also like</h2>
          <div className="bg-white rounded w-full h-50 shadow-1">Reco products here</div>
        </div>
      </Navbar>
    </>
  );
}
