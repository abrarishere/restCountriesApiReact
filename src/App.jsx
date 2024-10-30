import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav.jsx';
import Search from "./Components/Search.jsx";
import ShowCountries from "./Components/ShowCountries.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [search, setSearch] = useState('');
    const [regions, setRegions] = useState([]);
    const BASE_URL = 'https://restcountries.com/v3.1';
    const [selectedRegion, setSelectedRegion] = useState('');
    const [countries, setCountries] = useState([]);

    const getRegionNames = async () => {
        try {
            const response = await fetch(`${BASE_URL}/all`);
            const data = await response.json();
            const regionNames = data.map(country => country.region);
            const uniqueRegions = [...new Set(regionNames)];
            console.log('Regions retrieved:', uniqueRegions);
            setRegions(uniqueRegions);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRegionNames();
    }, []);

    const colors = {
        darkBlue: 'hsl(209, 23%, 22%)',
        veryDarkBlueBg: 'hsl(207, 26%, 17%)',
        veryDarkBlueText: 'hsl(200, 15%, 8%)',
        darkGray: 'hsl(0, 0%, 52%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        white: 'hsl(0, 0%, 100%)'
    };

    return (
        <div className="flex flex-col gap-12 min-h-screen"
             style={{
                 backgroundColor: darkMode ? colors.veryDarkBlueBg : colors.veryLightGray,
                 color: darkMode ? colors.white : colors.veryDarkBlueText
             }}>
            <Routes>
                {/* Home Route with Nav and Search */}
                <Route path="/" element={
                    <>
                        <Nav darkMode={darkMode} setDarkMode={setDarkMode} colors={colors} />
                        <Search
                            search={search}
                            setSearch={setSearch}
                            colors={colors}
                            darkMode={darkMode}
                            regions={regions}
                            setSelectedRegion={setSelectedRegion}
                        />
                        <ShowCountries
                            search={search}
                            selectedRegion={selectedRegion}
                            darkMode={darkMode}
                            colors={colors}
                            base_url={BASE_URL}
                            countries={countries}
                            setCountries={setCountries}
                        />
                    </>
                } />

                <Route path="/country/:countryCCA" element={
                    <DetailsPage
                        base_url={BASE_URL}
                        colors={colors}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        countries={countries}
                    />
                } />
            </Routes>
        </div>
    );
}

export default App;
