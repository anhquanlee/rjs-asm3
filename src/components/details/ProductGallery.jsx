import { useState } from 'react';

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState('');

  const images = [
    product.img1,
    product.img2,
    product.img3,
    product.img4,
  ].filter(Boolean);

  return (
    <div className="flex min-w-0 items-center gap-4">
      <div className="flex w-18 shrink-0 flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="flex h-26.25 cursor-pointer items-center justify-center overflow-hidden"
          >
            <img
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center">
        <img
          src={selectedImage || product.img1}
          alt={product.name}
          className="max-h-135 w-full object-contain"
        />
      </div>
    </div>
  );
}

export default ProductGallery;
