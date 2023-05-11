'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
interface LogoProps {
  children: React.ReactNode;
}

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      alt="logo"
      src="/images/logo.png"
      width={100}
      height={100}
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
