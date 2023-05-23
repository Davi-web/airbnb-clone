'use client';
import React, { FC } from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/container/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

interface FavoritesClientProps {
  favoritesListings: SafeListing[];
  currentUser: SafeUser | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  favoritesListings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="Your favorites" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favoritesListings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
