import React, { useRef, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

const FakeHoverSpline: React.FC<{ sceneUrl: string }> = ({ sceneUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const disabledUntilRef = useRef<number>(0);
  const isInactiveRef = useRef<boolean>(false);
  const lastActivityRef = useRef<number>(performance.now());
  const splineAppRef = useRef<any>(null);
  const lastFrameTimeRef = useRef<number>(0);
  // Removed unused frame and error logging variables

  // Patch the lerpMaterial function to handle errors silently
  const patchLerpMaterialFunction = (splineApp: any) => {
    if (!splineApp || !splineApp._runtime) return;
    try {
      const originalLerpMaterial = splineApp._runtime.lerpMaterial;
      splineApp._runtime.lerpMaterial = function patchedLerpMaterial(...args: any[]) {
        try {
          return originalLerpMaterial.apply(this, args);
        } catch (err) {
          return args[0]; // Fallback to the first material
        }
      };
    } catch (err) {
      // Silent catch
    }
  };

  const handleLoad = (splineApp: any) => {
    splineAppRef.current = splineApp;
    if (splineApp?._renderer?.domElement) {
      canvasRef.current = splineApp._renderer.domElement;
      monitorFrameRate(splineApp);
      patchLerpMaterialFunction(splineApp);
    }
  };

  const monitorFrameRate = (splineApp: any) => {
    if (!splineApp || !splineApp._renderer) return;
    const originalRender = splineApp._renderer.render;
    splineApp._renderer.render = function (...args: any[]) {
      const now = performance.now();
      if (lastFrameTimeRef.current > 0) {
        // (Optional: Insert any frame timing logic if needed)
      }
      lastFrameTimeRef.current = now;
      return originalRender.apply(this, args);
    };
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const waitForCanvas = (): Promise<HTMLCanvasElement> => {
      return new Promise((resolve) => {
        const check = () => {
          if (canvasRef.current) {
            resolve(canvasRef.current);
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });
    };

    waitForCanvas().then((canvasEl) => {
      const disableFakeHover = () => {
        disabledUntilRef.current = performance.now() + 2000;
        lastActivityRef.current = performance.now();
        isInactiveRef.current = false;
      };

      const registerActivity = () => {
        lastActivityRef.current = performance.now();
        isInactiveRef.current = false;
      };

      window.addEventListener('mousemove', registerActivity, { passive: true });
      window.addEventListener('keydown', registerActivity, { passive: true });
      window.addEventListener('click', registerActivity, { passive: true });
      window.addEventListener('scroll', registerActivity, { passive: true });
      window.addEventListener('touchstart', registerActivity, { passive: true });

      canvasEl.addEventListener('pointerdown', disableFakeHover);
      canvasEl.addEventListener('pointermove', (e) => {
        if (e.isTrusted) {
          disableFakeHover();
        }
      });

      let currentTargetIndex = 0;
      const getPositions = () => {
        const rect = canvasEl.getBoundingClientRect();
        let targets = [
          { x: rect.left + 0.2 * rect.width, y: rect.top + 0.2 * rect.height },
          { x: rect.left + 0.9 * rect.width, y: rect.top + 0.6 * rect.height },
          { x: rect.left + 0.1 * rect.width, y: rect.top + 0.6 * rect.height },
        ];
        if (!isMobile) {
          targets = [
            { x: rect.left + 0.4 * rect.width, y: rect.top + 0.2 * rect.height },
            { x: rect.left + 0.6 * rect.width, y: rect.top + 0.4 * rect.height },
            { x: rect.left + 0.5 * rect.width, y: rect.top + 0.5 * rect.height },
            { x: rect.left + 0.7 * rect.width, y: rect.top + 0.5 * rect.height },
            { x: rect.left + 0.4 * rect.width, y: rect.top + 0.6 * rect.height },
          ];
        }
        return targets;
      };

      const positions = getPositions();
      let currentPos = { ...positions[currentTargetIndex] };
      let targetPos = positions[currentTargetIndex];
      let lastChangeTime = performance.now();
      const changeInterval = 5000;
      let lastAnimationTime = 0;
      const animationThrottle = 50; // Update at roughly 20fps

      const animate = (time: number) => {
        if (document.hidden) {
          lastChangeTime = time;
          requestAnimationFrame(animate);
          return;
        }

        if (time - lastAnimationTime < animationThrottle) {
          requestAnimationFrame(animate);
          return;
        }
        lastAnimationTime = time;

        const inactiveTime = time - lastActivityRef.current;
        if (inactiveTime > 40000 && !isInactiveRef.current) {
          isInactiveRef.current = true;
        }

        if (time < disabledUntilRef.current || isInactiveRef.current) {
          lastChangeTime = time;
        } else {
          if (time - lastChangeTime >= changeInterval) {
            currentTargetIndex = (currentTargetIndex + 1) % positions.length;
            targetPos = positions[currentTargetIndex];
            lastChangeTime = time;
          }
          const t = Math.min((time - lastChangeTime) / changeInterval, 1);
          currentPos = {
            x: currentPos.x + (targetPos.x - currentPos.x) * t * 0.02,
            y: currentPos.y + (targetPos.y - currentPos.y) * t * 0.02,
          };

          const fakeEvent = new PointerEvent('pointermove', {
            clientX: currentPos.x,
            clientY: currentPos.y,
            bubbles: true,
            cancelable: true,
            pointerType: 'touch',
          });
          canvasEl.dispatchEvent(fakeEvent);
        }
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);

      return () => {
        canvasEl.removeEventListener('pointerdown', disableFakeHover);
        window.removeEventListener('mousemove', registerActivity);
        window.removeEventListener('keydown', registerActivity);
        window.removeEventListener('click', registerActivity);
        window.removeEventListener('scroll', registerActivity);
        window.removeEventListener('touchstart', registerActivity);
      };
    });
  }, []);

  return (
    <Spline
      scene={sceneUrl}
      onLoad={handleLoad}
    />
  );
};

const SplineScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobileSceneUrl = "https://prod.spline.design/3ym9cmBFdXtEIk42/scene.splinecode";
  const desktopSceneUrl = "https://prod.spline.design/Lbl3OvwVu2mrjYxX/scene.splinecode";

  return (
    <>
      {/* Desktop View */}
      {!isMobile && (
        <div
          className="hidden md:block absolute top-0 right-0 w-1/2 h-screen z-10 overflow-x-hidden"
          data-cursor="disable"
        >
          <div
            className="relative w-full h-full opacity-0 animate-fadeIn"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at 90% 50%, black 50%, transparent 80%), linear-gradient(to bottom, black 90%, transparent 100%)",
              maskImage:
                "radial-gradient(circle at 90% 50%, black 50%, transparent 80%), linear-gradient(to bottom, black 90%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            <div className="absolute top-0 left-0 w-[120%] h-full -mr-[20%]">
              <FakeHoverSpline sceneUrl={desktopSceneUrl} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile View – with simulated hover events */}
      {isMobile && (
        <div className="w-full h-[50vh] mt-0 opacity-0 animate-fadeIn relative overflow-hidden">
          <div
            className="absolute w-full h-full inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            }}
          >
            <div className="absolute w-[130%] h-full -right-[36%] scale-[1.1] origin-center">
              <FakeHoverSpline sceneUrl={mobileSceneUrl} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SplineScene;