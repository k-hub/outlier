import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Launch = (props) => {
  const { launch, fetchRocket, rocket } = props;

  return (
    <li onClick = {fetchRocket} key={launch.flight_number}>
      <h2>{ launch.mission_name }</h2>
      <div>{ launch.rocket.rocket_name }</div>
      <div>{ launch.rocket.rocket_id }</div>
      { rocket &&  <div>
        <div>rocket { rocket.cost_per_launch }</div>
        <div>
          { rocket.flickr_images.map((url) =>
            <img height="50px"
              style={{padding: '20px', border: '2px solid black'}}
              src={url}
              key={url}
              alt={rocket.rocket_name}/>
            )
          }
        </div>
      </div> }
    </li>
  );
}

Launch.propTypes = {
  launch: PropTypes.object,
  fetchRocket: PropTypes.func,
  rocket: PropTypes.object
}

export default Launch;
