export default function ProductReviews({ reviews }: {
    reviews: any[] | undefined;
}) {
  return (
    <div className="bg-white md:col-span-1 lg:col-span-2 shadow-1 p-6 rounded">
      <span className="text-md font-medium text-gray-700">Reviews</span>
      <div className="flex flex-col gap-3">
        {reviews?.length ? (
          reviews.map((review: any, i: number) => (
            <div key={i} className="text-gray-600 text-sm">
              {review.comment || "No comment"} – {review.rating}★
            </div>
          ))
        ) : (
          <h3 className="text-2xl font-bold text-gray-700">
            This product has no reviews yet.
          </h3>
        )}
      </div>
    </div>
  );
}
