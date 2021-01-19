import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styled from 'styled-components';

import MainView from './views/Main';
import DetailView from './views/Detail';
import SearchBar from './components/SearchBar';
import ProfilesContext, { profilesState } from './profilesContext';

const ContentWrapper = styled.div`
  height: calc(100vh - 120px);
  overflow-y: scroll
`;

const App = () => {
  const [dataisLoaded, setDataIsLoaded] = useState(false);

  const loadData = async () => {
    if (dataisLoaded) return;
    const done = await profilesState.loadProfiles();
    setDataIsLoaded(done);
  }

  useEffect(() => loadData());


  return (
    <>
      <ProfilesContext.Provider value={profilesState}>
        <Router>
          <SearchBar />
          <ContentWrapper>
            <Switch>
              <Route path="/" exact={true}>
                <MainView />
              </Route>
              <Route path="/detail/:username">
                <DetailView />
              </Route>
            </Switch>
          </ContentWrapper>
        </Router>
      </ProfilesContext.Provider>
    </>
  )
}

export default App;
