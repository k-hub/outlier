import React, { Component } from 'react';
import ConnectedView from './ConnectedView';
import { fetchLaunchesIfNeeded } from '../actions/Launches';
import Launch from '../components/Launch';
import { fetchRocketIfNeeded } from '../actions/Rocket';

class LaunchesView extends Component {
  componentDidMount() {
    const { dispatch, launchCollection } = this.props;
    fetchLaunchesIfNeeded({ dispatch, launchCollection });
  }

  getContent() {
    const { launchCollection, rocketCollection } = this.props;

    if (!launchCollection || launchCollection.fetching) {
      return <div> LOADING </div>;
    }

    if (!launchCollection.launches.length) {
      return <div> NO DATA </div>;
    }

    const retrievedLaunches = launchCollection.launches;
    const launches = [];

    for (let i = 0; i < retrievedLaunches.length; i++) {
      const launch = retrievedLaunches[i];
      const rocketId = launch.rocket.rocket_id;
      const rocket = rocketCollection.rockets[rocketId];

      launches.push(
        <Launch
          key={launch.flight_number}
          {...{
          launch,
          rocket,
          fetchRocket: () => this.fetchRocket(rocketId)
        }} />
      )
    }

    return launches;
  }

  fetchRocket(rocketId) {
    const { dispatch, rocketCollection } = this.props;
    fetchRocketIfNeeded({ dispatch, rocketCollection, rocketId });
  }

  render() {
    return (
      <div>
        <h2> SpaceX launches </h2>
        <ul>
          {this.getContent()}
        </ul>
      </div>
    );
  }
}

export default ConnectedView(LaunchesView, 'launches');
