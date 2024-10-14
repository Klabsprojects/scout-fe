import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';

const Gallery = () => {
  const { isTamil } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [layout, setLayout] = useState('masonry');

  const allImages = [
    ...mediaData.carouselImages,
    ...mediaData.featuredStories,
    ...mediaData.organizationImages,
    ...mediaData.newsImages,
    mediaData.whoWeAre.heroImage,
    mediaData.whoWeAre.videoPoster,
    mediaData.whoWeAre.banKiMoonImage,
    mediaData.scoutEducation.heroImage,
    mediaData.scoutEducation.educationImage1,
    mediaData.scoutEducation.educationImage2,
    mediaData.scoutEducation.videoPoster,
  ];

  const filteredImages = allImages.filter((_, index) => index !== 19);

  const translations = {
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
    <div className="min-h-screen bg-gray-100 pt-16 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col items-center mb-8 space-y-4 pt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={toggleLayout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {translations.layoutToggle[isTamil ? 'ta' : 'en']}
          </motion.button>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            className={`gap-4 ${
              layout === 'masonry'
                ? 'columns-1 sm:columns-2 md:columns-3 lg:columns-4'
                : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                className={`mb-4 ${layout === 'masonry' ? 'break-inside-avoid' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg cursor-pointer transition duration-300 hover:shadow-xl"
                  onClick={() => openLightbox(image)}
                  layoutId={`image-${index}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <motion.div 
              className="max-w-4xl max-h-full p-4"
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.img
                src={selectedImage}
                alt="Selected image"
                className="max-w-full max-h-[90vh] object-contain"
                layoutId={`image-${filteredImages.indexOf(selectedImage)}`}
              />
              <motion.button
                className="mt-4 bg-white text-black font-bold py-2 px-4 rounded"
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