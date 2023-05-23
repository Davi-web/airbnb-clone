import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const TripPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );

  const reservations = await getReservations({ userId: currentUser.id });
  if (reservations.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips Found"
          subtitle="Looks like you haven't reserved any tips."
        />
      </ClientOnly>
    );
  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripPage;
