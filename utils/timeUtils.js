function calculateBackgroundColor(initialTotalSeconds, currentTotalSeconds, isCountingUp) {
    try {
        if (currentTotalSeconds <= 0 || isCountingUp) return 'rgb(239, 68, 68)'; // red-500
        
        const progress = currentTotalSeconds / initialTotalSeconds;
        const red = Math.round(239 - (progress * (239 - 34)));
        const green = Math.round(68 + (progress * (197 - 68)));
        const blue = Math.round(68);
        
        return `rgb(${red}, ${green}, ${blue})`;
    } catch (error) {
        reportError(error);
        return 'rgb(239, 68, 68)';
    }
}

function calculateTotalSeconds(minutes, seconds) {
    try {
        return minutes * 60 + seconds;
    } catch (error) {
        reportError(error);
        return 0;
    }
}
