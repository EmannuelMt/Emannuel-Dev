<<<<<<< HEAD
// src/utils/motion.js
export const staggerContainer = (staggerChildren, delayChildren) => ({
=======
import { motion } from 'framer-motion';

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1) => ({
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

<<<<<<< HEAD
=======
export const textVariant = (delay = 0) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
<<<<<<< HEAD
      type,
      delay,
      duration,
=======
      type: type || 'spring',
      delay,
      duration: duration || 1,
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
      ease: 'easeOut',
    },
  },
});

<<<<<<< HEAD
export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export const zoomIn = (delay, duration) => ({
  hidden: {
    scale: 0.5,
=======
export const zoomIn = (delay = 0, duration = 1) => ({
  hidden: {
    scale: 0,
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
<<<<<<< HEAD
      ease: 'easeOut',
=======
      bounce: 0.4,
    },
  },
});

export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : '100%',
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      type: type || 'spring',
      delay,
      duration: duration || 0.75,
      ease: 'easeOut',
      bounce: 0.25,
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
    },
  },
});

export const planetVariants = (direction) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : '100%',
    rotate: 120,
<<<<<<< HEAD
=======
    opacity: 0,
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
  },
  show: {
    x: 0,
    rotate: 0,
<<<<<<< HEAD
=======
    opacity: 1,
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
    transition: {
      type: 'spring',
      duration: 1.8,
      delay: 0.5,
<<<<<<< HEAD
    },
  },
});
=======
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

export const staggerText = (staggerChildren = 0.1, delayChildren = 0.1) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const letterAnimation = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  },
});

export const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
};
>>>>>>> aefe7df (Corrige carregamento de imagem e atualiza seção About)
