import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getAsync } from '../../helper/axiosHelper';

const SelectInput = ({ placeholder, apiUrl, valueField, lableField, onValueChange, selectedOption }) => {
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const roleResponse = await getAsync(apiUrl, null);
            const data = roleResponse.data.list;

            // Map the API response to the format required by React Select
            const mappedOptions = data.map((item) => ({
                value: item[valueField],
                label: item[lableField],
            }));

            setOptions(mappedOptions);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching roles data:', error);
            setIsLoading(false);
        }
    };

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Select
            options={options}
            isLoading={isLoading}
            isSearchable
            placeholder={placeholder}
            onChange={onValueChange}
            defaultValue={selectedOption}
        />
    );
};

export default SelectInput;