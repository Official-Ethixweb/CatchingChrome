import { useRef, useEffect, useState } from 'react';
import type { gsap } from 'gsap';

import './FlowingMenu.css';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
  /** Seconds for one full right-to-left pass of the hover marquee. */
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  /** Tint laid over each destination photo behind the resting label. */
  veilColor?: string;
}

export function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#120F17',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff',
  veilColor = 'rgba(14, 42, 59, 0.62)'
}: FlowingMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (!menuRef.current) return;

        const items = menuRef.current.querySelectorAll('.menu__item');
        if (!items.length) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: menuRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      });
    });
  }, []);

  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }} ref={menuRef}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            veilColor={veilColor}
          />
        ))}
      </nav>
    </div>
  );
}

interface MenuItemComponentProps extends MenuItemProps {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  veilColor: string;
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  veilColor
}: MenuItemComponentProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<gsap.core.Tween | null>(null);
  const gsapRef = useRef<(typeof import('gsap'))['gsap'] | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseY: number, height: number) =>
    distMetric(mouseY, 0) < distMetric(mouseY, height) ? 'top' : 'bottom';

  const distMetric = (y: number, y2: number) => (y - y2) * (y - y2);

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      gsapRef.current = gsap;
    });
  }, []);

  useEffect(() => {
    const calculateRepetitions = () => {
      const part = marqueeInnerRef.current?.querySelector(
        '.marquee__part'
      ) as HTMLElement | null;
      if (!part) return;

      const contentWidth = part.offsetWidth;
      if (!contentWidth) return;

      const needed = Math.ceil(window.innerWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text]);

  // The band scrolls right-to-left only while the option is hovered/focused,
  // and never for reduced-motion users.
  const startScroll = () => {
    const g = gsapRef.current;
    const inner = marqueeInnerRef.current;
    if (!g || !inner || scrollRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const part = inner.querySelector('.marquee__part') as HTMLElement | null;
    const contentWidth = part?.offsetWidth ?? 0;
    if (!contentWidth) return;

    g.set(inner, { x: 0 });
    scrollRef.current = g.to(inner, {
      x: -contentWidth,
      duration: speed,
      ease: 'none',
      repeat: -1
    });
  };

  const stopScroll = () => {
    scrollRef.current?.kill();
    scrollRef.current = null;
    if (gsapRef.current && marqueeInnerRef.current) {
      gsapRef.current.set(marqueeInnerRef.current, { x: 0 });
    }
  };

  // The white band flips in from whichever edge the cursor crossed, with the
  // inner track counter-moving so the reveal reads as a single smooth panel.
  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const g = gsapRef.current;
    if (!g || !itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientY - rect.top, rect.height);

    startScroll();

    g.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const g = gsapRef.current;
    if (!g || !itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;

    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientY - rect.top, rect.height);

    g.timeline({ defaults: animationDefaults, onComplete: stopScroll })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  useEffect(() => () => void scrollRef.current?.kill(), []);

  return (
    <div
      className="menu__item"
      ref={itemRef}
      style={{ borderColor, backgroundImage: `url(${image})` }}
    >
      <div className="menu__item-veil" style={{ backgroundColor: veilColor }} />
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
