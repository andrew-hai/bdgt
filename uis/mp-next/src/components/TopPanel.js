import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';

import SearchIcon from 'material-ui-icons/Search';
import GridOn from 'material-ui-icons/GridOn';
import ViewList from 'material-ui-icons/ViewList';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment, InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import TopPanelMoreMenu from './TopPanelMoreMenu';

import {
  toView,
  filter
} from '../actions/index';

const styles = theme => ({
  card: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 7px 10px 16px'
  },
  search: {
    flex: 2
  },
  actions: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  numbers: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class TopPanel extends React.Component {
  toView = (type) => {
    const { dispatch } = this.props;
    dispatch(toView(type));
  };

  filter = (event) => {
    const { dispatch } = this.props;
    dispatch(filter(event.target.value));
  };

  render () {
    const { classes, filterStr, audios, allAudios, view } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <FormControl className={classes.search}>
            <InputLabel htmlFor="filter">Filter songs</InputLabel>
            <Input
              id="filter"
              placeholder="Filter songs"
              onChange={this.filter}
              value={filterStr}
              endAdornment={
                <InputAdornment color="action" position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              margin="dense"
            />
            <FormHelperText>Enter songs title or artist name</FormHelperText>
          </FormControl>
          <span className={classes.numbers}>
            {audios.length} / {allAudios.length}
          </span>
          <span className={classes.actions}>
            { view === 'grid' &&
              <IconButton onClick={() => this.toView('list')}>
                <ViewList />
              </IconButton>
            }
            { view === 'list' &&
              <IconButton onClick={() => this.toView('grid')}>
                <GridOn />
              </IconButton>
            }
            <TopPanelMoreMenu />
          </span>
        </Card>
      </div>
    );
  };
}

TopPanel.defaultProps = {
  audios: [],
  allAudios: [],
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
