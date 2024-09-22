// components/Banner.js
import Link from 'next/link';

const Banner = () => {
  return (
    <div className="relative w-auto h-screen overflow-hidden mb-8">
      {/* Background Image */}
      <img
        src="https://im.uniqlo.com/global-cms/spa/res5292afa7d8325cb3d9a723b3e553f109fr.jpg"
        alt="Banner Image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay and Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-4">
        <div className="text-white max-w-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">UNIQLA</h1>
          <Link href="/products">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                SHOP NOW
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
