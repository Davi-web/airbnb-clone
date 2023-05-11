'use client';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface CategoryBoxProps {
  key: string;
  label: string;
  description: string;
  selected: boolean;
  icon: IconType;
}

const CategoryBox: FC<CategoryBoxProps> = ({
  key,
  label,
  selected,
  icon: Icon,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    const query = new URLSearchParams(params?.toString());

    query.set('category', label);

    const url = `/?${query.toString()}`;

    router.push(url);
  }, [label, router, params]);
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? 'border-b-neutral-800' : 'border-transparent'
      } ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
