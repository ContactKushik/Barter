import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <h5 className="font-bold text-lg">About Us</h5>
          <p className="text-sm">Learn more about our mission and values.</p>
        </div>
        <div className="flex flex-col">
          <h5 className="font-bold text-lg">Help</h5>
          <p className="text-sm">Customer support, FAQs, and more.</p>
        </div>
        <div className="flex flex-col">
          <h5 className="font-bold text-lg">Follow Us</h5>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:underline">Facebook</a>
            <a href="#" className="text-sm hover:underline">Twitter</a>
            <a href="#" className="text-sm hover:underline">Instagram</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">© 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );

}

export default Footer