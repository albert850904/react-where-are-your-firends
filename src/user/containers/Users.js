import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../components/UsersList';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await sendRequest(
          'http://192.168.17.3:5000/api/users'
        );

        setLoadedUser(response.users);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && <UsersList items={loadedUser} />}
    </>
  );
};

export default Users;
