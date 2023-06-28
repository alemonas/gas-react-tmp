export const Spinner = () => {
    return (
        <div className="spinner">
            <span aria-label="loading" className="spinner__loader"></span>
        </div>
    );
};

export const Alert = ({ variant = 'primary', children }) => {
    return (
        <div className="alert" role="alert">
            <span className={`alert-${variant}`}>{children}</span>
        </div>
    );
};
