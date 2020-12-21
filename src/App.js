import React from 'react';
import './App.css';
import EventsList from './containers/EventsList'
import Map from './containers/Map'
import Filters from './containers/Filters'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{marginBottom: 30}}>Events</div>
      </header>
      <div style={{marginTop: 30}}>
        <Filters />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex'}}>
            <EventsList />
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
