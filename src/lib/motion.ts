import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
CustomEase.create('editorial', '0.76, 0, 0.24, 1');
CustomEase.create('settle', '0.16, 1, 0.3, 1');
gsap.defaults({ ease: 'settle', duration: 0.9 });

export const wipeEase = [0.76, 0, 0.24, 1] as const;
export { gsap, ScrollTrigger, SplitText };
