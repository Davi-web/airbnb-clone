import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Container from './components/container/Container';
import EmptyState from './components/EmptyState';
import type { Listing } from '@prisma/client';
import ListingCard from './components/listings/ListingCard';

import getListings from './actions/getListings';
import getCurrentUser from './actions/getCurrentUser';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: Listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
