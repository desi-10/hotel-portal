import React from "react";

type SectionHeaderType = {
  mainText: string;
  subText: string;
};

const SectionHeader = ({ mainText, subText }: SectionHeaderType) => {
  return (
    <main className="text-center p-5">
      <div className="relative">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-500 absolute inset-0 flex items-center justify-center opacity-10 uppercase">
          <div className="relative">
            <h2 className="">{subText}</h2>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
        </div>
        <h3 className="relative text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 capitalize">
          {mainText}
        </h3>
      </div>
      <div className="relative mt-2 mb-4">
        <div className="w-12 h-1 bg-primaryColor mx-auto"></div>
      </div>
    </main>
  );
};

export default SectionHeader;
