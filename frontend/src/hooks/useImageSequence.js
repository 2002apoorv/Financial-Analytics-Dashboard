import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 218;
const FRAME_BASE = '/NEw Check/Sequence0';

/**
 * Pads number to 3 digits, e.g. 1 -> "001"
 */
function pad(n) {
  return String(n).padStart(3, '0');
}

/**
 * Builds the URL for a given 1-indexed frame number.
 */
export function getFrameUrl(index) {
  return `${FRAME_BASE}${pad(index)}.jpg`;
}

/**
 * useImageSequence
 * Preloads all animation frames and returns:
 *  - imagesRef: ref to array of Image objects
 *  - isReady: ref boolean, true when all frames are loaded
 *  - loadProgress: ref 0–1
 *  - drawFrame: (canvas, frameIndex) => void
 */
export function useImageSequence(onProgress) {
  const imagesRef = useRef([]);
  const isReadyRef = useRef(false);
  const loadedCountRef = useRef(0);

  const drawFrame = useCallback((canvas, frameIndex) => {
    if (!canvas || !isReadyRef.current) return;
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // Resize canvas to match display size × dpr
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    // Clear and draw image cover-fit
    ctx.clearRect(0, 0, w, h);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;

    let drawW, drawH, drawX, drawY;
    if (imgAspect > canvasAspect) {
      drawH = h;
      drawW = h * imgAspect;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgAspect;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  useEffect(() => {
    const images = new Array(TOTAL_FRAMES);
    let loadedCount = 0;
    isReadyRef.current = false;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = getFrameUrl(i + 1); // frames are 1-indexed

      img.onload = () => {
        loadedCount++;
        loadedCountRef.current = loadedCount;
        if (onProgress) {
          onProgress(loadedCount / TOTAL_FRAMES);
        }
        if (loadedCount === TOTAL_FRAMES) {
          isReadyRef.current = true;
        }
      };

      img.onerror = () => {
        loadedCount++;
        loadedCountRef.current = loadedCount;
        if (onProgress) onProgress(loadedCount / TOTAL_FRAMES);
        if (loadedCount === TOTAL_FRAMES) {
          isReadyRef.current = true;
        }
      };

      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      // Cleanup: abort any pending loads by clearing src
      images.forEach((img) => { img.src = ''; });
    };
  }, [onProgress]);

  return { imagesRef, isReadyRef, drawFrame };
}

export { TOTAL_FRAMES };
