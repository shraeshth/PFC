import React, { useState } from 'react';

const CloudinaryImageFetcher = () => {
  // Step 1: Replace with your actual Cloudinary cloud name
  const CLOUD_NAME = 'dbk50pszr'; // Replace this!
  
  // Step 2: State for managing images
  const [publicId, setPublicId] = useState('sample'); // Default Cloudinary sample image
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Step 3: Function to construct Cloudinary URL
  const getCloudinaryUrl = (publicId, transformations = '') => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}${publicId}`;
  };

  // Step 4: Handle image loading states
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  // Step 5: Reset states when changing image
  const handlePublicIdChange = (newPublicId) => {
    setImageLoaded(false);
    setImageError(false);
    setPublicId(newPublicId);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Cloudinary Image Fetcher</h2>
      
      {/* Step 6: Input to test different images */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Image Public ID:
        </label>
        <input
          type="text"
          value={publicId}
          onChange={(e) => handlePublicIdChange(e.target.value)}
          placeholder="Enter image public ID"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Step 7: Quick test buttons */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => handlePublicIdChange('sample')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Sample Image
        </button>
        <button
          onClick={() => handlePublicIdChange('your-image-id')}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          Your Image
        </button>
      </div>

      {/* Step 8: Image display with loading/error states */}
      <div className="relative">
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Loading image...</span>
          </div>
        )}

        {/* Error state */}
        {imageError && (
          <div className="w-full h-48 bg-red-100 rounded-lg flex items-center justify-center border-2 border-red-300">
            <span className="text-red-600">Failed to load image</span>
          </div>
        )}

        {/* Actual image */}
        <img
          src={getCloudinaryUrl(publicId, 'w_400,h_300,c_fill,q_auto,f_auto/')}
          alt={`Cloudinary image: ${publicId}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ 
            display: imageLoaded ? 'block' : 'none',
            width: '100%',
            height: 'auto',
            borderRadius: '8px'
          }}
        />
      </div>

      {/* Step 9: Display current URL for debugging */}
      <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
        <strong>Current URL:</strong>
        <br />
        <span className="break-all text-blue-600">
          {getCloudinaryUrl(publicId, 'w_400,h_300,c_fill,q_auto,f_auto/')}
        </span>
      </div>

      {/* Step 10: Instructions */}
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Instructions:</strong></p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Replace 'your-cloud-name' with your actual Cloudinary cloud name</li>
          <li>Upload an image to Cloudinary and note its public ID</li>
          <li>Enter the public ID in the input above</li>
          <li>The image will automatically load with optimizations</li>
        </ol>
      </div>
    </div>
  );
};

export default CloudinaryImageFetcher;