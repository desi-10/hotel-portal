import Image from "next/image";
import React from "react";
import Rating from "./Rating";
import { ReviewType } from "@/types/hostelTypes";

const SeeAllReviews = ({ review }: { review: ReviewType }) => {
  const averageRating =
    (review.price_rating +
      review.service_rating +
      review.quality_rating +
      review.location_rating) /
    4;
  return (
    <div
      key={review.id}
      className="flex justify-between items-center space-x-5"
    >
      <div className="w-28 rounded-full overflow-hidden">
        <Image
          src={review.user.profile_picture || ""}
          alt={review.user.first_name + " " + review.user.last_name}
          width={100}
          height={100}
        />
      </div>
      <div className="bg-gray-200 w-full p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="font-bold text-gray-500">{review.user.first_name}</p>
          <div className="flex items-center space-x-3">
            <Rating rating={averageRating} />
            <p className="p-3 rounded-lg text-white bg-primaryColor text-center">
              {averageRating.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="text-sm py-5 text-gray-500 border-b border-gray-300 w-full break-all">
          {review.review}
        </p>
        <div>
          <p className="text-sm py-3 text-gray-500">{review.created_at}</p>
        </div>
      </div>
    </div>
  );
};

export default SeeAllReviews;
