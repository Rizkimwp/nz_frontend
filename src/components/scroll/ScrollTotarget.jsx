import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTargetOnRouteChange = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const targetElement = document.getElementById(location.hash.slice(1));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return null; 
};

export default ScrollToTargetOnRouteChange;
