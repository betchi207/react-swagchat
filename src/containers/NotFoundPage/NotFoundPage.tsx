import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as styles from './not-found-page.css';

export interface IProps extends RouteComponentProps<any> {
}
export class ReduxNotFoundPage extends React.Component<IProps, {}> {
  render() {
    return (
      <div className={styles.root}>
        <p>Page Not Found.</p>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IProps) => {
  dispatch; // TODO
  ownProps; // TODO
  return {};
};

export const NotFoundPage = connect(
  null,
  mapDispatchToProps
)(ReduxNotFoundPage);
