import { Rating } from "@mui/material";

interface ProductRatingProps {
  value?: number; // The current rating value (e.g., 1, 2, 3, etc.)
  onChange?: (event: React.SyntheticEvent, newValue: number) => void; // Function to handle rating change
  readOnly?: boolean; // Optional prop to determine if the rating should be read-only
  size?: "small" | "medium" | "large";
  onChangeActive?: (event: React.SyntheticEvent, newHover: number) => void;
}

const ProductRating: React.FC<ProductRatingProps> = ({
  value = 0,
  onChange,
  readOnly = false,
  size = "small",
  onChangeActive,
}) => {


  return (
    <div className="flex flex-col items-center gap-1">
      <Rating
        size={size}
        name="product-rating"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        precision={0.5}
        onChangeActive={onChangeActive}
      />
    </div>
  );
};

export default ProductRating;
