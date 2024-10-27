import React from "react";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";

const Page = () => {
  return (
    <div>
      <div>
        <div className="flex px-14 mt-8 justify-between items-center">
          <h4 className="text-3xl font-bold bg-gradient-to-r from-[#F05342] via-[#F04935] to-[#D94C39] bg-clip-text text-transparent shadow-lg relative">
            Hot Deals
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F05342] to-[#F04935] transform scale-x-100 transition-transform duration-500 ease-out"></span>
          </h4>
        </div>
        <div className="mb-0 lg:mb-10">
          <CustomSlider />
        </div>
      </div>
    </div>
  );
};

export default Page;
