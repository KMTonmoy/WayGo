"use client";

import React, { useEffect, useState } from 'react';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Fetch testimonials from JSON file
  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await fetch('/testimonial.json');
      const data = await response.json();
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  // Render nothing if testimonials are loading
  if (testimonials.length === 0) return null;

  // Get the last three testimonials
  const lastThreeTestimonials = testimonials.slice(-3);

  return (
    <section className="bg-gradient-to-r py-16">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-end md:justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              What Our Customers Are Saying
            </h2>
            <p className="mt-6 max-w-lg text-lg text-gray-700">
              See why thousands of customers love our services. We pride ourselves on providing excellent service and value. Read our top reviews!
            </p>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lastThreeTestimonials.map((testimonial) => (
            <blockquote
              key={testimonial.id} // Assuming each testimonial has a unique id
              className="relative flex flex-col justify-between bg-white p-8 rounded-xl shadow-lg transition-transform hover:shadow-2xl hover:scale-105"
            >
              <div>
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i} // Updated key prop here
                      className="h-6 w-6"
                      fill="#ec5024"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-2xl font-bold text-[--clr-primary] sm:text-3xl mb-2">
                  {testimonial.title}
                </p>
                <p className="leading-relaxed text-gray-600">
                  {testimonial.review}
                </p>
              </div>
              <footer className="mt-4 text-sm font-medium text-gray-600 sm:mt-6">
                &mdash; {testimonial.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
