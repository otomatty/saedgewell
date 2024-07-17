import { useEffect, useState } from 'react';

const useScrollToSection = (sectionRefs: React.RefObject<HTMLElement>[]) => {
  const [isWorksInView, setIsWorksInView] = useState(false);

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const smoothScroll = (targetPosition: number) => {
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 800; // スクロールの時間を調整
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          isScrolling = false; // アニメーション終了時にフラグをリセット
        }
      };

      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    };

    const handleScroll = (event: WheelEvent) => {
      if (isScrolling || isWorksInView) return;
      isScrolling = true;
      event.preventDefault();
      const currentScroll = window.scrollY;

      for (let i = 0; i < sectionRefs.length; i++) {
        const section = sectionRefs[i].current;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            if (event.deltaY > 0 && i < sectionRefs.length - 1) {
              // Scroll down
              smoothScroll(sectionRefs[i + 1].current?.offsetTop || 0);
            } else if (event.deltaY < 0 && i > 0) {
              // Scroll up
              smoothScroll(sectionRefs[i - 1].current?.offsetTop || 0);
            }
            break;
          }
        }
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100); // デバウンスの時間を調整
    };

    const worksRef = sectionRefs.find((ref) =>
      ref.current?.classList.contains('worksSection')
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsWorksInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (worksRef?.current) {
      observer.observe(worksRef.current);
    }

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
      if (worksRef?.current) {
        observer.unobserve(worksRef.current);
      }
    };
  }, [sectionRefs]);

  return isWorksInView;
};

export default useScrollToSection;
