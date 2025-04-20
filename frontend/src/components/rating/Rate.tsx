import { Rating, Typography } from "@mui/material";

interface ProductRatingProps {
  value?: number; // The current rating value (e.g., 1, 2, 3, etc.)
  onChange?: (event: React.ChangeEvent<{}>, newValue: number | null) => void; // Function to handle rating change
  readOnly?: boolean; // Optional prop to determine if the rating should be read-only
}

const ProductRating: React.FC<ProductRatingProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <div>
      <Rating
        size="small"
        name="product-rating"
        value={value}
        precision={5}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default ProductRating;
