function ResetLink({ onReset }) {
    return (
        <button 
            onClick={onReset}
            className="reset-link px-4 py-2 rounded-lg text-white transition-colors"
            data-name="reset-link"
        >
            Reset
        </button>
    );
}
