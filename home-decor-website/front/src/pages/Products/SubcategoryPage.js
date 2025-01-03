import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import productsStyles from './Products.module.css';
import subcategoryStyles from './SubcategoryPage.module.css';

/* furniture */
import sofasBanner from '../../assets/images/sofasBanner.jpg';
import chairsBanner from '../../assets/images/chairsBanner.jpg';
import tablesBanner from '../../assets/images/tablesBanner.jpg';
import shelvesBanner from '../../assets/images/shelvesBanner.jpg';

function SubcategoryPage() {

    /* Banner mapping */
    const bannerImages = {
        /* furniture */
        Sofas: sofasBanner,
        Chairs: chairsBanner,
        Tables: tablesBanner,
        Shelves: shelvesBanner,
    };

    /* banner and filters */
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const toggleSort = () => setSortOpen(!sortOpen);
    const toggleFilter = () => setFilterOpen(!filterOpen);

    const filterOptions = [
        'In Stock',
        'Color',
        'Materail',
        'Category',
        'Price',
    ];

    const handleFilterSelect = (option) => {
        if (selectedFilters.includes(option)) {
            setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
        } else {
            setSelectedFilters([...selectedFilters, option]);
        }
    };

    /* products */
    const { category, subcategory } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${category}/${subcategory}`)
            .then(response => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data); // Ensure data is an array
                } else {
                    setProducts([]); // Default to an empty array if data is invalid
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [category, subcategory]);

    // Get the banner image based on the subcategory
    const bannerImage = bannerImages[subcategory];

    return (

        <div className={subcategoryStyles['home-container']}>
            {/* Horizontal banner image */}
            <img src={bannerImage} alt="Home Banner" className={subcategoryStyles['home-banner']}/>

            <div className={subcategoryStyles.controls}>
                {/* Sort Dropdown */}
                <div className={subcategoryStyles['sort-container']}>
                    <button className={subcategoryStyles['sort-toggle']} onClick={toggleSort}>
                        Sort
                        <span className={`${subcategoryStyles.triangle} ${sortOpen ? 'down' : ''}`}></span>
                    </button>
                    {sortOpen && (
                        <div className={subcategoryStyles['sort-dropdown']}>
                            <span>Price: Low to High</span>
                            <span>Price: High to Low</span>
                            <span>Newest Arrivals</span>
                        </div>
                    )}
                </div>

                {/* Filter Bar */}
                <div className="filter-container">
                    <button className="filter-toggle" onClick={toggleFilter} >
                        <FaFilter className='filter-icon' />
                        Filter
                        <span className={`triangle ${filterOpen ? 'down' : ''}`}></span>
                    </button>
                    {filterOpen && (
                        <div className="filter-bar">
                            {filterOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`filter-option ${selectedFilters.includes(option) ? 'selected' : ''
                                        }`}
                                    onClick={() => handleFilterSelect(option)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className={productsStyles['product-list']}>
                    {products.map(product => (
                        <Link to={`/products/${product._id}`} key={product._id} className={productsStyles['product-card']}>
                            <img src={`http://localhost:5000${product.imagePath}`}
                                alt={product.name}
                                style={{ maxWidth: '100%', maxHeight: '200px' }} // Ensure image fits 
                            />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubcategoryPage;
