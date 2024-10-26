'use client';
import { RiBusLine } from 'react-icons/ri';
import { PiHandshake } from 'react-icons/pi';
import { SiTicktick } from 'react-icons/si';
import { FaPeopleGroup } from 'react-icons/fa6';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function WhyChooseUs() {
  const [displayCount, setDisplayCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);
  const count = '25';

  useEffect(() => {
    const currentElement = elementRef.current;
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted && count > 0) {
      let start = 0;
      const duration = 1000;
      const increment = count / (duration / 10);
      const timer = setInterval(() => {
        start += increment;
        if (start >= count) {
          setDisplayCount(count);
          clearInterval(timer);
        } else {
          setDisplayCount(Math.ceil(start));
        }
      }, 10);
      return () => clearInterval(timer);
    }
  }, [count, hasStarted]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-72 md:h-96 lg:h-auto">
          <div className="absolute inset-0">
            <Image
              alt="bus photo"
              src="/HomePage/chooseBus.jpg"
              fill
              style={{ objectFit: 'cover' }}
              className="relative"
            />
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white absolute md:bottom-8 left-5 lg:w-[66%] md:w-[76%] rounded-xl lg:p-12 md:p-8 hidden md:block">
            <h2 className="lg:text-3xl md:text-2xl mb-4">
              We Provide Best Bus For You
            </h2>
            <p>
              Our every buses are comfortable, well designed and maintain the
              road safety. You feel a luxuries journey to your destination
            </p>
          </div>
        </div>

        {/* Description Part */}
        <div className="bg-black text-white lg:p-24 md:p-14 p-10 space-y-4">
          <div>
            <h3 className="text-green-500 text-lg">Why Choose Us</h3>
          </div>
          <div>
            <h2>Providing Reliable Bus Charter Services Since 1999</h2>
          </div>
          <p className="lg:w-4/5 md:w-fit">
            Way-Go has over two decades of experience in safe, comfortable, and
            reliable bus transportation. Our dedication to service, modern
            fleet, and customer focus make us a top choice for travelers
            everywhere.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 pt-6">
            <div className="flex gap-3 lg:gap-6 pb-4">
              <RiBusLine className="text-green-500 text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">
                  {displayCount}{' '}
                  <span className="text-green-500 text-2xl font-bold">+</span>
                </h4>
                <h5 className="text-base font-normal text-gray-400">
                  Buses Ready
                </h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <PiHandshake className="text-green-500 text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">
                  2,640{' '}
                  <span className="text-green-500 text-2xl font-bold">+</span>
                </h4>
                <h5 className="text-base font-normal text-gray-400">
                  Satisfied Customer
                </h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <SiTicktick className="text-green-500 text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">
                  2,836{' '}
                  <span className="text-green-500 text-2xl font-bold">+</span>
                </h4>
                <h5 className="text-base font-normal text-gray-400">
                  Booking Done
                </h5>
              </div>
            </div>
            <div className="flex gap-3 lg:gap-6 pb-4">
              <FaPeopleGroup className="text-green-500 text-3xl lg:text-5xl" />
              <div className="">
                <h4 className="text-4xl pb-3">
                  75{' '}
                  <span className="text-green-500 text-2xl font-bold">+</span>
                </h4>
                <h5 className="text-base font-normal text-gray-400">
                  Professional Team
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
