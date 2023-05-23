import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavoriteListings();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please log in." />
      </ClientOnly>
    );
  }

  if (favoriteListings.length === 0) {
    <ClientOnly>
      <EmptyState
        title="No favorites Found"
        subtitle="Looks like you have no listings."
      />
    </ClientOnly>;
  }
  return (
    <ClientOnly>
      <FavoritesClient
        favoritesListings={favoriteListings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
