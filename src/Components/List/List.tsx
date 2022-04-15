import React, {ReactNode} from 'react';
import classes from './List.module.scss'

interface ListProps<T> {
    items: T[],
    renderItem: (item: T, index: number) => ReactNode
}


function List<T> (props: ListProps<T>)  {
    return (
        <div className={classes.list}>
            {props.items.map(props.renderItem)}
        </div>
    )
}

export default List;