import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';

import SearchIcon from 'material-ui-icons/Search';
import GridOn from 'material-ui-icons/GridOn';
import ViewList from 'material-ui-icons/ViewList';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment }from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import {
  toView,
  filter
} from '../actions/index'

const styles = theme => ({
  card: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 5px 5px 16px'
  }
});

class TopPanel extends React.Component {
  toView = (type) => {
    const { dispatch } = this.props;
    dispatch(toView(type));
  }

  filter = (event) => {
    const { dispatch } = this.props;
    dispatch(filter(event.target.value));
  }

  render () {
    const { classes, filterStr, view } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <FormControl>
            <Input
              id="weight"
              placeholder="Filter songs"
              onChange={this.filter}
              value={filterStr}
              endAdornment={<InputAdornment position="end"><SearchIcon color="rgba(0, 0, 0, 0.5)" /></InputAdornment>}
              margin="normal"
            />
          </FormControl>
          <span>
            { view === 'grid' &&
              <IconButton onClick={() => this.toView('list')}>
                <ViewList color="rgba(0, 0, 0, 0.8)" />
              </IconButton>
            }
            { view === 'list' &&
              <IconButton onClick={() => this.toView('grid')}>
                <GridOn color="rgba(0, 0, 0, 0.8)" />
              </IconButton>
            }
          </span>
        </Card>
      </div>
    );
  };
}

TopPanel.defaultProps = {
  view: 'list',
  filterStr: ''
};

TopPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return state.playerData;
}

export default connect(mapStateToProps)(
  withStyles(styles)(TopPanel)
)
