'use client';
import React, { FC, useCallback, useMemo } from 'react';
import type { Listing, Reservation } from '@prisma/client';
import Image from 'next/image';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import useCountries from '@/app/hooks/useCountries';

interface ListingCardProps {
  listing: Listing;
  reservation: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  listing,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(listing.locationValue);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return listing.price;
  }, [reservation, listing.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);
  return (
    <div
      key={listing.id}
      className="relative w-full h-80 rounded-lg overflow-hidden"
    >
      <Image
        key={listing.id}
        src={listing.imageSrc}
        alt={listing.title}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
        <div className="text-white font-semibold text-lg">{listing.title}</div>
      </div>
    </div>
  );
};

export default ListingCard;
