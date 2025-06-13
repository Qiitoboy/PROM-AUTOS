import React from "react";

// Array of different car images
const carImages = [
  "img/car1.jpg",
  "img/car2.jpg",
  "img/car3.jpg",
  "img/car4.jpg",
  "img/car5.jpg",
  "img/car6.jpg",
];

const Car = () => {
  return (
    <div className="p-8">
      {/* Title on top */}
      <h6 className="text-blue-500 text-center">All cars</h6>

      <h2 className=" font-bold text-center  mb-6">
        We Have All Types of Cars
      </h2>
      <p className="text-center">At Prom Autos we we pride ourselves on offering a diverse range of high-quality vehicles to suit every need and budget.
      Browse our extensive collection and discover the perfect car for you.</p>

      {/* Grid layout for 6 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {carImages.map((image, index) => (
          <div key={index} className="card bg-base-100 shadow-md ">
           <figure className="w-full h-64">
  <img 
    src={image} 
    alt={`Car ${index + 1}`}  
    className="w-full h-full object-cover rounded-t-lg" 
  />
</figure>
            <div className="card-body">
              <div className="card-actions mt-2 justify-end flex">
                <button className="btn bg-white text-black hover:bg-blue-600 hover:text-white ">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="mt-6 flex justify-center">
        <button className="btn bg-blue-500 text-white hover:bg-blue-300">Show More</button>
      </div>
    </div>
  );
};

export default Car;
