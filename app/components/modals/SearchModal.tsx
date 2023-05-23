'use client';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearchModel';
import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Range } from 'react-date-range';
import LocationInput, { CountrySelectValue } from '../inputs/LocationInput';
import qs from 'query-string';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import CounterInput from '../inputs/CounterInput';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchModal();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();
    let query: any = {};
    if (params) {
      query = qs.parse(params.toString());
    }

    let updatedQuery = {
      ...query,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate && dateRange.endDate) {
      updatedQuery.startDate = dateRange.startDate.toISOString();
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = dateRange.endDate.toISOString();
    }
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
    router,
    searchModal,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return 'Cancel';
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Explore the world with us"
      />
      <LocationInput
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you want to go?" subtitle="Choose the dates" />
        <Calendar
          value={dateRange}
          onChange={(item) => setDateRange(item.selection)}
        />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="How many people are you?" subtitle="Choose the dates" />
        <CounterInput
          title="Guests"
          subtitle="How mant Guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <CounterInput
          title="Rooms"
          subtitle="How mant Rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <CounterInput
          title="Bathrooms"
          subtitle="How mant bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Search Modal"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
