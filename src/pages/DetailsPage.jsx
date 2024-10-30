import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from '../Components/Nav.jsx';
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

DetailsPage.propTypes = {
    base_url: PropTypes.string.isRequired,
    colors: PropTypes.object.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired
};

function DetailsPage({ base_url, colors, darkMode, setDarkMode, countries }) {
    const { countryCCA } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const getCountryByCCA3 = (cca3) => {
        return countries.find(country => country.cca3 === cca3);
    };

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await fetch(`${base_url}/alpha/${countryCCA}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const countryData = await response.json();
                // Check if countryData is an array and has at least one item
                if (Array.isArray(countryData) && countryData.length > 0) {
                    setData(countryData[0]);
                } else {
                    throw new Error('Country data is not in the expected format');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching country details:', err);
            }
        };
        fetchCountryDetails();
    }, [countryCCA, base_url]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Nav darkMode={darkMode} setDarkMode={setDarkMode} colors={colors} />
            <div className="container mx-auto lg:mt-8 flex flex-col lg:gap-16 min-h-screen md:gap-12 sm:gap-8 gap-4 lg:p-0 md:p-2 sm:p-4 p-8">
                <div className="button">
                    <button
                        className={"flex items-center gap-2 shadow-lg border-none rounded-md font-semibold lg:py-3 lg:px-10 md:py-2 md:px-8 sm:py-1.5 sm:px-6 py-1 px-4"}
                        style={{
                            color: darkMode ? colors.white : colors.veryDarkBlueText,
                            backgroundColor: darkMode ? colors.darkBlue : colors.white
                        }}
                        onClick={handleBack}
                    >
                        <FaArrowLeftLong />
                        Back
                    </button>
                </div>
                <div className="flex lg:gap-32 lg:items-center lg:flex-row md:flex-col sm:flex:col xl:flex-row flex-col md:gap-16 sm:gap-16 gap-8 md:items-center sm:items-start xl:items-center items-start">
                    <div className="image-container lg:w-[50%] h-auto md:w-full sm:w-full xl:w-[50%] w-full">
                        <img src={data.flags ? data.flags.png : ''} alt={data.name.common} className="w-full h-auto" />
                    </div>
                    <div className="details-container lg:max-w-[50%] flex flex-col justify-center text-lg">
                        <h2 className="text-4xl font-bold mb-8">
                            {data.name.common}
                        </h2>
                        <div className="flex gap-8 lg:flex-row md:flex-col sm:flex:col xl:flex-row flex-col">
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">
                                    Native Name: <span className="font-light">{data.altSpellings[1] || 'N/A'}</span>
                                </p>
                                <p className="font-semibold">Population: <span className="font-light">{data.population ? data.population.toLocaleString() : 'N/A'}</span></p>
                                <p className="font-semibold">Region: <span className="font-light">{data.region || 'N/A'}</span></p>
                                <p className="font-semibold">Sub Region: <span className="font-light">{data.subregion || 'N/A'}</span></p>
                                <p className="font-semibold">Capital: <span className="font-light">{data.capital || 'N/A'}</span></p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Top Level Domain: <span className="font-light">{data.tld ? data.tld.join(', ') : 'N/A'}</span></p>
                                <p className="font-semibold">Currencies: <span className="font-light">{data.currencies ? data.currencies[Object.keys(data.currencies)[0]].name : 'N/A'}</span></p>
                                <p className="font-semibold">Languages: <span className="font-light">{data.languages ? data.languages[Object.keys(data.languages)[0]] : 'N/A'}</span></p>
                            </div>
                        </div>
                        <div className="border-countries flex flex-wrap justify-center items-center gap-2 mt-8">
                            <p className="font-semibold">Border Countries:</p>
                            {data.borders && data.borders.length > 0 ? (
                                data.borders.map((borderCCA, index) => {
                                    const country = getCountryByCCA3(borderCCA);
                                    return (
                                        <button key={index}
                                                className={" rounded-md font-semibold lg:py-1 lg:px-4 md:py-0.5 md:px-3 sm:py-0.5 sm:px-2 py-0.5 px-2"}
                                                style={{
                                                    color: darkMode ? colors.white : colors.veryDarkBlueText,
                                                    border: colors.darkGray + ' 2px solid',
                                                }}
                                                onClick={() => country && navigate(`/country/${country.cca3}`)}
                                        >
                                            {country ? country.name.common : borderCCA}
                                        </button>
                                    );
                                })
                            ) : (
                                <span className="font-light">None</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsPage;
