import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ICS from "../assets/ics.jpg";
import MEGAHALL from "../assets/megahall.jpg";
import LECTUREHALL from "../assets/lecturehall.jpg";

const Carousel = () => {
  const images = [ICS, MEGAHALL, LECTUREHALL];

  const buttonStyle = {
    width: "80px",
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    border: 'none',
    height: '100%',
  };

  const properties = {
    prevArrow: <button style={buttonStyle}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-left"><circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/></svg></button>,
    nextArrow: <button style={buttonStyle}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-right"><circle cx="12" cy="12" r="10"/><path d="m10 8 4 4-4 4"/></svg></button>
  };

  const containerStyle = {
    position: 'relative',
    height: '500px',
    overflow: 'hidden',
    borderRadius: '15px',
    marginTop: '25px',
  };

  const gradientOverlayStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5), rgba(59, 130, 246, 0), rgba(59, 130, 246, 3))',
    zIndex: 1,
    borderRadius: '15px',
  };

  const textStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    zIndex: 2,
    padding: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Text shadow for better visibility
  };

  return (
    <div style={containerStyle}>
      <Fade {...properties}>
        {images.map((image, index) => (
          <div key={index} className="each-fade" style={{ position: 'relative', height: '500px', borderRadius: '15px' }}>
            <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }} />
            <div style={gradientOverlayStyle}></div>
            <span style={textStyle}>
              {index === 0 && 'Institute of Computer Science'}
              {index === 1 && 'ICS Megahall'}
              {index === 2 && 'ICS Lecture Hall'}
            </span>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Carousel;
