import React from "react";


// Array of different car images
const carImages = [
  "img/car1.jpg",
  "img/car2.jpg",
  "img/car3.jpg",
  "img/car4.jpg",
 
];

const Blog = () => {
  return (

  <>
        {/* Grid layout for 4 cards */}
        <h6 className="text-center text-blue-500">Blog and News</h6>
        <h1 className=" font-bold text-center ">Our blog content
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {carImages.map((image, index) => (
          <div key={index} className="card bg-base-100  shadow-sm ">
           <figure className="px-10 pt-10  ">
           <img 
    src={image} 
    alt={`Car ${index + 1}`}  
    className="rounded-xl" 
  />
</figure>
    
  <div className="card-body items-left text-left">
    <h6 className="text-blue-500">July 12, 2024</h6>
    <h2 className="card-title">How to get perfect <br/>cars at low prices</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ullam dolorem reprehenderit. Assumenda harum voluptate obcaecati placeat ipsam minima similique ipsa, ad eligendi, deleniti officiis, architecto eaque. A, harum quod!</p>
    <p className="hover:text-blue-500">Read more</p>
    
  </div>
</div>


       )) }
</div>

    

</>
  );
};

export default Blog;