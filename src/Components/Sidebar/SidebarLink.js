import classes from "./Sidebar.module.scss";
import {Link} from "react-router-dom";
import SVG from "react-inlinesvg";
import React from "react";


const SidebarLink = ({link, todo, linksList}) => {
    return (
        <div className={classes.sidebar_link}>
            <Link to={`/${link}`} onClick={() => todo()}>
                <SVG src={`image/svg/sidebar/${link}.svg`} width={20} height={20} />
                <span>{linksList[`${link}`]}</span>
            </Link>
        </div>
    )
}

export default SidebarLink;