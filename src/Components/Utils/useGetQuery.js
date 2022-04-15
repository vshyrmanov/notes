import {useCallback, useState} from "react";


export const useGetQuery = () => {
    const [widthQuery, setWidthQuery] = useState(false)

    const getWidth = useCallback((condition) => {
        const mediaQuery = window.matchMedia(condition);
        if (mediaQuery.matches) {
            setWidthQuery(true)
        } else {
            setWidthQuery(false)
        }
    }, [])

    return {widthQuery, getWidth}
}

