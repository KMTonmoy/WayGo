import React from 'react';
import WhyChooseUs from '../Components/WhyChooseUs';
import Testimonial from '../Components/Testimonial';
import CustomSlider from '../Components/CustomSlider/CustomSlider';
import AboutShuttle from '../Components/AboutShuttle/About';
import OurServices from '../Components/OurServices/OurServices';
import Banner from '../Components/Banner/banner';

const Page = () => {
  return (
    <div className='flex flex-col gap-10'>
      <Banner />
      <main>
        {/* About shuttle section */}
        <section>
        <AboutShuttle />
        </section>
        <WhyChooseUs />
        <OurServices />
        <CustomSlider />
        <Testimonial />
      </main>
    </div>
  );

};

export default Page; 