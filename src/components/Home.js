import React from 'react';
import Navbar from './Navbar';
import './home.css';
const Home = () => {
  return (
    <div className="home-container" >
      <div className="homes-overlay">
        <h1 className="titles">Health Insurance</h1>
        <h3 className="subtitles">Secure Insurance Management</h3>
        <p className="descriptions">
          An advanced health insurance claim system using blockchain ensures secure, transparent, and efficient processing. It stores immutable patient records, automates claim verification via smart contracts, prevents fraud, and speeds up settlements. Interoperability with healthcare systems fosters seamless data sharing, enhancing trust, security, and satisfaction for patients and insurers.
        </p>
        <p className="descriptions">
          Our platform supports a streamlined claim process, reducing paperwork and manual errors. Policyholders can easily track their claim status in real time, ensuring transparency and minimizing confusion. By leveraging advanced analytics, insurers can identify trends and enhance decision-making, leading to better policy management and customer satisfaction.
        </p>
        <p className="descriptions">
          Whether you are an individual or a corporate policyholder, our system offers customized solutions tailored to your specific insurance needs. Join us in revolutionizing the health insurance industry with technology-driven efficiency and trust.
        </p>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
