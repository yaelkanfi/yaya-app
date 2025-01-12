import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import SubcategoryPage from './pages/Products/SubcategoryPage';
import SearchResults from './pages/Search/SearchResults';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart'

function App() {
    return (
        <CartProvider>
            <Router>
                <div>
                    <Header /> 
                    <main style={{ minHeight: '80vh', padding: '20px' }}>  {/* Content area */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/products/:category/:subcategory" element={<SubcategoryPage />} />
                            <Route path="/cart" element={<Cart />} />
                            {/* Add more routes for other pages here */}
                        </Routes>
                    </main>
                    <Footer /> 
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
