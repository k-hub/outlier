import axios from 'axios';

const SERVICES_URL = 'https://api.spacexdata.com/v3';
const serviceUrl = `${SERVICES_URL}/rockets`;

const api = axios.create();

const getById = (rocketId) => api.get(`${serviceUrl}/${rocketId}`);

export const ACTIONS = {
  REQUEST_ROCKET: 'REQUEST_ROCKET',
  RECEIVE_ROCKET: 'RECEIVE_ROCKET'
};

export const requestRocket = () => ({
  type: ACTIONS.REQUEST_ROCKET
});

const receiveRocket = response => ({
  type: ACTIONS.RECEIVE_ROCKET,
  payload: {
    rockets: { [response.data.rocket_id]: response.data }
  }
});

export const fetchRocket = args => {
  const { dispatch, rocketId } = args;
  dispatch(requestRocket());
  return getById(rocketId).then(response => dispatch(receiveRocket(response)));
};

const shouldFetchRocket = (rocketCollection) => {
  let shouldFetch = false;
  if (!rocketCollection) {
    shouldFetch = true;
  }
  if (!rocketCollection.fetching) {
    shouldFetch = true;
  }

  return shouldFetch;
};

export const fetchRocketIfNeeded = ({ dispatch, rocketCollection, rocketId }) =>
  shouldFetchRocket({ rocketCollection, rocketId }) && fetchRocket({ dispatch, rocketId });
