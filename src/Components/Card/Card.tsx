import React, {FC} from 'react';

export enum CardVariant {
    outlined = 'outlined',
    primary = 'primary'
}

interface CardProps {
    width?: string,
    height?: string,
    variant?: CardVariant,
}

const Card: FC<CardProps> = ({
                                 width,
                                 height,
                                 variant,
                                 children}) => {
    return (
        <div style={{
            width, height,
            background: variant === CardVariant.primary ? '#bebebe' : 'green',
            border: variant === CardVariant.outlined ? '1px solid red' : 'none'}}>
            {children}
        </div>
    )
}

export default Card;