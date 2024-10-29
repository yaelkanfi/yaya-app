import React from 'react';

function Footer() {
    return (
        <footer style={footerStyle}>
            <p>&copy; 2024 Home Decor. All rights reserved.</p>
        </footer>
    );
}

const footerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%'
};

export default Footer;