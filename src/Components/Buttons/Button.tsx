import classes from './Buttons.module.scss';



const Button = ({children, ...props}) => {
    return (
        <button className={classes.genButton} {...props}>
            {children}
        </button>
    )
}
export default Button;