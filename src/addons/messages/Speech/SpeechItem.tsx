import * as React from 'react';
import { dateFormateHHMM, IAddonMessageItemProps, ITextPayload } from 'swagchat-sdk';
import { Avatar } from '../../../components';
import * as styles from './speech-item.css';

export class SpeechItem extends React.Component<IAddonMessageItemProps, {}> {
  render(): JSX.Element {
    const { message, myUserId, user } = this.props;
    const payload = message.payload as ITextPayload;
    let splitMessage = payload.text.split('\n');
    let displayText = new Array;
    splitMessage.forEach((value, index) => {
      displayText.push(<span key={'web-speech-item-' + message.messageId + '-' + index}>{value}<br /></span>);
    });
    return (
      <div className={styles.root}>
        {user.userId === myUserId ? (
          <div>
            <div className={styles.messageRight}>{displayText}</div>
            <div className={styles.timeRight}>{dateFormateHHMM(message.created!)}</div>
            <div className={styles.clear} />
          </div>
        ) : (
          <div>
            <Avatar className={styles.avatar} src={user.pictureUrl} />
            <p className={styles.name}>{user.name}</p>
            <div className={styles.messageLeft}>{payload.text}</div>
            <div className={styles.timeLeft}>{dateFormateHHMM(message.created!)}</div>
            <div className={styles.clear} />
          </div>
        )}
      </div>
    );
  }
}
