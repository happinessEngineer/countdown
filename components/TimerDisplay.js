function TimerDisplay({ minutes, seconds, isBlinking }) {
    try {
        const displayMinutes = Math.abs(minutes).toString().padStart(2, '0');
        const displaySeconds = Math.abs(seconds).toString().padStart(2, '0');

        const [visible, setVisible] = React.useState(true);

        React.useEffect(() => {
            let interval;
            if (isBlinking) {
                interval = setInterval(() => {
                    setVisible(prev => !prev);
                }, 500); // Toggle every 500ms
            } else {
                setVisible(true); // Ensure it's visible when not blinking
            }
            return () => clearInterval(interval); // Cleanup on unmount
        }, [isBlinking]);

        return (
            <div 
                className="timer-display text-white text-center"
                data-name="timer-display"
                style={{ opacity: visible ? 1 : 0 }} // Blink effect
            >
                <div>
                    {displayMinutes}:{displaySeconds}
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return <div>Error displaying timer</div>;
    }
}
