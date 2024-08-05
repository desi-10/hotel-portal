import React from "react";
import SectionHeader from "./Headers";
import LatestListing from "./LatestListing";

function Listings() {
  return (
    <main className="py-10 px-3">
      <SectionHeader
        mainText="The Latest Listings"
        subText="newest listings"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />

      <div className="flex space-x-8 mt-10">
        {Array.from({ length: 2 }).map((_, i) => {
          return (
            <div key={i}>
              <LatestListing />
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Listings;
