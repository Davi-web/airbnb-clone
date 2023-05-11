'use client';
import Container from '../container/Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { BsSnow } from 'react-icons/bs';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import CategoryBox from '../CategoryBox';
import { useSearchParams, usePathname } from 'next/navigation';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is 100m from the beach',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is 100m from the windmills',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern and luxurious',
  },
  {
    label: 'Country',
    icon: TbMountain,
    description: 'This property is in the countryside',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This property has a pool',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is 100m from the lake',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing nearby',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in a castle',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property has camping nearby',
  },
  {
    label: 'Artic',
    icon: BsSnow,
    description: 'This property has camping nearby',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is near a cave',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property in a farm',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is luxurious',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isHome = pathname === '/';
  if (!isHome) return null;
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={item.label === category}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
