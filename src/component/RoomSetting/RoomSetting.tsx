import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import NotificationsActiveIcon from 'material-ui-icons/NotificationsActive';
// import NotificationsOffIcon from 'material-ui-icons/NotificationsOff';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { LinearProgress } from 'material-ui/Progress';
import {
  State, Client, IUser, Room, routerHistory,
  fetchRoomRequestActionCreator, FetchRoomRequestAction,
  RoomActions,
  RoomType,
  opponentUser,
  generateRoomName,
} from 'swagchat-sdk';
import { SwagAvatar } from '../SwagAvatar';
import { AddRoomMemberListItem } from './AddRoomMemberListItem';
import { RoomMemberListItem } from './RoomMemberListItem';
import { LeftRoomListItem } from './LeftRoomListItem';
import {
  MIN_WIDTH,
  BORDER_COLOR,
  ICON_SIZE,
  APP_BAR_HEIGHT,
} from '../../setting';

type positionType = 'fixed';
type justifyContentType = 'space-around';
type overflowYType = 'scroll';

const styles = (theme: Theme) => ({
  root: {
    minWidth: MIN_WIDTH,
  },
  appBar: {
    width: '100%',
    height: APP_BAR_HEIGHT,
    left: 0,
    background: theme.palette.common.white,
    borderBottom: '1px solid ' + BORDER_COLOR,
  },
  toolbar: {
    minHeight: APP_BAR_HEIGHT,
    justifyContent: 'center' as justifyContentType,
    // paddingLeft: 10,
  },
  toolbarButton: {
    width: 40,
    height: 40,
  },
  toolbarIcon: {
    width: ICON_SIZE,
    margin: '0 5px',
  },
  typography: {
    flex: 1,
    textAlign: 'center',
  },
  content: {
    paddingTop: APP_BAR_HEIGHT,
    position: 'relative' as positionType,
    overflowY: 'scroll' as overflowYType,
  },
  listItemIcon: {
    color: theme.palette.primary.main,
  },
});

type ClassNames = 
  'root' |
  'appBar' |
  'toolbar' |
  'toolbarButton' |
  'toolbarIcon' |
  'typography' |
  'content' |
  'listItemIcon'
;

interface MapStateToProps {
  client: Client | null;
  room: Room | null;
  user: IUser | null;
  currentRoomId: string;
  currentRoomName: string;
}

interface MapDispatchToProps {
  fetchRoomRequest: (roomId: string) => FetchRoomRequestAction;
}

export interface RoomSettingProps {
  width?: number;
  top?: number;
  left?: number;
  right?: number;
}

const OneOnOneContent = withStyles(styles)<MapStateToProps & MapDispatchToProps & RoomSettingProps>(
  (props: MapStateToProps & MapDispatchToProps & RoomSettingProps & WithStyles<ClassNames>) => {
    const { classes, room, user } = props;

    if (room === null || user === null) {
      return <LinearProgress />;
    }

    const dmUser = opponentUser(room.users!, user.userId);
    if (dmUser === null || dmUser.length === 0) {
      return <LinearProgress />;
    }

    return (
      <div className={classes.content}>
        <RoomMemberListItem key={dmUser[0].userId} enableRemoveIcon={false} userForRoom={dmUser[0]} />
        <List subheader={<ListSubheader component="div">設定</ListSubheader>}>
          <ListItem disableGutters={true} key="room-setting-notifications" button={true}>
            <IconButton className={classes.listItemIcon}><NotificationsActiveIcon /></IconButton>
            <ListItemText primary="このルームの通知をオフにする" />
          </ListItem>
          <LeftRoomListItem />
        </List>
      </div>
    );
  }
);

const NotOneOnOneContent = withStyles(styles)<MapStateToProps & MapDispatchToProps & RoomSettingProps>(
  (props: MapStateToProps & MapDispatchToProps & RoomSettingProps & WithStyles<ClassNames>) => {
    const { classes, room, user } = props;

    if (room === null || user === null) {
      return <LinearProgress />;
    }

    let avatarData = {pictureUrl: room.pictureUrl, name: room.name};
    const dmUser = opponentUser(room.users!, user.userId);
    if (room.type === RoomType.ONE_ON_ONE && room.users !== undefined && room.users !== null) {
      if (dmUser !== null) {
        avatarData.pictureUrl = dmUser[0].pictureUrl;
        avatarData.name = dmUser[0].name;
      }
    }

    return (
      <div className={classes.content}>
      <ListItem
        key={room.roomId}
        button={true}
      >
        <SwagAvatar data={avatarData} />
        <ListItemText primary={room.name === '' ? generateRoomName(room.users!, user.userId) : room.name} />
      </ListItem>
      <div>
        <Divider />
        <List subheader={<ListSubheader component="div">メンバー管理</ListSubheader>}>
          <AddRoomMemberListItem />
          {room.users !== null
            ? Object.keys(room.users).map((key: string) => (
              <RoomMemberListItem key={key} enableRemoveIcon={true} userForRoom={room.users![key]} />
            ))
            : null
          }
        </List>
      </div>
      <Divider />
      <List subheader={<ListSubheader component="div">設定</ListSubheader>}>
        <ListItem disableGutters={true} key="room-setting-notifications" button={true}>
          <IconButton className={classes.listItemIcon}><NotificationsActiveIcon /></IconButton>
          <ListItemText primary="このルームの通知をオフにする" />
        </ListItem>
        <LeftRoomListItem />
      </List>
    </div>
    );
  }
);

class RoomSettingComponent
    extends React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & RoomSettingProps, {}> {
  componentDidMount() {
    if (this.props.client !== null && this.props.room === null && this.props.currentRoomId !== '') {
      this.props.fetchRoomRequest(this.props.currentRoomId);
    }
  }

  componentDidUpdate(prevProps: MapStateToProps, prevState: {}) {
    if (this.props.client !== null && this.props.room === null && this.props.currentRoomId !== '') {
      this.props.fetchRoomRequest(this.props.currentRoomId);
    }
  }

  handleBackClick = () => {
    routerHistory.goBack();
  }

  render() {
    const {
      classes, width, top, left, right,
      room, user,
    } = this.props;

    if (room === null || user === null) {
      return <LinearProgress />;
    }

    const leftVar = left !== undefined ? left : 0; 
    const rightVar = right !== undefined ? right : 0; 

    const calcWidth = width !== undefined ? width + 'px' : '100%';
    const widthStyle = width !== undefined ? {width: width} : {};
    const topStyle = top !== undefined ? {marginTop: top} : {};
    const appBarleftRightStyle = left !== undefined || right !== undefined ?
      {marginLeft: leftVar, width: `calc(${calcWidth} - ${leftVar}px - ${rightVar}px)`} : {};
    const appBarStyle = Object.assign(widthStyle, topStyle, appBarleftRightStyle);

    return (
      <div className={classes.root} style={left ? {width: `calc(100% - ${left}px)`} : {}}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={appBarStyle}
        >
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <IconButton
              className={classes.toolbarButton}
              color="primary"
              onClick={this.handleBackClick}
            >
              <KeyboardArrowLeftIcon className={classes.toolbarIcon} />
            </IconButton>
            <Typography variant="subheading" className={classes.typography}>
              {room.type === RoomType.ONE_ON_ONE ? 'ダイレクトメール設定' : 'ルーム設定'}
            </Typography>
            <IconButton
              className={classes.toolbarButton}
              color="primary"
            />
          </Toolbar>
        </AppBar>
        {room.type === RoomType.ONE_ON_ONE
          ? <OneOnOneContent {...this.props} />
          : <NotOneOnOneContent {...this.props} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: RoomSettingProps) => {
  return {
    client: state.client.client,
    room: state.room.room,
    user: state.user.user,
    currentRoomId: state.client.currentRoomId,
    currentRoomName: state.client.currentRoomName,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RoomActions>, ownProps: RoomSettingProps) => {
  return {
    fetchRoomRequest: (roomId: string) => dispatch(fetchRoomRequestActionCreator(roomId)),
  };
};

export const RoomSetting = connect<MapStateToProps, MapDispatchToProps, RoomSettingProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RoomSettingComponent));