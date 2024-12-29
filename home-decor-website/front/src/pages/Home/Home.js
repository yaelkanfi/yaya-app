import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import styles from './Home.module.css';
import bannerImage from '../../assets/images/banner.jpg';

function Home() {
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

    return (
        <div className={styles['home-container']}>
            {/* Horizontal banner image */}
            <img src={bannerImage} alt="Home Banner" className={styles['home-banner']} />

            <div className={styles['controls']}>
                {/* Sort Dropdown */}
                <div className={styles['sort-container']}>
                    <button className={styles['sort-toggle']} onClick={toggleSort}>
                        Sort
                        <span className={`${styles.triangle} ${sortOpen ? styles.down : ''}`}></span>
                    </button>
                    {sortOpen && (
                        <div className={styles['sort-dropdown']}>
                            <span>Price: Low to High</span>
                            <span>Price: High to Low</span>
                            <span>Newest Arrivals</span>
                        </div>
                    )}
                </div>

                {/* Filter Bar */}
                <div className={styles['filter-container']}>
                    <button className={styles['filter-toggle']} onClick={toggleFilter} >
                        <FaFilter className='filter-icon' />
                        Filter
                        <span className={`${styles.triangle} ${filterOpen ? 'down' : ''}`}></span>
                    </button>
                    {filterOpen && (
                        <div className={styles['filter-bar']}>
                            {filterOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className={`${styles['filter-option']} ${selectedFilters.includes(option) ? 'selected' : ''
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
        </div>
    );
}

export default Home;
