function Weather () {
    const [weather, setWeather] = React.useState({
        temperature: null,
        condition: null,
        forecast: '',
        icon: '' // Added to store the icon URL
    });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Fetch weather data for Raleigh, NC using the weather.gov API with User-Agent for authentication
                const weatherResponse = await fetch(`https://api.weather.gov/gridpoints/RAH/75,57/forecast`, {
                    headers: {
                        'User-Agent': 'CarbCountdownTimer/1.0' // Replace with your application name and version
                    }
                });
                const weatherData = await weatherResponse.json();

                // Step 3: Set the weather state
                const currentWeather = weatherData.properties.periods[0]; // Get the current weather period
                setWeather({
                    temperature: Math.round(currentWeather.temperature), // Current temperature
                    condition: currentWeather.shortForecast, // Weather condition description
                    forecast: currentWeather.detailedForecast, // Weather condition description
                    icon: currentWeather.icon // Store the icon URL
                });
            } catch (error) {
                setError('Error fetching weather data');
                console.error("Error fetching weather data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []); // Empty dependency array to run only once on load

    if (loading) return <p className="pt-4 text-white">Loading weather data...</p>;
    if (error) return <p className="pt-4 text-white">{error}</p>;

    return (
        <div className="weather-info pt-4 text-white">
            {weather.forecast && (
                <p className="pb-4">Today's forecast: {weather.forecast}</p>
            )}
            {(weather.temperature !== null && weather.condition) && (
                <p>
                    Currently: {weather.temperature}°F, {weather.condition} 
                    {weather.icon && <img src={weather.icon} alt={weather.condition} className="inline-block ml-2 max-h-[40px]" />} {/* Display the icon */}
                </p>
            )}
        </div>
    );
};
