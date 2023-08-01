import { useEffect, useRef, useState } from "react";

export default function useMousePortal(dom = 'button') {
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const domRef = useRef(null);
    const [coords, setCoords] = useState({
        width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0
    });
    useEffect(() => {
        function handleClickOutSide(e) {
            if (
                domRef.current &&
                !domRef.current.contains(e.target) &&
                !e.target.matches(dom)
            ) {
                setShow(false);
                setVisible(false)
            }
        }
        document.addEventListener("click", handleClickOutSide);
        return () => {
            document.removeEventListener("click", handleClickOutSide);
        };
    }, [dom]);
    const handleMouseOver = (e) => {
        setCoords(e.target.getBoundingClientRect())
        setVisible(true)
    }
    const handleMouseLeave = () => {
        setVisible(false)
    }
    const handleClick = () => {
        setCoords(domRef.current.getBoundingClientRect())
        setShow(!show)
    }
    return { visible, coords, show, domRef, setShow, handleClick, handleMouseLeave, handleMouseOver }
}