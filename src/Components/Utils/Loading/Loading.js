import SVG from 'react-inlinesvg'

import classes from './Loading.module.scss';


const Loading = () => {
    return (
        <div className={classes.loading}>
            <SVG src={'image/svg/loading/preloader.svg'} width={50} height={50} />
        </div>
    )
}

export default Loading;