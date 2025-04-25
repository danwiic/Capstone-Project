export default function ProductReviews({ reviews }: {
    reviews: any[] | undefined;
}) {
  return (
    <div className="bg-white md:col-span-1 lg:col-span-2 shadow-1 p-6 rounded">
      <span className="text-md font-medium text-gray-700 pb-4">Reviews</span>
      <div className="flex flex-col gap-3">
        {reviews?.length ? (
          reviews.map((review: any, i: number) => (
            <div key={i} className="text-gray-600 text-sm">
              {review.comment || "No comment"} – {review.rating}★
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-700 italic">
            This product has no reviews yet.
          </p>
        )}
      </div>
    </div>
  );
}
