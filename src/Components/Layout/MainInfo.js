import React from 'react';

import classes from './MainInfo.module.scss';

const MainInfo = ({children}) => {
    return (
        <div className={classes.mainInfo}>
            <div className={classes.mainInfo_content}>
                {children}
            </div>
        </div>
    )
}

export default MainInfo;