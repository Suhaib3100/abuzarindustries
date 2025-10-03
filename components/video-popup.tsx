'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function VideoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoClick = () => {
    setShowControls(!showControls);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-4xl mx-4 bg-white shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary/10 to-accent/10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome to</h2>
              <h3 className="text-3xl font-bold text-primary">Abuzar Industries</h3>
              <p className="text-sm text-gray-600 mt-1">Premium Timber Solutions</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Video Container */}
          <div className="relative bg-black">
            <video
              className="w-full h-auto max-h-[60vh] object-cover"
              controls={showControls}
              muted={isMuted}
              autoPlay
              loop
              onClick={handleVideoClick}
            >
              <source src="/videos/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Controls Overlay */}
            {!showControls && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={togglePlay}
                    className="bg-white/90 hover:bg-white text-gray-900"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={toggleMute}
                    className="bg-white/90 hover:bg-white text-gray-900"
                  >
                    {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                Experience our premium timber quality and professional service
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleClose}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Explore Our Products
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="border-accent text-accent hover:bg-accent hover:text-white"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
