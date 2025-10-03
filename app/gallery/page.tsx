'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Grid3X3, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: '/images/1.jpg',
    alt: 'Timber Yard - Wood Planks Stack',
    title: 'Timber Yard Overview',
    description: 'Our main timber yard with organized wood plank stacks'
  },
  {
    id: 2,
    src: '/images/2.jpg',
    alt: 'Quality Wood Selection',
    title: 'Premium Wood Selection',
    description: 'Carefully selected premium timber for construction'
  },
  {
    id: 3,
    src: '/images/3.jpg',
    alt: 'Wood Processing Facility',
    title: 'Processing Facility',
    description: 'State-of-the-art wood processing and cutting facility'
  },
  {
    id: 4,
    src: '/images/4.jpg',
    alt: 'Timber Storage Area',
    title: 'Storage Area',
    description: 'Organized storage area for different wood types'
  },
  {
    id: 5,
    src: '/images/5.jpg',
    alt: 'Finished Wood Products',
    title: 'Finished Products',
    description: 'Ready-to-use timber products for construction'
  }
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Gallery</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our timber yard, processing facility, and quality wood products
            </p>
            <Badge className="mt-4 bg-primary/20 text-primary border-primary/30">
              {galleryImages.length} Images
            </Badge>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{image.title}</h3>
                  <p className="text-gray-600 text-sm">{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Image */}
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="font-semibold text-lg mb-1">{galleryImages[currentIndex].title}</h3>
              <p className="text-sm opacity-90">{galleryImages[currentIndex].description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs opacity-75">
                  {currentIndex + 1} of {galleryImages.length}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in Our Timber Products?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your timber requirements and get a personalized quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <a href="/calculator">Get Quote</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}