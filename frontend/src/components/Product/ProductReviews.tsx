import Rate from "../rating/Rate";

interface Review {
  reviews?: { user: string; comment: string; rating: number }[];
  rating: number;
  totalReviews: number;
}

const reviewNames = [
  { name: "Excellent", percentage: 0 },
  { name: "Good", percentage: 0 },
  { name: "Average", percentage: 0 },
  { name: "Below Average", percentage: 0 },
  { name: "Poor", percentage: 0 },
];

export default function ProductReviews({
  reviews,
  totalReviews,
  rating,
}: Review) {
  return (
    <div className="bg-white lg:col-span-4 grid lg:grid-cols-5 md:grid-cols-1 gap-4 shadow-1 p-6 rounded">
      <div className="flex flex-col col-span-2">
        <span className="text-lg font-medium text-gray-700 pb-4">
          Overall Rating
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="font-medium">{totalReviews}</span>
            <Rate readOnly value={rating} size="medium" />
          </div>
          <table>
            <thead>
              <th></th>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              {reviewNames &&
                reviewNames.length > 0 &&
                reviewNames.map((rv, i) => (
                  <tr key={i} className="text-gray-500 text-sm">
                    <td className="pr-3">{rv.name}</td>
                    <td className="min-w-[8rem] px-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${rv.percentage < 1 ? 0 : rv.percentage}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-3">{rv.percentage}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-3 col-span-3">
        {reviews?.length ? (
          reviews.map((review: any, i: number) => (
            <div key={i} className="text-gray-600 text-sm">
              {review.comment || "No comment"} – {review.rating}★
            </div>
          ))
        ) : (
          <div className="h-full text-sm text-gray-700 italic flex justify-center items-center">
            This product has no reviews yet.
          </div>
        )}
      </div>
    </div>
  );
}
