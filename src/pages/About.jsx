import React from "react";

const About = () => {
  return (
    <div className="card card-side bg-base-100 shadow-sm  h-75 ">
    <figure>
      <img
        src="/img/about.png"
        alt="Movie"  className="h-full w-full object-cover"/>
    </figure>
    <div className="card-body ">
      <h6 className="text-blue-500">About Us</h6>
      <h2 className="card-title text-left">Cheap prices with
      Quality Cars</h2>
      <div className="text-left">
        <p>For over 10 years, we have been committed to providing our customers with the <br/> highest
       quality vehicles and exceptional customer service. Our dealership is built <br/> on a 
       foundation of trust, integrity, and a passion for automobiles. We believe in creating <br/>
       lasting relationships with our customers by delivering an unparalleled car-buying experience.</p>

       </div>
      <div className="card-actions justify-end flex justify-start">
        <button className="btn bg-blue-500 text-white hover:bg-blue-300">Learn more</button>
      </div>
    </div>
  </div>
  );
};

export default About;