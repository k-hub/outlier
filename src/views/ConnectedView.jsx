import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './Layout';
import Navigation from '../components/Navigation';

const menu = Navigation();

// export const MasterLayoutImpl = (props, WrappedComponent, pageName) => {
//   const layoutProps = {
//     menu,
//     pageName
//   };
//
//   return (
//     <Layout {...layoutProps}>
//       <WrappedComponent {...props} />
//     </Layout>
//   );
// }


function MasterLayoutHOC(WrappedComponent, pageName) {
  class MasterLayoutImpl extends Component {
    render() {

      const layoutProps = {
        menu,
        pageName
      };

      return (
        <Layout {...layoutProps}>
          <WrappedComponent {...this.props} />
        </Layout>
      );
    }
  }

  const mapStateToProps = state => state;

  const mapDispatchToProps = dispatch => ({
    dispatch
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(MasterLayoutImpl);
}

export default MasterLayoutHOC;
