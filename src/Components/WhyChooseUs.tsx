import { FaArrowRight } from "react-icons/fa6";
import { RiBusLine } from "react-icons/ri";
import { PiHandshake } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { FaPeopleGroup } from "react-icons/fa6";
import Image from 'next/image'

function WhyChooseUs() {
  return (
    <div className="w-full ">
      <div className='grid grid-cols-1 lg:grid-cols-2'>

        {/* Image Section */}
        <div className="relative h-72 md:h-96 lg:h-auto">
          <div className="absolute inset-0">
            <Image
              alt="bus photo"
              src="/HomePage/chooseBus.jpg"
              layout="fill"
              objectFit="cover"
              className="relative"
            />
          </div>
          <div className='bg-[var(--clr-focussed)] text-white absolute md:bottom-8 left-5 lg:w-[66%] md:w-[76%] rounded-xl lg:p-12 md:p-8 hidden md:block'>
            <h2 className='lg:text-3xl md:text-2xl mb-4'>We Provide Best Bus For You</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet consequatur labore perspiciatis delectus, consectetur enim.</p>
            <button className='font-bold mt-4 text-sm flex justify-center items-center gap-3'>
              View Projects <span><FaArrowRight /></span>
            </button>
          </div>
        </div>

        {/* Description Part */}
        <div className='bg-black text-white lg:p-24 md:p-14 p-10 space-y-4'>
          <div>
            <h3 className='text-[var(--clr-focussed)] text-lg'>Why Choose Us</h3>
          </div>
          <div>
            <h2>We Are Experts In Bus Charter Service Company Since 1999</h2>
          </div>
          <p className='lg:w-4/5 md:w-fit'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, nulla sed laudantium libero iure nihil ea vel saepe consequatur ex atque voluptatibus, fugit facere rerum sit!
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 pt-6'>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <RiBusLine className="text-[var(--clr-focussed)] text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">25 <span className="text-[var(--clr-focussed)] text-lg">+</span></h4>
                <h5 className="text-base font-normal text-[var(--clr-light-gray)]">Buses Ready</h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <PiHandshake className="text-[var(--clr-focussed)] text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">2,640 <span className="text-[var(--clr-focussed)] text-lg">+</span></h4>
                <h5 className="text-base font-normal text-[var(--clr-light-gray)]">Satisfied Customer</h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <SiTicktick className="text-[var(--clr-focussed)] text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">2,836 <span className="text-[var(--clr-focussed)] text-lg">+</span></h4>
                <h5 className="text-base font-normal text-[var(--clr-light-gray)]">Booking Done</h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <FaPeopleGroup className="text-[var(--clr-focussed)] text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">75 <span className="text-[var(--clr-focussed)] text-lg">+</span></h4>
                <h5 className="text-base font-normal text-[var(--clr-light-gray)]">Professional Team</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default WhyChooseUs