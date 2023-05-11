'use client';
import { FC, useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onUpload, value }) => {
  const handleUpload = useCallback(
    (url: any) => {
      onUpload(url.info.secure_url);
    },
    [onUpload]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="awbbfn0x"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition:border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Upload Image</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
