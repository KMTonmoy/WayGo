'use client';
// import CustomSlider from "@/Components/CustomSlider/CustomSlider";
import React from 'react';
import CustomSlider from '../../Components/CustomSlider/CustomSlider';

const HotDeal: React.FC = () => {
  return (
    <div>
      <div className="flex px-14 mt-8 justify-between">
        <h4 className="text-lg font-semibold text-gray-800">Hot Deals</h4>
        <ul className="flex gap-4 px-3 py-2 bg-white rounded-full shadow-lg">
          {['All', 'Bus', 'Train', 'Flight'].map(category => (
            <li key={category}>
              <button className="hover:bg-gray-200 rounded-full px-3 py-1">
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-0 lg:mb-10">
        <CustomSlider />
      </div>
    </div>
  );
};

export default HotDeal;
