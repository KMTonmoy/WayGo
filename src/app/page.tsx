import React from "react";
import Banner from "../Components/Banner/Banner";
import WhyChooseUs from "../Components/WhyChooseUs";
import Testimonial from "../Components/Testimonial";
import CustomSlider from "../Components/CustomSlider/CustomSlider";
import AboutShuttle from "../Components/AboutShuttle/About";
import OurServices from "../Components/OurServices/OurServices";

const Page = () => {
  return (
    <div className="flex flex-col gap-10">
      <Banner />
      <AboutShuttle />
      <WhyChooseUs />
      <OurServices />
      <CustomSlider />
      <Testimonial />
    </div>
  );
};

export default Page;
