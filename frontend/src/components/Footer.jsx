import React from 'react';
import { assets } from '../assets/assets'; // Ensure assets is correctly exported from this path

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Prescripto Logo" /> {/* Added descriptive alt text */}
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            "But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness."
          </p>
        </div>

        {/* Center Section */}
        <div>
          <h2 className="font-medium text-xl mb-5">COMPANY</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="font-medium text-xl mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
                <a href='tel:+919657237833' className='hover:underline'>
                +91 9657237833
                </a>
            </li>
            <li>
                <a href='mailto:veddeshpandepict@gmail.com' className='hover:underline'>
                veddeshpandepict@gmail.com
                </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="py-5 text-sm text-center">
        <hr />
        <p className="text-center mt-4">Copyright 2025 @ Prescripto - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
