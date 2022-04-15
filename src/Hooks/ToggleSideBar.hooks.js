import {useState, useCallback, useEffect} from "react";

export const useHandleSideBar = () => {
    const [showSidebar, setShowSidebar] = useState(false)
    const toggleSidebar = useCallback(() => {
        setShowSidebar(!showSidebar)
    }, [showSidebar])
    return {showSidebar, toggleSidebar}
}