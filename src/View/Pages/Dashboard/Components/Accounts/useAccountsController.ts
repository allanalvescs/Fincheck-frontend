import { useState } from "react";
import { useWindowWidth } from "../../../../../App/hooks/useWindowWidth";
import { useDashboard } from "../../../../../App/hooks/useDashboard";

export function useAccountsController() {
    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false
    });

    const windowWidth = useWindowWidth();
    const { areValuesVisible, toggleVisibilityValues } = useDashboard();

    return {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleVisibilityValues
    }
}