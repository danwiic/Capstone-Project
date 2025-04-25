import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/formatMoney";
import Rate from "../rating/Rate";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    productId: string;
    imageUrl?: string;
    name?: string;
    brand?: string;
    price: number;
    rating?: number;
    noOfReviews?: number;
  };
};

export default function ProductModal({
  isOpen,
  onClose,
  product,
}: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-md max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-80 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-sm uppercase font-medium text-gray-500">
                  {product.brand}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Rate readOnly={true} value={product.rating || 0} />
              <span className="text-sm text-gray-600">
                ({product.noOfReviews || 0}) Reviews
              </span>
            </div>

            <div className="text-2xl font-bold text-red-500">
              {formatMoney(product.price)}
            </div>

            <div className="flex flex-col gap-6 border-t border-gray-200 pt-4">
              <p className="text-gray-600 mb-4">
                Quick overview of the product. This is a placeholder text that
                you can replace with an actual product description.
              </p>

              <div className="flex gap-3 items-center">
                <button className="bg-mayormoto-blue text-white px-6 py-2 rounded hover:bg-mayormoto-blue-hover w-full transition-colors">
                  Add to Cart
                </button>
                <Link className="w-full" to={`/product/${product.productId}`}>
                  <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded w-full hover:bg-gray-300 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
