import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../../shared/components/UIElements/Card';

import Button from '../../shared/components/UIElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

import './PlaceItem.css';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleMapHandler = () => {
    setShowMap((prevState) => !prevState);
  };

  const toggleDeleteWarningHandler = () => {
    setShowConfirmModal((prevState) => !prevState);
  };

  const confirmDeleteHandler = async () => {
    toggleDeleteWarningHandler();
    try {
      await sendRequest(
        `http://192.168.17.3:5000/api/places/${props.id}`,
        'DELETE'
      );
      props.onDelete(props.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={showMap}
        onCancel={toggleMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={toggleMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={toggleDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={toggleDeleteWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELTE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place, Please note that it cant
          be undone thereafter
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.desc}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={toggleMapHandler}>
              View on Map
            </Button>
            {authCtx.userId === props.createId && (
              <Button to={`/places/${props.id}`}>Edit Place</Button>
            )}
            {authCtx.userId === props.createId && (
              <Button danger onClick={toggleDeleteWarningHandler}>
                Delete Place
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

PlaceItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  createId: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlaceItem;
