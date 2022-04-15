import {useCallback} from "react";

export const useClickInside = () => {

    const isClickedInside = useCallback((id, typePicker, dispatch) => {
        let specifiedElement = document.getElementById(`${id}${typePicker}`);
        let picker = document.getElementById(`${id}${typePicker}Picker`)
        document.addEventListener('click', function(event) {
            let isClickInside = specifiedElement.contains(event.target);
            if (!isClickInside) {
                dispatch(typePicker)
            }
        })
        document.addEventListener('tap', function(event) {
            let isClickInside = specifiedElement.contains(event.target);
            let isPickerTap = picker.contains(event.target)
            if (!isClickInside || !isPickerTap) {
                dispatch()
            }
        });
    }, [document])

    return {isClickedInside}
}
