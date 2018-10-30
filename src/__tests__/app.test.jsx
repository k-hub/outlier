import React from 'react';
import { Provider } from "react-redux";
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import Routes from '../routes';
import Launch from '../components/Launch';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});

function setup() {
  const props = {
    launch: {
      'mission_name': 'test mission name',
      'rocket': {
        'rocket_id': 'test rocket ID',
        'rocket_name': 'test rocket name'
      }
    },
    fetchRocket: jest.fn(),
    rocket: {
      'cost_per_launch': 100000,
      'flickr_images': ['test-url.com', 'test-url-2.com']
    }
  }

  const enzymeWrapper = shallow(<Launch {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('app', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  });
});

describe('components', () => {
  describe('Launch', () => {
    it('should render self', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find('h2').text()).toBe('test mission name');
    })
  })
});
