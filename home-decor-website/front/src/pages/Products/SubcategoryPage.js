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
    const [baseProducts, setBaseProducts] = useState([]);

    const bannerImage = bannerImages[subcategory];

    /* Sort */

    const [sortOpen, setSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState('');

    const toggleSort = () => setSortOpen(!sortOpen);

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

    /* Filter */

    const [filterOpen, setFilterOpen] = useState(false);
    const [filterOptionsOpen, setFilterOptionsOpen] = useState(false);
    const [selectedFilterCategory, setSelectedFilterCategory] = useState(null);
    const [filterOption, setFilterOption] = useState('');

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
        setFilterOptionsOpen(false);
        setSelectedFilterCategory(null);
    };

    const filterCategories = {
        Availability: ["In Stock", "Out of Stock"],
        Price: ["Under $100", "$100-$500", "Above $500"],
    };

    const filterOptions = {
        Availability: (product, value) => {
            return value === "In Stock" ? product.stock > 0 : product.stock === 0;
        },
        Price: (product, value) => {
            return product.price >= minPrice && product.price <= maxPrice;
        },
    };

    const handleFilterCategorySelect = (category) => {
        setSelectedFilterCategory(category);
        setFilterOptionsOpen(true);
    };

    const applyFilter = (option) => {
        setFilterOption({ category: selectedFilterCategory, value: option });

        const filterFunc = filterOptions[selectedFilterCategory];
        if (filterFunc) {
            const filteredProducts = baseProducts.filter((product) => filterFunc(product, option));
            setProducts(filteredProducts);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${category}/${subcategory}`)
            .then(response => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBaseProducts(data);
                    setProducts(data); // Ensure data is an array
                } else {
                    setBaseProducts([]);
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
                        <div className={subcategoryStyles["filter-bar"]}>
                            {!selectedFilterCategory ? (
                                Object.keys(filterCategories).map((category) => (
                                    <div
                                        key={category}
                                        className={subcategoryStyles["filter-option"]}
                                        onClick={() => handleFilterCategorySelect(category)}
                                    >
                                        {category}
                                    </div>
                                ))
                            ) : (
                                selectedFilterCategory === "Price" ? (
                                    <div className={subcategoryStyles["price-filter"]}>
                                        <label>
                                            Min Price:
                                            <input
                                                type="range"
                                                min="0"
                                                max="1000"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                className={subcategoryStyles['range-slider']}
                                            />
                                            <span className={subcategoryStyles['range-tooltip']}>${minPrice}</span>
                                        </label>

                                        <label>
                                            Max Price:
                                            <input
                                                type="range"
                                                min="0"
                                                max="1000"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                className={subcategoryStyles['range-slider']}
                                            />
                                            <span className={subcategoryStyles['range-tooltip']}>${maxPrice}</span>
                                        </label>

                                        <div className={subcategoryStyles['filter-buttons']}>
                                            <button
                                                className={subcategoryStyles['apply-button']}
                                                onClick={() => applyFilter('')}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                className={subcategoryStyles['reset-button']}
                                                onClick={() => {
                                                    setMinPrice(0);
                                                    setMaxPrice(1000);
                                                    applyFilter('');
                                                }}
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    filterCategories[selectedFilterCategory].map((option) => (
                                        <div
                                            key={option}
                                            className={subcategoryStyles["filter-option"]}
                                            onClick={() => applyFilter(option)}
                                        >
                                            {option}
                                        </div>
                                    ))
                                )
                            )}
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
        </div >
    );
}

export default SubcategoryPage;

/*
filterCategories[selectedFilterCategory].map((option) => (
                                    <div
                                        key={option}
                                        className={subcategoryStyles["filter-option"]}
                                        onClick={() => applyFilter(option)}
                                    >
                                        {option}
                                    </div>
                                ))
*/