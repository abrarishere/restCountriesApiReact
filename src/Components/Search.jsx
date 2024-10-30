import PropTypes from 'prop-types';
import {FaMagnifyingGlass} from "react-icons/fa6";
import {useState} from "react";
import {IoChevronDownOutline, IoChevronForward} from "react-icons/io5";


Search.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    colors: PropTypes.shape({
        darkBlue: PropTypes.string.isRequired,
        veryDarkBlueBg: PropTypes.string.isRequired,
        veryDarkBlueText: PropTypes.string.isRequired,
        darkGray: PropTypes.string.isRequired,
        veryLightGray: PropTypes.string.isRequired,
        white: PropTypes.string.isRequired
    }).isRequired,
    regions: PropTypes.array.isRequired,
    setSelectedRegion: PropTypes.func.isRequired
};

function Search({darkMode, search, setSearch, colors, regions, setSelectedRegion}) {

    const [showRegions, setShowRegions] = useState(false);

    return (
        <div className={"flex justify-between items-center flex-wrap container gap-3 mx-auto lg:px-0 md:px-0 sm:px-2 px-4"}>
            <div className={"flex items-center lg:gap-4 md:gap-3 sm:gap-2 gap-1 shadow-sm pl-9 lg:pr-32 md:pr-20 sm:pr-12 pr-0 rounded-md md:py-3 sm:py-3 py-2"}
                 style={{
                     color: darkMode ? colors.white : colors.veryDarkBlueText,
                     backgroundColor: darkMode ? colors.darkBlue : colors.white
                 }}>
                <FaMagnifyingGlass
                    style={{
                        color: darkMode ? colors.white : colors.darkGray
                    }}/>
                <style>
                    {`
                        input::placeholder {
                            color: ${darkMode ? colors.white : colors.darkGray};
                        }
                    `}
                </style>
                <input type="text" className="border-none bg-transparent focus:outline-none lg:mr-16 md:mr-14 sm:mr-10 mr-8 font-light"
                       placeholder={"Search for a country..."}
                       value={search || ''}
                       onChange={(e) => setSearch(e.target.value)}
                       style={{
                           color: darkMode ? colors.white : colors.darkGray
                       }}
                />
            </div>
            <div className="flex items-center justify-center px-4 py-2 shadow-sm rounded-md relative"
                 style={{
                     color: darkMode ? colors.white : colors.veryDarkBlueText,
                     backgroundColor: darkMode ? colors.darkBlue : colors.white
                 }}>
                <button onClick={() => setShowRegions(prev => !prev)}
                        className={"flex items-center gap-2 bg-transparent border-none rounded-md font-semibold lg:py-2 lg:px-4 md:py-1.5 md:px-3 sm:py-1 sm:px-1"}
                        style={{
                            color: darkMode ? colors.white : colors.veryDarkBlueText
                        }}>
                        Filter by Region
                    {showRegions ? <IoChevronDownOutline/> : <IoChevronForward/>}
                </button>
                <div className="overlay absolute top-[58px] right-0 shadow-md rounded-md lg:w-[200px] md:w-[190px] sm:w-[180px] w-[170px]"
                     style={{
                         display: showRegions ? 'block' : 'none',
                         backgroundColor: darkMode ? colors.darkBlue : colors.white,
                         color: darkMode ? colors.white : colors.veryDarkBlueText
                     }}>
                    <ul className={"flex flex-col gap-2 p-4 rounded-md "}>
                        {regions.map((region, index) => (
                            <li key={index}
                                onClick={() => {
                                    setSelectedRegion(region);
                                    setShowRegions(false);
                                }}
                                className={"cursor-pointer p-2 rounded-md"}>
                                <span>{region}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Search;