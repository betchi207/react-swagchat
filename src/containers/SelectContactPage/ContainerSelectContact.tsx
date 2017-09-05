import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IRoom,
  State,
  store,
  IUserState,
  IRoomState,
  IStyleState,
  ISettingState,
  clearSelectContactsActionDispatch,
  combinedCreateRoomAndMessagesFetchRequestActionDispatch,
  combinedAssetPostAndRoomCreateAndMessageFetchRequestActionDispatch,
  } from 'swagchat-sdk';

import {
  TopBar,
  ContactList,
  Button,
  Modal,
  RoomEdit,
} from '../../components';

export interface IReduxSelectContactProps extends RouteComponentProps<any> {
  title: string;
  userState: IUserState;
  roomState: IRoomState;
  styleState: IStyleState;
  settingState: ISettingState;
  selectContactTitle: string;
  noContactListText: string;
  noContactListImage: string;
  roomListRoutePath: string;
}

class ReduxSelectContact extends React.Component<IReduxSelectContactProps, {}> {
  private _createRoomModalView: Modal | null;

  componentWillUnmount() {
    clearSelectContactsActionDispatch();
  }

  onCloseButton() {
    if (this.props.history) {
      store.dispatch(push(this.props.roomListRoutePath));
    }
  }

  onOkButton() {
    const room: IRoom = {
      userId: this.props.userState.userId,
      type: 0, // Update in saga
      name: '',
    };
    combinedCreateRoomAndMessagesFetchRequestActionDispatch(room);
    this._createRoomModalView ? this._createRoomModalView.onModalClick() : null;
  }

  onRoomCreateOkClick = () => {
    combinedAssetPostAndRoomCreateAndMessageFetchRequestActionDispatch();
  }

  render(): JSX.Element {
    const { selectContactTitle, userState, roomState, noContactListText, noContactListImage} = this.props;
    return (
      <div>
        <TopBar
          title={selectContactTitle}
          leftButton={<Button icon={<i className="material-icons">close</i>} onClick={this.onCloseButton.bind(this)} />}
          rightButton={<Button icon={<i className="material-icons">done</i>} onClick={this.onOkButton.bind(this)} />}
        />
        <ContactList
          contacts={userState.contacts}
          selectedContacts={userState.selectContacts}
          noContactListText={noContactListText}
          noContactListImage={noContactListImage}
          style={{marginTop: '47px'}}
        />
        <Modal
          ref={(child) => this._createRoomModalView = child}
          title="グループ情報登録"
          component={
            <RoomEdit
              roomName={roomState.updateName}
              roomPictureUrl={roomState.updatePictureUrl}
            />
          }
          onOkModalClick={this.onRoomCreateOkClick.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  if (state.client.client && state.user.user) {
    return {
      userState: state.user,
      roomState: state.room,
      styleState: state.style,
      settingState: state.setting,
      selectContactTitle: state.setting.selectContactTitle,
      noContactListText: state.setting.noContactListText,
      noContactListImage: state.setting.noContactListImage,
      roomListRoutePath: state.setting.roomListRoutePath,
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IReduxSelectContactProps) => {
  ownProps; // TODO
  dispatch; // TODO
  return {};
};

export const ContainerSelectContact = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxSelectContact);
