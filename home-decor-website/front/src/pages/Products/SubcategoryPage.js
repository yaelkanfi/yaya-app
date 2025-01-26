import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import { FiSliders } from 'react-icons/fi';
import productsStyles from './Products.module.css';
import subcategoryStyles from './SubcategoryPage.module.css';

/* furniture */
import sofasBanner from '../../assets/images/sofasBanner.jpg';
import chairsBanner from '../../assets/images/chairsBanner.jpg';
import tablesBanner from '../../assets/images/tablesBanner.jpg';
import shelvesBanner from '../../assets/images/shelvesBanner.jpg';

function SubcategoryPage() {

    const bannerImages = {
        /* furniture */
        Sofas: sofasBanner,
        Chairs: chairsBanner,
        Tables: tablesBanner,
        Shelves: shelvesBanner,
    };

    const { category, subcategory } = useParams();
    const [products, setProducts] = useState([]);

    const bannerImage = bannerImages[subcategory];

    const [sortOpen, setSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const toggleSort = () => setSortOpen(!sortOpen);
    const toggleFilter = () => setFilterOpen(!filterOpen);

    const sortOptions = {
        'Price: Low to High': (a, b) => a.price - b.price,
        'Price: High to Low': (a, b) => b.price - a.price,
        'Newest Arrivals': (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    };

    const applySort = (option) => {
        if (sortOptions[option]) {
            const sortedProducts = [...products].sort(sortOptions[option]);
            setProducts(sortedProducts);
        }
    };

    const handleSort = (option) => {
        setSortOption(option); 
        applySort(option);     
        setSortOpen(false);    
    };

    const filterOptions = [
        'Availability',
        'Product Type',
        'Price',
    ];

    const handleFilterSelect = (option) => {
        if (selectedFilters.includes(option)) {
            setSelectedFilters(selectedFilters.filter((filter) => filter !== option));
        } else {
            setSelectedFilters([...selectedFilters, option]);
        }
    };

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

    return (

        <div className={subcategoryStyles['container']}>
            <img src={bannerImage} alt="Subcategory Banner" className={subcategoryStyles['banner']} />

            <div className={subcategoryStyles['controls']}>

                <div className={subcategoryStyles['dropdown-container']}>
                    <button className={subcategoryStyles['dropdown-button']} onClick={toggleSort}>
                        <FiSliders className={subcategoryStyles['sort-icon']} />
                        {sortOption || 'Sort'}
                        <span className={`${subcategoryStyles.triangle} ${sortOpen ? subcategoryStyles.down : ''}`}></span>
                    </button>
                    {sortOpen && (
                        <div className={subcategoryStyles['sort-dropdown']}>
                            {Object.keys(sortOptions).map((option) => (
                                <span key={option} onClick={() => handleSort(option)}>
                                    {option}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className={subcategoryStyles['dropdown-container']}>
                    <button className={subcategoryStyles['dropdown-button']} onClick={toggleFilter} >
                        <FaFilter className={subcategoryStyles['filter-icon']} />
                        Filter
                        <span className={`${subcategoryStyles.triangle} ${filterOpen ? subcategoryStyles.down : ''}`}></span>
                    </button>
                    {filterOpen && (
                        <div className={subcategoryStyles['filter-bar']}>
                            {filterOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`${subcategoryStyles['filter-option']} ${selectedFilters.includes(option) ? subcategoryStyles.selected : ''
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
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
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