import { ACTIONS } from '../actions/Rocket';

const initialState = {
  rockets: {},
  fetching: false
};

const actionHandlers = {
  [ACTIONS.REQUEST_ROCKET]: ({ state }) => ({
    ...state,
    fetching: true
  }),
  [ACTIONS.RECEIVE_ROCKET]: ({ state, action }) => ({
    ...state,
    fetching: false,
    rockets: { ...state.rockets, ...action.payload.rockets }
  })
};

export default (state = initialState, action) =>
  actionHandlers[action.type] ? actionHandlers[action.type]({ state, action }) : state;
