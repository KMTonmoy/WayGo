const WhyChooseWayGo = () => {
  return (
    <section className="py-10">
      <div className="md:px-20 mx-auto ">
        <h2 className="text-3xl text-[#F04935] underline font-bold text-center  mb-6">
          Why Choose WayGo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 flex flex-col items-start">
            <div className="flex items-start mb-4">
              <img
                src="https://ticket.jatri.co/_nuxt/img/two-tickets.f1a2b8a.png"
                alt=""
                className="w-12 h-12 "
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Ease on the Move</h3>
              <p className="text-gray-500">
                Tickets are available on the go through our platform, no more
                queues!
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 flex flex-col items-start">
            <div className="flex items-start mb-4">
              <img
                src="https://ticket.jatri.co/_nuxt/img/red-bus.1cd112a.png"
                alt=""
                className="w-12 h-12 "
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Promise of Convenient Travel
              </h3>
              <p className="text-gray-500">
                We have an excellent system of taking service based on
                preference, as there is ticketing service for multiple routes
                via different categories of buses.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 flex flex-col items-start">
            <div className="flex items-start mb-4">
              <img
                src="https://ticket.jatri.co/_nuxt/img/security-badge.1e99909.png"
                alt=""
                className="w-12 h-12 "
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Reliability Assured
              </h3>
              <p className="text-gray-500">
                Whether you are travelling for work or leisure, book your
                tickets through us and keep all your worries away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseWayGo;
