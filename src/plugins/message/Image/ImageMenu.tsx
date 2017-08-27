import * as React from 'react';
import { IPluginMessageMenuProps } from '../';
import { Camera } from '../../../components';

export class ImageMenu extends React.Component<IPluginMessageMenuProps, void> {
  render(): JSX.Element {
    const on = {
      color: '#0084ff'
    };
    const off = {
      color: '#bdbdbd'
    };
    const {updateMenuIndex, ownMenuIndex, currentMenuIndex} = this.props;
    return (
      <div
        className="image-menu-root"
        onClick={() => {updateMenuIndex(ownMenuIndex); }}
      >
        <Camera className="image-menu-icon" style={ownMenuIndex === currentMenuIndex ? on : off} />
      </div>
    );
  }
}
