import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class TopPanelMoreMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      dialogOpened: false
    };
  }

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  openDialog = event => {
    this.handleMenuClose();
    this.setState({ dialogOpened: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpened: false });
  };

  handleSendLogIn = () => {
    console.log(this);
  };

  render() {
    const menuOpened = Boolean(this.state.anchorEl);
    const { id } = this.props.userData;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={menuOpened ? 'top-panel-more-menu' : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="top-panel-more-menu"
          anchorEl={this.state.anchorEl}
          open={menuOpened}
          onClose={this.handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 400,
              width: 200,
            },
          }}
        >
          {!id &&
            <MenuItem key={'LogIn'} onClick={this.openDialog}>
              Log In
            </MenuItem>
          }
          {id &&
            <MenuItem key={'LogOut'} onClick={this.handleMenuClose}>
              Log out
            </MenuItem>
          }
        </Menu>
        {!id &&
          <Dialog
            open={this.state.dialogOpened}
            onClose={this.handleDialogClose}
            aria-labelledby="log-in-form-dialog-title"
          >
            <DialogTitle id="log-in-form-dialog-title">Log In</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To log in to this website, please enter your email address and password here.
                We will send updates occationally.
              </DialogContentText>
              <TextField
                margin="dense"
                id="login-form-email"
                label="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                margin="dense"
                id="login-form-password"
                label="Password"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSendLogIn} color="primary">
                Log In
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }
}

TopPanelMoreMenu.defaultProps = {
  userData: {}
};

TopPanelMoreMenu.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(TopPanelMoreMenu)
