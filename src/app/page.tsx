import WhyChooseUs from '@/Components/WhyChooseUs';
import Banner from '@/Components/Banner/banner';
import React from 'react';


const page = () => {
  return (
    <>

        <header>
          {/* banner section */}
        <div className='bg-blue-100 '>
        <Banner />
        </div>
        </header>
      
      <main>

        {/* Hot Deal Section */}



        <section className='py-10 md:py-12 lg:py-16 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 2xl:px-14 mt-16 md:mt-20 lg:mt-28 border-2 border-green-400'>
          <h2>Heading 2</h2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem quae voluptatibus nobis, repellendus, sunt quaerat error, est inventore provident facilis ullam veritatis cumque! Nisi doloribus quia tenetur repellendus dignissimos vero ipsam. Totam alias aliquam eius doloribus, magni eaque magnam accusamus.
        </section>

        {/* Best Service Section */}
        <section className='py-10 md:py-12 lg:py-16 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 2xl:px-14 mt-16 md:mt-20 lg:mt-28 border-2 border-red-400'>
          <h3>Heading 3</h3>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam corrupti fugiat, voluptate inventore veritatis numquam magnam asperiores nostrum animi alias nihil eveniet ab deleniti, obcaecati dignissimos dolorem amet veniam est optio. Cupiditate, commodi blanditiis! Voluptates atque ea rerum aliquam eius delectus perspiciatis aut obcaecati nobis, quod cupiditate, iusto, quisquam modi!
        </section>

        {/* Steps to buy Ticket */}
        <section className='py-10 md:py-12 lg:py-16 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 2xl:px-14 mt-16 md:mt-20 lg:mt-28 border-2 border-blue-400'>
          <h4>Heading 4</h4>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius illo veniam iure odio? Veritatis magni provident consectetur at, ducimus accusantium, ipsa dolore, consequuntur error nam natus. Adipisci assumenda in repellendus praesentium facilis doloremque natus, itaque reprehenderit delectus eveniet deserunt laboriosam quae aliquam! Possimus laudantium optio officia assumenda! Laborum earum sint fugiat quibusdam quo eaque, a placeat est rerum! Accusantium, quam.
        </section>

        {/* Why Choose us section */}
        <WhyChooseUs/>

        {/* Testimonial Section*/}
        <section>

        </section>


      </main>

      </>
  )
}

export default page;
