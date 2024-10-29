import React from 'react';
import CustomSlider from '../../Components/CustomSlider/CustomSlider';

const Page = () => {
  return (
    <div className="  py-10">
      <div className=" mx-auto px-4">
        {/* Header section with Hot Deals title */}
        <div className="flex justify-center items-center px-8 lg:px-14 mt-8 mb-6">
          <h2 className="text-4xl text-[#F43F5E] underline font-bold text-center">
            Hot Deals
          </h2>
        </div>

        {/* Slider section */}
        <div className="mb-8 lg:mb-12 bg-white shadow-lg rounded-lg p-6">
          <CustomSlider />
        </div>
      </div>
    </div>
  );
};

export default Page;
