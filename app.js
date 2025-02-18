function App() {
    const [isRunning, setIsRunning] = React.useState(false);
    const [time, setTime] = React.useState({ minutes: 0, seconds: 0 });
    const [blink, setBlink] = React.useState(false);
    const [initialTotalSeconds, setInitialTotalSeconds] = React.useState(0);
    const [isCountingUp, setIsCountingUp] = React.useState(false); // Track counting direction
    
    const startTimer = (inputMinutes) => {
        try {
            setTime({ minutes: inputMinutes, seconds: 0 });
            setInitialTotalSeconds(inputMinutes * 60);
            setIsRunning(true);
            setBlink(false); // Reset blink state when starting the timer
            setIsCountingUp(false); // Reset counting direction to down
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
            setIsCountingUp(false); // Reset counting direction to down
        } catch (error) {
            reportError(error);
        }
    };

    const hornSound = new Audio('car-horn-vintage.mp3'); // Load the horn sound

    React.useEffect(() => {
        let intervalId;
        
        if (isRunning) {
            intervalId = setInterval(() => {
                try {
                    setTime(prevTime => {
                        let { minutes, seconds } = prevTime;
                        if (isCountingUp) {
                            if ((minutes * 60 + seconds) % 300 === 0) {
                                hornSound.play();
                            }
                            if (seconds === 59) {
                                return { minutes: minutes + 1, seconds: 0 };
                            }
                            // Count up indefinitely
                            return { minutes: minutes, seconds: seconds + 1 };
                        }
                        if (minutes === 0 && seconds === 0) {
                            // hornSound.play(); // Play horn sound when timer reaches 0
                            setIsCountingUp(true); // Change to counting up
                            return { minutes: 0, seconds: 0 };
                        }
                        if (seconds === 0) {
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
    }, [isRunning, isCountingUp]);

    const currentTotalSeconds = calculateTotalSeconds(time.minutes, time.seconds);
    const backgroundColor = isRunning ? 
        calculateBackgroundColor(initialTotalSeconds, currentTotalSeconds, isCountingUp) : 
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
                        isBlinking={isCountingUp}
                    />
                )}
            </div>
            {isRunning && <ResetLink onReset={resetTimer} />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
