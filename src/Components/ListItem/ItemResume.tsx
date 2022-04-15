import React, {FC} from 'react';
import {IResumes} from "../../Types/types";
import classes from './ItemResume.module.scss';
import {Link, useNavigate, useParams} from "react-router-dom";

interface ListItemProps {
    resumes: IResumes,
    index: number,
    remove: (id: string) => void
}

export const ItemResume: FC<ListItemProps> = (props: ListItemProps) => {

    const remove = () => {
        props.remove(props.resumes._id)
    }

    const getPage = () => {
        localStorage.setItem('path', `resume/${props.resumes._id}`)
    }
    const edit = () => {
        localStorage.setItem('path', `resume/edit/${props.resumes._id}`)
    }


    return (
        <div className={classes.item}>
            <div className={classes.item_element}>{props.index + 1}</div>
            <div className={classes.item_element}>{props.resumes.name}</div>
            <div className={classes.item_element} onClick={getPage}>
                <Link to={`resume/${props.resumes._id}`} target={"_blank"}>Show page</Link>
            </div>
            <div className={classes.item_element} onClick={() => edit()}>
                <Link to={`edit/${props.resumes._id}`}>
                   Edit
                </Link>
            </div>
            <div className={classes.item_element} onClick={remove}>delete</div>
        </div>
    )
}
//