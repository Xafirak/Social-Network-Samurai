// @ts-nocheck

import { useEffect, useRef } from "react";

export default function useScroll(parentRef, childRef, callback) {
    const observer = useRef();
    const child = childRef.current;
    useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: "0px",
            threshold: 0,
        };
        observer.current = new IntersectionObserver(([target]) => {
            if (target.isIntersecting) {
                callback();
            }
        }, options);

        observer.current.observe(child);

        return function () {
            observer.current.unobserve(child);
        };
    }, [callback]);
}
