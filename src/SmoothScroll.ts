import Lenis from 'lenis';

export default function SmoothScroll() {
  const lenis = new Lenis();

  lenis.on('scroll', () => {
    // console.log(e);
  });

  function raf(time: any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
