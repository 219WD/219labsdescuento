import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';

export const initLenis = () => {
  const lenis = new Lenis();

  // Sincronizar Lenis con ScrollTrigger de GSAP
  lenis.on('scroll', ScrollTrigger.update);

  // Agregar el raf de Lenis al ticker de GSAP
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Asegura que Lenis se ejecute con GSAP
  });

  gsap.ticker.lagSmoothing(0); // Desactivar la suavización del lag

  // Retornar función de limpieza
  return () => {
    gsap.ticker.remove((time) => lenis.raf(time * 1000));
    lenis.destroy(); // Destruir la instancia de Lenis
  };
};