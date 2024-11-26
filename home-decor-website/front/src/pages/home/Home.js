import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import './Home.css';
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
        <div className="home-container">
            {/* Horizontal banner image */}
            <img src={bannerImage} alt="Home Banner" className="home-banner" />

            <div className="controls">
                {/* Sort Dropdown */}
                <div className="sort-container">
                    <button className="sort-toggle" onClick={toggleSort}>
                        Sort
                        <span className={`triangle ${sortOpen ? 'down' : ''}`}></span>
                    </button>
                    {sortOpen && (
                        <div className="sort-dropdown">
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

            {/* Display selected filters */}
            <div className="selected-filters">
                <h4>Selected Filters:</h4>
                {selectedFilters.length > 0 ? (
                    selectedFilters.map((filter, index) => <span key={index}>{filter}</span>)
                ) : (
                    <span>None</span>
                )}
            </div>
        </div>
    );
}

export default Home;
