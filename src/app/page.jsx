import React from "react";
import WhyChooseUs from "../Components/WhyChooseUs";
import Testimonial from "../Components/Testimonial";
import Consult from "../Components/Consult";
import OurServices from "../Components/OurServices/OurServices";
import Banner from "../Components/Banner/Banner";
import WhyChooseWayGo from "../Components/WhyChooseWayGo/WhyChooseWayGo";
import HotDeal from "./HotDeal/page";

const Page = () => {
  return (
    <div>
      <Banner />
      <main className="flex  flex-col gap-10">
        {/* About shuttle section */}
        <WhyChooseWayGo></WhyChooseWayGo>
        <section>
          <HotDeal />
          {/* <AboutShuttle /> */}
        </section>
        {/* <WhyChooseUs /> */}
        <OurServices />
        <Testimonial />
        <Consult />
      </main>
    </div>
  );
};

export default Page;
