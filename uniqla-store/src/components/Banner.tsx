import React, { useRef, RefObject } from 'react';

interface BannerImage {
  src: string;
  alt: string;
}

const bannerImages1: BannerImage[] = [
  { src: 'https://im.uniqlo.com/global-cms/spa/resc5b0a35f54cf4d3a5aaca124d435dcf7fr.jpg', alt: 'Image 1' },
  { src: 'https://im.uniqlo.com/global-cms/spa/res80381e3fe1f34673d2f69e1a96c301c7fr.jpg', alt: 'Image 2' },
  { src: 'https://im.uniqlo.com/global-cms/spa/res32729866def52dca3a6240723c906febfr.jpg', alt: 'Image 3' },
  { src: 'https://im.uniqlo.com/global-cms/spa/rese6fcb67bcc2a0e5ab33062be2a20c3d4fr.jpg', alt: 'Image 1' },
  { src: 'https://im.uniqlo.com/global-cms/spa/resb4515e97ee4819d4a954da0ef54c04d2fr.jpg', alt: 'Image 1' },
];

const bannerImages2: BannerImage[] = [
  { src: 'https://im.uniqlo.com/global-cms/spa/resb4515e97ee4819d4a954da0ef54c04d2fr.jpg', alt: 'Image 4' },
  { src: 'https://im.uniqlo.com/global-cms/spa/resa1b4ce08a68b1102b176f314eb05b7b0fr.jpg', alt: 'Image 5' },
  { src: 'https://im.uniqlo.com/global-cms/spa/res88214096b9a1fed17fa9ced7f074d589fr.jpg', alt: 'Image 6' },
  { src: 'https://im.uniqlo.com/global-cms/spa/res214440cfdd1e45fa8edfff070a245dacfr.jpg', alt: 'Image 1' },
  { src: 'https://im.uniqlo.com/global-cms/spa/res464ad7880b4fda40e16713bfde601e9cfr.jpg', alt: 'Image 1' },
];

export const Banner: React.FC = () => {
  const scrollRef1: RefObject<HTMLDivElement> = useRef(null);
  const scrollRef2: RefObject<HTMLDivElement> = useRef(null);

  const scroll = (ref: RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full space-y-8">
      <div className="relative h-screen">
        <div className="flex space-x-4 overflow-x-hidden h-full scroll-smooth" ref={scrollRef1}>
          {bannerImages1.map((image, index) => (
            <div key={index} className="flex-shrink-0 h-full w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-gray-100 text-gray-900 p-2 rounded-r-lg shadow-lg"
          onClick={() => scroll(scrollRef1, 'left')}
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-gray-100 text-gray-900 p-2 rounded-l-lg shadow-lg"
          onClick={() => scroll(scrollRef1, 'right')}
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
  
      {/* Full-Page Banner 2 */}
      <div className="relative h-screen">
        <div className="flex space-x-4 overflow-x-hidden h-full scroll-smooth" ref={scrollRef2}>
          {bannerImages2.map((image, index) => (
            <div key={index} className="flex-shrink-0 h-full w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        {/* Controls */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-gray-100 text-gray-900 p-2 rounded-r-lg shadow-lg"
          onClick={() => scroll(scrollRef2, 'left')}
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-gray-100 text-gray-900 p-2 rounded-l-lg shadow-lg"
          onClick={() => scroll(scrollRef2, 'right')}
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
