import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );

  const listings = await getListings({ userId: currentUser.id });
  if (listings.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties Found"
          subtitle="Looks like you haven't created any listings."
        />
      </ClientOnly>
    );
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
