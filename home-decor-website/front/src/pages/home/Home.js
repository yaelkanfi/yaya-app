import React from 'react';
import './Home.css';
import bannerImage from '../../assets/images/banner.jpeg';

function Home() {
    return (
        <div className="home-container">
            {/* Horizontal banner image */}
            <img 
                src={bannerImage} 
                alt="Home Banner" 
                className="home-banner"
            />
            
            {/* Add more content or components related to the home page here */}
        </div>
    );
}

export default Home;
