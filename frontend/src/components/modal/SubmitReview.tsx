import { Plus, X } from "lucide-react";
import Rate from "../rating/Rate";
import { useState } from "react";

interface SubmitReviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitReview({ isOpen, onClose }: SubmitReviewProps) {
  if (!isOpen) return null;
  const [value, setValue] = useState<number>(0);
  const [hover, setHover] = useState(-1);
  const [images, setImages] = useState<string[]>([]);
  const starDescriptions: Record<number, string> = {
    0: "Review",
    1: "Poor",
    2: "Below Average",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages((prev) => [...prev, event.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center
    bg-gray-900/45 z-50"
    >
      <div
        className="max-w-xs min-w-xs  p-4 bg-white rounded-lg shadow-lg
      flex flex-col gap-1"
      >
        <div className="flex items-center justify-end">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            {value !== null && (
              <div
                className="font-medium text-xl
              "
              >
                {starDescriptions[hover !== -1 ? hover : value]}
              </div>
            )}
            <Rate
              precision={1}
              value={value}
              size="large"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="review" className="font-medium text-sm">
                Write Your Review
              </label>
              <textarea
                id="review"
                className="w-full min-h-26 border border-gray-300 
                rounded-md p-2  focus:outline-mayormoto-pink text-sm
                focus:outline-2 transition duration-200 ease-in-out"
                placeholder="Write your opinion about the product..."
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="attach" className="font-medium text-sm">
                Attach a photo (optional)
              </label>
              <div className="w-fit flex gap-3">
                <div>
                  <label htmlFor="attach" id="attachOriginal" className="w-fit">
                    <Plus
                      size={45}
                      className="p-3 text-white bg-mayormoto-pink
              rounded-full cursor-pointer hover:bg-mayormoto-pink/80"
                    />
                  </label>
                  <input
                    type="file"
                    id="attach"
                    name="attach"
                    multiple
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                  />
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {images.map((src, index) => (
                    <div className="relative" key={index}>
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-auto h-15 object-cover rounded-md"
                      />
                      <span>
                        <X
                          size={25}
                          className="absolute -top-2 -right-2 bg-gray-200 
                          rounded-full text-gray-500 p-1 cursor-pointer"
                          onClick={() =>
                            setImages((prev) => {
                              return prev.filter((_, i) => i !== index);
                            })
                          }
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="w-full py-2.5 text-sm font-medium bg-mayormoto-pink
            hover:bg-mayormoto-pink/80 text-white rounded transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
