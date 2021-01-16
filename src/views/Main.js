import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import ProfileCard from '../components/ProfileCard';
import ProfilesContext from '../profiles.store';
import LoadingSkeleton from '../components/Loader';
import NoProfilesComponent from '../components/NoProfilesComponent';


const ProfileCardsWrapper = styled.div`
  overflow-y: scroll;
  padding: 1em 0;
`;

const Wrapper = styled.div`
  margin-top: 0.5em
`;

const PaginationWrapper = styled.div`
  width: min(500px, 95vw);
  margin: 1em auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button{
    font-size: 1em;
    padding: 0 0.5em;
    border: none;
    background: none;
    cursor: pointer
  }
`;

const ResultsDiv = styled.div`
  text-align: center;
  padding: 0.5em;
`;

const MainView = observer(() => {

  const { filteredProfiles, pageCount, allProfiles } = useContext(ProfilesContext);
  const displayedCount = 20;

  const initialState = {
    currentPage: 1,
    startIndex: 0
  }

  const [state, setState] = useState(initialState);

  const gotoNextPage = () => {
    if (state.currentPage === pageCount) return;

    const startIndex = (state.currentPage * displayedCount) - 1;
    const newPageIndex = state.currentPage + 1;

    setState({
      startIndex,
      currentPage: newPageIndex
    });
  };

  const gotoPreviousPage = () => {
    if (state.currentPage === 1) return;

    const newPageIndex = state.currentPage - 1;
    const startIndex = newPageIndex === 1 ? 0 : (state.startIndex - 20);

    setState({
      startIndex,
      currentPage: newPageIndex
    });
  };

  return (
    <Wrapper>
      <ProfileCardsWrapper>
        {allProfiles.length && !filteredProfiles.length && NoProfilesComponent}
        {!allProfiles.length && <LoadingSkeleton />}
        {allProfiles.length && filteredProfiles.length && <ResultsDiv>
          {filteredProfiles.length} results found
          </ResultsDiv>}
        {filteredProfiles.length && filteredProfiles.slice(state.startIndex, state.startIndex + displayedCount).map((profile, index) => <ProfileCard position={state.startIndex === 0 ? state.startIndex + index + 1 : state.startIndex + index + 2} profile={profile} key={index}></ProfileCard>)}
      </ProfileCardsWrapper>

      {filteredProfiles.length && <PaginationWrapper>
        <div>
          <h4>Page {state.currentPage} / {pageCount}</h4>
        </div>
        <div>
          <button onClick={() => gotoPreviousPage()}>Prev</button>
          <button onClick={() => gotoNextPage()}>Next</button>
        </div>
      </PaginationWrapper>}
    </Wrapper>
  )
}
);


export default MainView;