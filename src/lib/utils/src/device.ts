"use client";

export const isTouchDevice = (): boolean => {
  return "ontouchstart" in window || globalThis.navigator.maxTouchPoints > 0;
};

// @see: https://abdessalam.dev/blog/detect-device-type-javascript/
export const getDeviceType = (): "tablet" | "mobile" | "desktop" => {
  const ua = globalThis.navigator?.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

export const getDeviceScreenInformation = (): {
  browser: {
    innerWidth: number;
    innerHeight: number;
    outerWidth: number;
    outerHeight: number;
  };
  screen: {
    availHeight: number;
    availWidth: number;
    colorDepth: number;
    pixelDepth: number;
    height: number;
    width: number;
    orientation: {
      type: string;
      angle: number;
    };
  };
  devicePixelRatio: number;
} => {
  const {
    availHeight,
    availWidth,
    colorDepth,
    pixelDepth,
    height,
    width,
    orientation,
  } = window.screen;
  const { innerWidth, innerHeight, outerWidth, outerHeight } = window;
  return {
    browser: {
      innerWidth,
      innerHeight,
      outerWidth,
      outerHeight,
    },
    screen: {
      availHeight,
      availWidth,
      colorDepth,
      pixelDepth,
      height,
      width,
      orientation: {
        type: orientation.type,
        angle: orientation.angle,
      },
    },
    devicePixelRatio: window.devicePixelRatio,
  };
};
