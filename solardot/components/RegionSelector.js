'use client';

import React, { useState } from 'react';

const regions = {
    Europe: ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'],
    Africa: ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Côte d\'Ivoire', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'São Tomé and Príncipe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'],
    // Add more regions and countries as needed
};

const RegionSelector = () => {
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        setSelectedCountry('');
        setSearchQuery('');
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCountries = selectedRegion
        ? regions[selectedRegion].filter((country) =>
            country.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div>
            <select value={selectedRegion} onChange={handleRegionChange}>
                <option value="">Select a region</option>
                {Object.keys(regions).map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>
                ))}
            </select>
            {selectedRegion && (
                <div>
                    <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <select value={selectedCountry} onChange={handleCountryChange}>
                        <option value="">Select a country</option>
                        {filteredCountries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default RegionSelector;