import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { REACT_APP_API_URL, REACT_APP_API_KEY, geoApiOptions } from "./api";

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (location) => {
        return fetch(
            `${REACT_APP_API_URL}/weather?q=${location}&units=imperial&appid=
            ${REACT_APP_API_KEY}`, geoApiOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            })
            .catch((err) => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
}

export default Search;