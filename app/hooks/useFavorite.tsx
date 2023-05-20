import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '../types';
import useLoginModal from './useLoginModal';

interface IUseFavoirte {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavoirte) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        toast.success('Success');
        router.refresh();
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, listingId, hasFavorited, loginModal, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
