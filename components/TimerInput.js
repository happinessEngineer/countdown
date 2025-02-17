function TimerInput({ onStart }) {
    const [minutes, setMinutes] = React.useState('');

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            const parsedMinutes = parseInt(minutes);
            if (parsedMinutes > 0) {
                onStart(parsedMinutes);
            }
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="timer-input p-6 rounded-lg shadow-lg"
            data-name="timer-input-form"
        >
            <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Enter minutes"
                min="1"
                className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-white/70"
                data-name="timer-input"
            />
            <button
                type="submit"
                className="w-full p-3 bg-white/20 text-white rounded hover:bg-white/30 transition-colors"
                data-name="start-button"
            >
                Start Timer
            </button>
        </form>
    );
}
