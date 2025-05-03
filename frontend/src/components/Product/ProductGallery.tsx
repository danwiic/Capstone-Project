import { useRef, useState } from "react";

export default function ProductGallery({
  images,
}: {
  images: { imageUrl: string }[];
}) {
  const imgRef = useRef(null);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e: any) => {
    const bounds = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="md:col-span-1 lg:col-span-2 bg-white shadow-1 p-4 rounded flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            className="w-16 h-16 flex justify-center items-center border rounded overflow-hidden"
          >
            <img src={img.imageUrl} className="w-auto h-full " />
          </div>
        ))}
      </div>
      <div className="relative flex-1">
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          ref={imgRef}
          className="w-full h-96 flex justify-center items-center overflow-hidden relative z-20 cursor-zoom-in"
        >
          <img
            src={images[0].imageUrl}
            className="h-full object-contain rounded-md"
          />
        </div>
        {showZoom && (
          <div
            className="w-64 h-64 border shadow-md border-gray-300 bg-white bg-no-repeat bg-contain absolute left-[110%] top-0 z-10"
            style={{
              backgroundImage: `url('${images[0].imageUrl}')`,
              backgroundSize: "160%",
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
