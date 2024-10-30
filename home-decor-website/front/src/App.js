import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';
import SubcategoryPage from './pages/products/SubcategoryPage';
import SearchResults from './pages/search/SearchResults';
import { CartProvider } from './CartContext';
import Cart from './pages/cart/Cart'

function App() {
    return (
        <CartProvider>
            <Router>
                <div>
                    <Header />  {/* Display Header on every page */}
                    <main style={{ minHeight: '80vh', padding: '20px' }}>  {/* Content area */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/products/:category/:subcategory" element={<SubcategoryPage />} />
                            <Route path="/cart" element={<Cart />} />
                            {/* Add more routes for other pages here */}
                        </Routes>
                    </main>
                    <Footer />  {/* Display Footer on every page */}
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
