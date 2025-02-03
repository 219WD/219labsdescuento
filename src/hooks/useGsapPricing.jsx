import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';

const usePricing = () => {
    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        const split = new SplitType(".container.planes .title-pricing", {
            types: "words, chars",
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".container.planes",
                start: "top 80%",
                end: "+=10%",
                scrub: 0.5,
            },
        }).set(
            split.chars,
            {
                duration: 0.3,
                color: "#fff",
                stagger: 0.1,
            },
            0.1
        );
    }, []);
};

export default usePricing;