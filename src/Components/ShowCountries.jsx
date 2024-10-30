import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

ShowCountries.propTypes = {
    search: PropTypes.string.isRequired,
    selectedRegion: PropTypes.string.isRequired,
    darkMode: PropTypes.bool.isRequired,
    colors: PropTypes.shape({
        darkBlue: PropTypes.string.isRequired,
        veryDarkBlueText: PropTypes.string.isRequired,
        white: PropTypes.string.isRequired
    }).isRequired,
    base_url: PropTypes.string.isRequired,
    countries: PropTypes.array.isRequired,
    setCountries: PropTypes.func.isRequired
};

function ShowCountries({ search, selectedRegion, darkMode, colors, base_url, countries, setCountries }) {
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await fetch(`${base_url}/all`);
                const data = await response.json();
                setCountries(data);
                setFilteredCountries(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getCountries();
    }, [base_url]);

    useEffect(() => {
        setFilteredCountries(countries.filter(country =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, countries]);

    useEffect(() => {
        if (selectedRegion) {
            setFilteredCountries(countries.filter(country =>
                country.region.toLowerCase() === selectedRegion.toLowerCase()
            ));
        } else {
            setFilteredCountries(countries);
        }
    }, [selectedRegion, countries]);

    const handleCountryClick = (country) => {
        navigate(`/country/${country.cca3}`);
    };

    return (
        loading ? <p>Loading...</p> :
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 h-full pb-4 lg:p-0 md:p-0 sm:p-0 p-4">
                {filteredCountries.map(country => (
                    <div key={country.name.common} className="shadow-sm rounded-md overflow-hidden"
                         style={{
                             backgroundColor: darkMode ? colors.darkBlue : colors.white,
                             color: darkMode ? colors.white : colors.veryDarkBlueText
                         }}
                         onClick={() => handleCountryClick(country)}
                    >
                        <img src={country.flags.svg} alt={country.name.common} className="w-full h-48 object-cover"/>
                        <div className="p-6">
                            <h2 className="font-extrabold mb-4">{country.name.common}</h2>
                            <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                            <p><span className="font-semibold">Region:</span> {country.region}</p>
                            <p><span className="font-semibold">Capital:</span> {country.capital}</p>
                        </div>
                    </div>
                ))}
            </div>
    );
}

export default ShowCountries;
