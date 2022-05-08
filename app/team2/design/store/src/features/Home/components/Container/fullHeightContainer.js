import classes from './container.module.scss';

const FullHeightContainer = ({ children, className, ...props }) => {
    return (
        <div
            className={`${classes.fullHeightContainer} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
export default FullHeightContainer;
