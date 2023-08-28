export const ctaTopBounceVariant = {
  animate: {
    y: [-1.8, 0.5, -1.8],
    transition: {
      y: {
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        repeat: Infinity,
      },
    },
  },
};

export const ctaBottomBounceVariant = {
  animate: {
    y: [-1.5, 0.5, -1.5],
    transition: {
      y: {
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        repeat: Infinity,
      },
    },
  },
};

export const ctaLeftBounceVariant = {
  animate: {
    x: [-1.8, 0.5, -1.8],
    transition: {
      x: {
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        repeat: Infinity,
      },
    },
  },
};

export const ctaRightBounceVariant = {
  animate: {
    x: [-1.5, 0.5, -1.5],
    transition: {
      x: {
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        repeat: Infinity,
      },
    },
  },
};

export { default as Up } from './Up';
export { default as Right } from './Right';
export { default as Down } from './Down';
export { default as Left } from './Left';
