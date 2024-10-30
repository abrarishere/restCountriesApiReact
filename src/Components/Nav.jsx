import {Link} from 'react-router-dom';
import {IoMoonOutline} from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import PropTypes from 'prop-types';

function Nav({darkMode, setDarkMode, colors}) {
    return (
        <header
            style={{
                backgroundColor: darkMode ? colors.darkBlue : colors.white,
                color: darkMode ? colors.white : colors.veryDarkBlueText
            }}
            className="shadow-md"
        >
            <nav className="mx-auto flex justify-between items-center py-4 container lg:px-2     md:px-2 sm:px-4 px-4 xl:px-0">
                <h1>
                    <Link to="/">
                        <h1 className="lg:text-2xl md:text-2xl sm:text-xl font-extrabold">Where in the world?</h1>
                    </Link>
                </h1>
                <button onClick={() => setDarkMode(prev => !prev)}
                        className={"flex items-center justify-center bg-none border-none rounded-md lg:gap-2 font-semibold py-2 px-4 lg:text-md md:text-sm sm:text-xs md:gap-1.5 sm:gap-1 gap-0.5"}
                        style={{
                            color: darkMode ? colors.white : colors.veryDarkBlueText
                        }}>
                    {darkMode ? <IoMoon/> : <IoMoonOutline/>}
                    Dark Mode
                </button>
            </nav>
        </header>

    );
}

Nav.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    colors: PropTypes.shape({
        darkBlue: PropTypes.string.isRequired,
        veryDarkBlueBg: PropTypes.string.isRequired,
        veryDarkBlueText: PropTypes.string.isRequired,
        darkGray: PropTypes.string.isRequired,
        veryLightGray: PropTypes.string.isRequired,
        white: PropTypes.string.isRequired
    }).isRequired
};

export default Nav;