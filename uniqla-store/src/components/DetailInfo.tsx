const DetailInfo: React.FC = () => {
  return (
    <div className="min-h-fit flex flex-col bg-gray-50 p-9"> 
      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start p-4 justify-center">
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:mr-6">
          <img
            src="https://im.uniqlo.com/global-cms/spa/res0bc226691c28569540e973a02214b137fr.jpg"
            alt="Uniqlo Storefront"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Uniqla</h2>
          <p className="text-gray-800 mb-6 text-lg leading-relaxed">
            Welcome to <strong>Uniqla</strong>, your destination for the latest fashion trends and quality apparel. Our curated selection of clothing and accessories is designed to elevate your wardrobe.
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Featured Products</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6 pl-5">
            <li><strong>Chic Summer Dresses</strong> - Embrace the sun with our stylish dresses perfect for any occasion.</li>
            <li><strong>Sleek Business Attire</strong> - Discover sophisticated options to make a lasting impression at work.</li>
            <li><strong>Casual Streetwear</strong> - Find trendy outfits for a stylish everyday look.</li>
          </ul>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Why Choose Us?</h3>
          <p className="text-gray-800 mb-6 text-lg leading-relaxed">
            At Uniqla, were dedicated to offering a great shopping experience with a focus on customer satisfaction. Our selected items reflect high standards of style and quality. Enjoy fast shipping and hassle-free returns.
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Contact Us</h3>
          <p className="text-gray-800 text-lg mb-4">
            Have questions or need assistance? Reach out to our customer support team at <strong>support@uniqla.com</strong> or call us at <strong>(123) 456-7890</strong>. Were here to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
