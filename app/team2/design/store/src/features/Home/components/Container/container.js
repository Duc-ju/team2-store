import classes from './container.module.scss';

const Container = ({ children, className, ...props }) => {
    return (
        <div className={`${classes.container} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Container;
