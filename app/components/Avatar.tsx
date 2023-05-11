'use client';
import { FC } from 'react';
import Image from 'next/image';
interface AvatarProps {
  src?: string | null;
}
const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="avatar"
      src={src || '/images/placeholder.jpg'}
    />
  );
};

export default Avatar;
