import React from 'react';
import WhyChooseUs from '../Components/WhyChooseUs';
import Testimonial from '../Components/Testimonial';
import CustomSlider from '../Components/CustomSlider/CustomSlider';
 
import OurServices from '../Components/OurServices/OurServices';
import Banner from '../Components/Banner/banner';
<<<<<<< HEAD
import AboutShuttle from '../Components/AboutShuttle/About';
=======
>>>>>>> 91e1f64617355557f063f3f4fdf6b47fd352a94a

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