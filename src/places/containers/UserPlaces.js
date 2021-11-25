import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CONFIG } from '../../constants/configuration';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().uid;
  const [loadedPlaces, setLoadedPlaces] = useState();

  const placeDeleteHandler = (deleteId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deleteId)
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await sendRequest(
          `${CONFIG.API_URL}/places/user/${userId}`
        );

        setLoadedPlaces(res.places);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;
