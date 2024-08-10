/**
 * This component converts a rating value within the range of 0 to 5 into a visual star rating, displaying the corresponding number of full and empty stars.
 * For typescript remember to set type [number] for the rating prop
 * const Rating = ({ rating } : { rating : number }) => {}
 */
const Rating = ({ rating }: { rating: number }) => {
  const maxRating = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = maxRating - fullStars;
  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={fullStars + i}>&#9734;</span>);
    }
    return stars;
  };
  return (
    <div>
      {renderStars().map((star, index) => (
        <span key={index} className="text-lg text-yellow-500">
          {star}
        </span>
      ))}
    </div>
  );
};
export default Rating;
