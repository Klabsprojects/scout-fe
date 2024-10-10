import React, { useState, useEffect } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';

// Dummy products array
const dummyProducts = [
    { id: 1, name: { en: 'Smartphone X', ta: 'ஸ்மார்ட்போன் X' }, price: 599.99, rating: 4.5, reviews: 120, inStock: true },
    { id: 2, name: { en: 'Laptop Pro', ta: 'லாப்டாப் ப்ரோ' }, price: 1299.99, rating: 4.8, reviews: 250, inStock: true },
    { id: 3, name: { en: 'Wireless Earbuds', ta: 'வயர்லெஸ் இயர்பட்ஸ்' }, price: 129.99, rating: 4.2, reviews: 180, inStock: true },
    { id: 4, name: { en: 'Smart Watch', ta: 'ஸ்மார்ட் வாட்ச்' }, price: 199.99, rating: 4.0, reviews: 150, inStock: true },
    { id: 5, name: { en: 'Digital Camera', ta: 'டிஜிட்டல் கேமரா' }, price: 449.99, rating: 4.6, reviews: 200, inStock: true },
    { id: 6, name: { en: 'Gaming Console', ta: 'கேமிங் கன்சோல்' }, price: 399.99, rating: 4.7, reviews: 300, inStock: true },
    { id: 7, name: { en: 'Bluetooth Speaker', ta: 'புளூடூத் ஸ்பீக்கர்' }, price: 79.99, rating: 4.1, reviews: 90, inStock: true },
    { id: 8, name: { en: 'Fitness Tracker', ta: 'ஃபிட்னெஸ் டிராக்கர்' }, price: 89.99, rating: 4.3, reviews: 110, inStock: true },
    { id: 9, name: { en: 'Tablet', ta: 'டேப்லெட்' }, price: 349.99, rating: 4.4, reviews: 160, inStock: true },
    { id: 10, name: { en: 'Smartwatch', ta: 'ஸ்மார்ட்வாட்ச்' }, price: 199.99, rating: 4.2, reviews: 140, inStock: true },
    { id: 11, name: { en: 'Wireless Mouse', ta: 'வயர்லெஸ் மவுஸ்' }, price: 29.99, rating: 4.0, reviews: 80, inStock: true },
    { id: 12, name: { en: 'External Hard Drive', ta: 'வெளிப்புற ஹார்ட் டிரைவ்' }, price: 89.99, rating: 4.5, reviews: 170, inStock: true },
    { id: 13, name: { en: 'Portable Charger', ta: 'போர்ட்டபிள் சார்ஜர்' }, price: 49.99, rating: 4.3, reviews: 130, inStock: true },
    { id: 14, name: { en: 'Smart Home Hub', ta: 'ஸ்மார்ட் ஹோம் ஹப்' }, price: 129.99, rating: 4.1, reviews: 100, inStock: true },
    { id: 15, name: { en: 'Wireless Keyboard', ta: 'வயர்லெஸ் கீபோர்ட்' }, price: 59.99, rating: 4.2, reviews: 95, inStock: true },
  ];
  
const Products = () => {
  const { isTamil } = useTranslation();
  const [products, setProducts] = useState(dummyProducts);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // State for the selected product
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  // Effect for filtering and sorting products
  useEffect(() => {
    let result = [...products];
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name[isTamil ? 'ta' : 'en'].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    switch (sortBy) {
      case 'priceLowToHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setProducts(result);
  }, [searchTerm, sortBy, isTamil]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (product) => {
    setSnackbarMessage(isTamil ? `${product.name.ta} கூடைக்கு சேர்க்கப்பட்டது` : `${product.name.en} added to cart`);
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 3000);
  };

  const handleSeeMore = () => {
    setVisibleProducts(products.length);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const translations = {
    en: {
      title: 'Our Products',
      search: 'Search products...',
      sort: 'Sort by',
      popularity: 'Popularity',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      rating: 'Rating',
      addToCart: 'Add to Cart',
      seeMore: 'See More',
      reviews: 'reviews',
      viewProduct: 'View Product', // New translation for view product
    },
    ta: {
      title: 'எங்கள் தயாரிப்புகள்',
      search: 'தயாரிப்புகளைத் தேடுங்கள்...',
      sort: 'வரிசைப்படுத்து',
      popularity: 'பிரபலம்',
      priceLowToHigh: 'விலை: குறைந்தது முதல் அதிகம் வரை',
      priceHighToLow: 'விலை: அதிகம் முதல் குறைந்தது வரை',
      rating: 'மதிப்பீடு',
      addToCart: 'கூடைக்கு சேர்',
      seeMore: 'மேலும் காண்க',
      reviews: 'மதிப்புரைகள்',
      viewProduct: 'தயாரிப்பைப் பார்க்கவும்', // Tamil translation for view product
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  return (
    <div className="pt-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">{t.title}</h1>
        
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-2/3 p-2 border rounded mb-4 md:mb-0"
          />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full md:w-1/3 p-2 border rounded"
          >
            <option value="popularity">{t.popularity}</option>
            <option value="priceLowToHigh">{t.priceLowToHigh}</option>
            <option value="priceHighToLow">{t.priceHighToLow}</option>
            <option value="rating">{t.rating}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleProducts).map((product, index) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                src={mediaData.carouselImages[index % mediaData.carouselImages.length]}
                alt={product.name[isTamil ? 'ta' : 'en']}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2">{product.name[isTamil ? 'ta' : 'en']}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">({product.reviews} {t.reviews})</span>
                </div>
                <p className="text-xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full mr-2 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
                  >
                    <i className="fas fa-cart-plus mr-2"></i> {t.addToCart}
                  </button>
                  <button 
                    onClick={() => handleViewProduct(product)}
                    className="w-full px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
                  >
                    <i className="fas fa-eye mr-2"></i> {t.viewProduct}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSeeMore}
              className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
            >
              {t.seeMore}
            </button>
          </div>
        )}
      </div>

      {snackbarOpen && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {snackbarMessage}
        </div>
      )}

      {/* Modal for product details */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.name[isTamil ? 'ta' : 'en']}</h2>
            <img 
              src={mediaData.carouselImages[0]} 
              alt={selectedProduct.name[isTamil ? 'ta' : 'en']} 
              className="w-full h-48 object-cover mb-4" 
            />
            <p className="text-lg mb-4">Price: ₹{selectedProduct.price.toFixed(2)}</p>
            <p className="mb-4">Description: {selectedProduct.description[isTamil ? 'ta' : 'en']}</p>
            <button onClick={closeModal} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
