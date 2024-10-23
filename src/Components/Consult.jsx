"use client";
import React from "react";
import Swal from "sweetalert2";

function Consult() {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Send form data to Formspree
    const response = await fetch("https://formspree.io/f/xnnqqzpe", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us. We will get back to you shortly.",
        confirmButtonText: "OK",
      });
      form.reset(); // Reset the form after submission
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="relative py-1 h-[500px] my-20">
      <div className="my-10">
        <div className="lg:w-[70%] md:w-4/5 mx-auto grid grid-cols-2 gap-5 px-3 md:px-0">
          <div
            className="py-16"
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
            data-aos-delay="100"
          >
            <h1 className="font-franklin text-2xl md:text-4xl lg:text-5xl font-bold uppercase text-white">
              Request a Free
            </h1>
            <h1 className="font-franklin text-2xl md:text-4xl lg:text-5xl font-bold uppercase text-white">
              Consultation
            </h1>
            <p className="py-4 font-poppins md:text-lg text-sm font-semibold text-white opacity-90">
              Our experts and developers would love to contribute their
              expertise and insights and help you today.
            </p>
            <button className="px-3 font-poppins hover:bg-gradient-to-r hover:from-[#2ecc71] hover:to-[#27ae60] hover:ring-2 hover:ring-offset-2 hover:ring-[#27ae60] transition-all ease-out duration-300 font-semibold text-lg lg:text-xl text-white rounded z-30 cursor-pointer">
              Contact Us
            </button>
          </div>
          <div></div>
        </div>
      </div>

      <div className="absolute top-0 flex items-center justify-center w-full h-full">
        <div className="lg:w-[70%] md:w-4/5 mx-auto grid md:grid-cols-2 grid-cols-1 gap-5 px-3 md:px-0">
          <div className="hidden md:block">
            <img
              src="https://gotortalent.com/static/img/contact-us-min.gif" // Replace with your contact image URL
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:ml-4 w-full bg-white shadow-2xl px-3 md:px-4 py-6 rounded-lg">
            <h1 className="text-lg md:text-2xl font-semibold font-franklin opacity-80">
              Get in touch with us
            </h1>
            <p className="mt-3 font-poppins text-sm font-medium opacity-70 pb-2">
              Reach out to us today to get personalized assistance and expert
              guidance for all your industrial real estate needs.
            </p>
            <form onSubmit={handleFormSubmit} className="py-3 space-y-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered border rounded-md p-4 w-full focus:border-[#2ecc71] py-1"
                required
              />
              <input
                type="email"
                name="_replyto"
                placeholder="Your Email"
                className="input input-bordered border rounded-md p-4 w-full focus:border-[#2ecc71] py-1"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered border rounded-md p-4 w-full focus:border-[#2ecc71] py-1"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={3}
                className="border rounded-md p-4 w-full focus:border-[#2ecc71]"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#2ecc71] hover:bg-gradient-to-r hover:from-[#27ae60] hover:to-[#2ecc71] hover:ring-2 hover:ring-offset-2 hover:ring-[#27ae60] transition-all ease-out duration-300 font-semibold text-sm lg:text-xl text-white rounded py-2 my-2"
              >
                Send us Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consult;
