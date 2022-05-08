import classes from './container.module.scss';

const MainContainer = ({ children, className, ...props }) => {
    return (
        <div className={`${classes.mainContainer} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default MainContainer;
