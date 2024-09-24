import React from 'react';

const BlogPage: React.FC = () => {
    const blogs = [
        {
            title: 'Top Bus Routes for Urban Exploration',
            description:
                'Explore the most scenic and efficient bus routes that offer the best views and accessibility within urban areas. This guide will help you navigate the city like a local.',
            image: 'https://media.licdn.com/dms/image/D4E12AQERulTeAFmJxA/article-cover_image-shrink_720_1280/0/1702807898744?e=2147483647&v=beta&t=_5XhJH_vQdst4-b7cSBQ2QdX46dOCYQr39VcXmYECXw',
            author: 'Alice Brown',
            date: 'September 18, 2024',
        },
        {
            title: 'The Rise of Eco-Friendly Airplanes',
            description:
                'Learn about the latest advancements in eco-friendly aviation technology. Discover how airlines are reducing their carbon footprint and what it means for the future of air travel.',
            image: 'https://media.licdn.com/dms/image/D4E12AQERulTeAFmJxA/article-cover_image-shrink_720_1280/0/1702807898744?e=2147483647&v=beta&t=_5XhJH_vQdst4-b7cSBQ2QdX46dOCYQr39VcXmYECXw',
            author: 'James Lee',
            date: 'September 21, 2024',
        },
        {
            title: 'Must-Know Tips for Comfortable Train Journeys',
            description:
                'Train travel can be both relaxing and enjoyable if you know the right tips and tricks. This blog provides essential advice for making your train trips more comfortable and stress-free.',
            image: 'https://sb.ecobnb.net/app/uploads/sites/3/2022/09/fun-and-confortable-train-ride-1170x490.jpg',
            author: 'Emily Davis',
            date: 'September 25, 2024',
        },
        { 
            title: 'How to Find the Best Bus Deals and Discounts',
            description:
                'Discover how to find the best deals and discounts for bus travel. This guide covers tips for booking, finding promotions, and maximizing your savings on bus tickets.',
            image: 'https://static1.bdtickets.com/aaum/promotional/18a33a84-cac2-45f7-9f4d-84c525fd1601',
            author: 'Michael Smith',
            date: 'September 27, 2024',
        },
        {
            title: 'Innovations in Airplane Entertainment Systems',
            description:
                'Explore the latest innovations in in-flight entertainment systems. Learn about new technologies that are enhancing passenger experience during air travel.',
            image: 'https://www.einfochips.com/wp-content/uploads/2018/09/top-emerging-trends-of-the-global-in-flight-entertainment-market-featured.jpg',
            author: 'Sophia Johnson',
            date: 'September 29, 2024',
        },
        {
            title: 'Train Travel Hacks for the Modern Commuter',
            description:
                'Maximize your train travel experience with these handy hacks. From finding the best seats to avoiding delays, this blog provides practical advice for daily commuters.',
            image: 'https://media.timeout.com/images/103600274/image.jpg',
            author: 'Liam Brown',
            date: 'October 2, 2024',
        },
        {
            title: 'Bus Travel Safety Tips You Need to Know',
            description:
                'Ensure a safe and pleasant journey with these essential bus travel safety tips. Learn about safety protocols, what to watch out for, and how to keep your belongings secure.',
            image: 'data:image/jpeg;base64,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',
            author: 'Olivia Taylor',
            date: 'October 5, 2024',
        },
    ];








    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">


            {/* Recent Blog Posts */}
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">Recent Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(1).map((blog, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg overflow-hidden"
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#25527E] mb-2">{blog.title}</h3>
                                <p className="text-gray-700 mb-4">{blog.description}</p>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <span>By {blog.author}</span>
                                    <span className="mx-2">|</span>
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
