const Testimonial = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-end md:justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              What Our Customers Are Saying
            </h2>
            <p className="mt-6 max-w-lg text-lg text-gray-700">
              See why thousands of customers love our services. We pride ourselves on providing
              excellent service and value. Read our top reviews!
            </p>
          </div>

          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[--clr-primary] px-6 py-3 text-[--clr-primary] text-lg font-semibold transition-transform duration-200 hover:scale-105 hover:bg-[--clr-primary] hover:text-white md:mt-0"
          >
            <span>Read All Reviews</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Review Card */}
          <blockquote className="relative flex h-full flex-col justify-between bg-white p-8 rounded-xl shadow-lg transition-transform hover:scale-105">
            <div>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-2xl font-bold text-[--clr-primary] sm:text-3xl">
                  Outstanding Service!
                </p>
                <p className="mt-4 leading-relaxed text-gray-600">
                  I had an amazing experience with this company. Their customer support is top-notch and I highly recommend them to anyone looking for reliable services.
                </p>
              </div>
            </div>
            <footer className="mt-4 text-sm font-medium text-gray-600 sm:mt-6">
              &mdash; John Doe
            </footer>
          </blockquote>

          {/* Review Card */}
          <blockquote className="relative flex h-full flex-col justify-between bg-white p-8 rounded-xl shadow-lg transition-transform hover:scale-105">
            <div>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-2xl font-bold text-[--clr-primary] sm:text-3xl">
                  Superb Quality!
                </p>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Their attention to detail and professionalism is unmatched. They ensured all my needs were met, and I could not be happier with the outcome.
                </p>
              </div>
            </div>
            <footer className="mt-4 text-sm font-medium text-gray-600 sm:mt-6">
              &mdash; Jane Smith
            </footer>
          </blockquote>

          {/* Review Card */}
          <blockquote className="relative flex h-full flex-col justify-between bg-white p-8 rounded-xl shadow-lg transition-transform hover:scale-105">
            <div>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <div className="mt-4">
                <p className="text-2xl font-bold text-[--clr-primary] sm:text-3xl">
                  Highly Recommend!
                </p>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Great customer service and fast delivery. I had some issues initially, but they were quick to resolve them. Fantastic experience!
                </p>
              </div>
            </div>
            <footer className="mt-4 text-sm font-medium text-gray-600 sm:mt-6">
              &mdash; Michael Johnson
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
