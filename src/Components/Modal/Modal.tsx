import React, {FC} from 'react';
import classes from './Modal.module.scss';

interface ModalProps {
    handleModal: () => void;
}

export const Modal = ({children, handleModal}) => {

    return (
        <div className={classes.background} onClick={handleModal}>
            <div className={classes.container} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}