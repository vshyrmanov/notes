import classes from './Notification.module.scss';
import SVG from 'react-inlinesvg'
import {useEffect} from "react";


const Notification = ({msg,  handleNotification}) => {

    return (
        <>
            {msg.show && <div className={classes.notification}>
                <SVG src={`image/svg/authpage/${msg.type}.svg`}
                     width={30}
                     height={30}
                     fill={msg.type === 'success' ? 'green' : 'red'} />
                {msg.text}
            <SVG className={classes.closebtn}
                 onClick={handleNotification}
                 src={'image/svg/authpage/close.svg'}
                 width={20}
                 height={20} />
            </div>}
        </>
    )
}

export default Notification;