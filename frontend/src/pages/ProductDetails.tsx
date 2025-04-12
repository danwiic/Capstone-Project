import Navbar from "../components/Nav/Navbar";

export default function ProductDetails() {
  return (
    <>
      <Navbar>
        <main className="px-20 py-16 flex gap-10">
          <div className="flex flex-col gap-10 w-full">
            <div
              className="w-[40rem] h-[40rem] bg-white shadow-md 
            p-6 rounded flex gap-4 border-l-5 border-mayormoto-blue
            "
            >
              <div className="flex flex-col gap-2">
                <div className="bg-yellow-200 w-20 h-full"></div>
                <div className="bg-yellow-200 w-20 h-full"></div>
                <div className="bg-yellow-200 w-20 h-full"></div>
                <div className="bg-yellow-200 w-20 h-full"></div>
                <div className="bg-yellow-200 w-20 h-full"></div>
                <div className="bg-yellow-200 w-20 h-full"></div>
              </div>
              <div className=" w-full flex justify-center">
                <img
                  src="https://i.postimg.cc/YCc54BPn/Gille-Astral-Honda-Grey-4-800.png"
                  className="w-auto h-auto rounded-md scale-80"
                />
              </div>
            </div>
            <div
              className="w-[40rem] h-auto bg-white 
            shadow-md p-6 rounded flex gap-4
            flex-col border-l-5 border-mayormoto-blue"
            >
              <span className="text-md font-medium text-gray-700">
                PRODUCT DESCRIPTION
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-gray-700">
                  Black z53 Gille
                </h3>
                <p className="text-gray-500 text-sm leading-loose">
                  No description available.
                </p>
              </div>
            </div>
          </div>
          <div className="sticky border-l-5 border-mayormoto-blue top-30 w-full h-[30rem] bg-white shadow-md p-6 rounded"></div>
        </main>

        {/* SUGGESTED PRODUCTS */}
        <div className=" w-full px-20 py-10 mb-10 flex flex-col gap-4 h-auto">
          <h2 className="text-xl font-bold text-gray-700">You may also like</h2>
          <div className="bg-white rounded w-full h-50">Reco products here</div>
        </div>
      </Navbar>
    </>
  );
}
