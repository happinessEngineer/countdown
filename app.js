function App() {
    const [isRunning, setIsRunning] = React.useState(false);
    const [time, setTime] = React.useState({ minutes: 0, seconds: 0 });
    const [blink, setBlink] = React.useState(false);
    const [initialTotalSeconds, setInitialTotalSeconds] = React.useState(0);
    
    const startTimer = (inputMinutes) => {
        try {
            setTime({ minutes: inputMinutes, seconds: 0 });
            setInitialTotalSeconds(inputMinutes * 60);
            setIsRunning(true);
            setBlink(false); // Reset blink state when starting the timer
        } catch (error) {
            reportError(error);
        }
    };

    const resetTimer = () => {
        try {
            setIsRunning(false);
            setTime({ minutes: 0, seconds: 0 });
            setInitialTotalSeconds(0);
            setBlink(false); // Reset blink state on reset
        } catch (error) {
            reportError(error);
        }
    };

    React.useEffect(() => {
        let intervalId;
        
        if (isRunning) {
            intervalId = setInterval(() => {
                try {
                    setTime(prevTime => {
                        let { minutes, seconds } = prevTime;
                        if (seconds === 0) {
                            if (minutes === 0) {
                                clearInterval(intervalId); // Cancel the interval when time reaches 0
                                setBlink(true); // Start blinking when the timer reaches 0
                                return { minutes: 0, seconds: 0 };
                            }
                            return { minutes: minutes - 1, seconds: 59 }; // Reset seconds to 59 when minutes decrease
                        }
                        return { minutes, seconds: seconds - 1 };
                    });
                } catch (error) {
                    reportError(error);
                }
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    const currentTotalSeconds = calculateTotalSeconds(time.minutes, time.seconds);
    const backgroundColor = isRunning ? 
        calculateBackgroundColor(initialTotalSeconds, currentTotalSeconds) : 
        'rgb(34, 197, 94)'; // Initial green color

    return (
        <div 
            className="timer-container flex items-center justify-center"
            style={{ backgroundColor }}
            data-name="timer-container"
        >
            <div className="w-full max-w-md mx-auto px-4 text-center">
                {!isRunning ? (
                    <TimerInput onStart={startTimer} />
                ) : (
                    <TimerDisplay 
                        minutes={time.minutes} 
                        seconds={time.seconds}
                        isBlinking={blink} // Use blink state to control display
                    />
                )}
            </div>
            {isRunning && <ResetLink onReset={resetTimer} />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
