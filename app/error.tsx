'use client';

import { useEffect, FC } from 'react';
import EmptyState from './components/EmptyState';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <EmptyState
      title="Uh Oh!"
      subtitle="Sorry, we encountered an unexpected error."
    />
  );
};

export default ErrorState;
