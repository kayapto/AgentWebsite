  import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Animate features cards
  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2
    });
  });

  // Animate section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top bottom-=50',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 1
    });
  });
};

export const initParallaxEffects = () => {
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;

    gsap.utils.toArray('.parallax').forEach(element => {
      gsap.to(element, {
        duration: 0.5,
        x: xPos,
        y: yPos,
        ease: 'power1.out'
      });
    });
  });
};
