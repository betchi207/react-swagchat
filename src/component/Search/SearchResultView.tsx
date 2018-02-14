import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import SwipeableViews from 'react-swipeable-views';
import { TabContainer } from '../TabContainer';
import ListSubheader from 'material-ui/List/ListSubheader';
import {
  State,
  setSearchResultTabIndexActionCreator,
  SetSearchResultTabIndexAction,
  MessageActions,
  IMessage,
  IUserForRoom,
} from 'swagchat-sdk';
import { TextFlatItem } from '../../addons/messages/Text/TextFlatItem';
import { TAB_HEIGHT } from '../../setting';

type fontWeightType = 'bold';

const styles = (theme: Theme) => ({
  progress: {
    marginTop: 50,
  },
  swipeableViews: {
    textAlign: 'center',
    width: '100%',
    marginBottom: TAB_HEIGHT + 12,
  },
  listSubheader: {
    textAlign: 'left',
    fontWeight: 'bold' as fontWeightType,
    height: 25,
    lineHeight: '25px',
  },
});

type ClassNames = 
  'progress' |
  'swipeableViews' |
  'listSubheader'
;

interface MapStateToProps {
  searchResultTabIndex: number;
  currentUserId: string;
  messages: {[key: string]: IMessage};
  roomUsers: {[key: string]: IUserForRoom} | null;
}

interface MapDispatchToProps {
  setSearchResultTabIndex: (searchResultTabIndex: number) => SetSearchResultTabIndexAction;
}

export interface SearchResultViewProps {
  top?: number;
  left?: number;
  width?: number;
}

class SearchResultViewComponent extends
    React.Component<WithStyles<ClassNames> & MapStateToProps & MapDispatchToProps & SearchResultViewProps, {}> {
  state = {
    tabIndex: 0,
  };

  handleTabChangeIndex = (index: number) => {
    this.props.setSearchResultTabIndex(index);
  }

  render() {
    const { classes, searchResultTabIndex, currentUserId, messages, roomUsers } = this.props;

    return (
      <SwipeableViews
        axis="x"
        index={searchResultTabIndex}
        onChangeIndex={this.handleTabChangeIndex}
        className={classes.swipeableViews}
      >
        <TabContainer dir="ltr">
          <ListSubheader className={classes.listSubheader}>メッセージ ( {Object.keys(messages).length} )</ListSubheader>
          {messages ? Object.keys(messages).map((key: string) => {
            switch (messages[key].type) {
              case 'text':
                return (
                  <TextFlatItem
                    key={key}
                    message={messages[key]}
                    user={roomUsers![messages[key].userId]}
                    myUserId={currentUserId}
                    isLast={false}
                    isSearchResult={true}
                  />
                );
              case 'image':
                return (<div />);
              default:
                return (<div />);
            }
          }) : <CircularProgress className={classes.progress} /> }
          <ListSubheader className={classes.listSubheader}>ファイル</ListSubheader>
        </TabContainer>
        <TabContainer dir="ltr">
          <CircularProgress className={classes.progress} />
        </TabContainer>
        <TabContainer dir="ltr">
          <p>ファイル</p>
        </TabContainer>
      </SwipeableViews>
    );
  }
}

const mapStateToProps = (state: State, ownProps: SearchResultViewProps) => {
  return {
    searchResultTabIndex: state.message.searchResultTabIndex,
    currentUserId: state.client.userId,
    messages: state.message.messageMap,
    roomUsers: state.room.roomUsers,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>, ownProps: SearchResultViewProps) => {
  return {
    setSearchResultTabIndex: (searchResultTabIndex: number) =>
      dispatch(setSearchResultTabIndexActionCreator(searchResultTabIndex)),
  };
};

export const SearchResultView = connect<MapStateToProps, MapDispatchToProps, SearchResultViewProps>(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SearchResultViewComponent));
