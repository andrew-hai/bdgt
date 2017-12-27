import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

class TopPanelMoreMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };

  redirect = () => {
    this.handleRequestClose();
  };

  render() {
    const open = Boolean(this.state.anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              maxHeight: 400,
              width: 200,
            },
          }}
        >
          <MenuItem key={'LogIn'} onClick={this.redirect}>
            LogIn
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default TopPanelMoreMenu;
