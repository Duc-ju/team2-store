import classes from './container.module.scss';

const AppContainer = ({ children, className, ...props }) => {
    return (
        <div className={`${classes.appContainer} ${className}`} {...props}>
            {children}
        </div>
    );
};
export default AppContainer;
