
import Image from 'next/image';


const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
                This Page is Under Development
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-10">
                We're working hard to bring you this feature. Stay tuned!
            </p>
            <Image
                src="https://www.brightlogix.com/services/frontend-development/front-end-development.gif"
                alt="Under Development"
                className="w-full lg:w-1/2 max-w-lg rounded-lg shadow-lg mb-6"
                width=auto
            />
            <a
                href="/"
                className="px-6 py-3 bg-[#f0652b] text-white rounded-full text-lg font-medium hover:bg-[#ff7e5f] transition-all duration-300"
            >
                Go Back to Home
            </a>
        </div>
    );
};

export default About;
