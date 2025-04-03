import { Variants } from 'framer-motion';

// Анимация появления с подъемом
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Анимация появления из невидимого состояния
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
};

// Анимация для карточек с задержкой
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};


export const heroAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: "easeInOut"
    }
  }
};

// Анимация увеличения при наведении
export const scaleOnHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.98 
  }
};

// Анимация для заголовков с подчеркиванием
export const titleWithUnderline: Variants = {
  hidden: { 
    opacity: 0,
    width: "0%"
  },
  visible: { 
    opacity: 1,
    width: "100%",
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

// Анимация для пошагового отображения элементов
export const sequentialFadeIn = (delay: number = 0): Variants => ({
  hidden: { 
    opacity: 0,
    y: 15
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: delay,
      ease: "easeOut"
    }
  }
}); 