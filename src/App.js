import React from 'react';
import logo from './logo.svg';
import './App.css';
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import OptionsListing, { options } from './options.comp';
import OptionPopup from './optionPopup.comp';
import { isNumber, isUndefined } from 'lodash';

// describe our store
const apptsInit = {
  labels: options,
data: Array(options.length).fill('').map(item => {
     return { name: '', phone: '' };
    }),
  sets: Array(options.length).fill(false)
};

// reducers, state mappers
// cannot handl multiple keys, so all bundled in appointments.data
function appointments(state, action) {
  switch (action.type) {
    case 'APPT_LISTALL':
      return state;
    case 'APPT_UPDATE':
      let data = action.data;
      // no trim here
      let appts = [...state.data];
      let sets = [...state.sets];
      
      isUndefined(data.name) || (appts[data.index].name = data.name);
      isUndefined(data.phone) || (appts[data.index].phone = data.phone);
      sets[data.index] = !! appts[data.index].name;
      return {data: appts, sets: sets, labels: state.labels}
    default:
      return state || apptsInit; // must always return initial state
  }
}

function selectedAppt(state, action) {
  switch (action.type) {
    case 'APPT_SELECT':
      return isUndefined(action.index) ? state : action.index;
    default:
      return isNumber(state) ? state : null; // cannot return undefined
  }
}

const apptsApp = combineReducers({
  appointments,
  selectedAppt
})

// return (
//   
// )

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
    selected: state.selectedAppt
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOptionSelect: (idx) => {
      dispatch({
        type: 'APPT_SELECT',
        index: idx
      })
    },
    onOptionChange: (data) => {
      dispatch({
        type: 'APPT_UPDATE',
        data: data
      });
    },
    onPopupClose: () => {
      // we could additionally dispatch a cleanup run on the current selected
      dispatch({
        type: 'APPT_SELECT',
        index: null
      })
    }
  }
}

const onSelectHandlers = (store) => {
  store.subscribe(state => {
    // nothing to do here yet
    // let selected = store.getState().selected;
  });
}

const AppShell = props => {
  onSelectHandlers(props.store);

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Steeve's AppOintment'Ator</h2>
      </div>
      <div className="container">
        <p className="App-intro">
          We've got a create-react-app starter with some additional sugar.</p>
        <ul>
          <OptionsListing {...props} />
        </ul>
      </div>
      <OptionPopup {...props} />
    </div>
  )
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppShell);

export { apptsApp };
export default App;
