import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';

const Gallery = () => {
  const { isTamil } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [layout, setLayout] = useState('masonry');

  // Create a curated list of 20 images from different sections
  const galleryImages = [
    // Carousel Images (4)
    ...mediaData.carouselImages,
    // Featured Stories (3)
    ...mediaData.featuredStories,
    // Organization Images (3)
    ...mediaData.organizationImages,
    // News Images (5)
    ...mediaData.newsImages,
    // Who We Are Images (2)
    mediaData.whoWeAre.heroImage,
    mediaData.whoWeAre.banKiMoonImage,
    // Scout Education Images (3)
    mediaData.scoutEducation.heroImage,
    mediaData.scoutEducation.educationImage1,
    mediaData.scoutEducation.educationImage2,
  ].slice(0, 20);

  const translations = {
    title: {
      en: "Scout Gallery",
      ta: "சாரணர் படத்தொகுப்பு"
    },
    subtitle: {
      en: "Capturing moments of leadership, adventure, and service",
      ta: "தலைமைத்துவம், சாகசம் மற்றும் சேவையின் தருணங்களைப் பிடித்தல்"
    },
    layoutToggle: {
      en: "Change Layout",
      ta: "அமைப்பை மாற்று",
    },
    close: {
      en: "Close",
      ta: "மூடு",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
  };

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const toggleLayout = () => {
    setLayout(layout === 'masonry' ? 'grid' : 'masonry');
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-16 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {translations.title[isTamil ? 'ta' : 'en']}
          </h1>
          <p className="text-xl text-gray-600">
            {translations.subtitle[isTamil ? 'ta' : 'en']}
          </p>
        </motion.div>

        {/* Layout Toggle Button */}
        <motion.div 
          className="flex flex-col items-center mb-8 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={toggleLayout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {translations.layoutToggle[isTamil ? 'ta' : 'en']}
          </motion.button>
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            className={`gap-4 ${
              layout === 'masonry'
                ? 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-4'
                : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className={`${
                  layout === 'masonry' 
                    ? 'break-inside-avoid mb-4' 
                    : 'aspect-w-4 aspect-h-3'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="relative group overflow-hidden rounded-lg shadow-lg">
                  <motion.img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                    onClick={() => openLightbox(image)}
                    layoutId={`image-${index}`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}
          >
            <motion.div 
              className="relative max-w-4xl max-h-[90vh] mx-auto"
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedImage}
                alt="Selected image"
                className="w-full h-full object-contain rounded-lg"
                layoutId={`image-${galleryImages.indexOf(selectedImage)}`}
              />
              <motion.button
                className="absolute top-4 right-4 bg-white text-black font-bold py-2 px-4 rounded-full shadow-lg"
                onClick={closeLightbox}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations.close[isTamil ? 'ta' : 'en']}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;