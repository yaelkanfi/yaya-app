import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  
import Footer from './components/Footer'; 
import Home from './pages/home/Home';

function App() {
    return (
        <Router>
            <div>
                <Header />  {/* Display Header on every page */}
                <main style={{ minHeight: '80vh', padding: '20px' }}>  {/* Content area */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* Add more routes for other pages here */}
                    </Routes>
                </main>
                <Footer />  {/* Display Footer on every page */}
            </div>
        </Router>
    );
}

export default App;
