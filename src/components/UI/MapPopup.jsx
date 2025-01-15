import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopup, removePopup } from "../../store/mapStore";
import { Popup } from "react-map-gl";

export default function MapPopup() {
  const { show, latitude, longitude, content } = useSelector((state) =>
    getPopup(state),
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(removePopup());
  };
  return (
    <Fragment>
      {show && (
        <Popup
          style={{
            color: "black",
          }}
          latitude={latitude}
          longitude={longitude}
          onClose={handleClose}
          closeOnClick={false}>
          {content}
        </Popup>
      )}
    </Fragment>
  );
}
