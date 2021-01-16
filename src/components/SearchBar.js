import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react-lite';

import FilterForm from './FilterForm';
import ProfilesContext from '../profiles.store';

const SearchDiv = styled.div`
  background: white;
  height: 120px;
  padding: 1em;
  display: grid;
  place-items: center;

  > div {
    position: relative;
    width: min(500px, 90vw);

    > input {
      border: 1px solid #b9b9b9;
      height: 50px;
      padding: 0.5em;
      border-radius: 5px;
      display: block;
      width: 100%;
      font-size: 16px;
      background: var(--light);

      &:focus{
        outline: none
      }
    }

    > button{
      background: none;
      color: grey;
      position: absolute;
      right: 0.5em;
      top: 0.5em;
      border: none;
      border-radius: 50%;
      font-size: 1.4em;
      opacity: 0.7;
    }

    .filter-btn{
      background: none;
      border: none;
      color: var(--primary-color);
      font-weight: 500;
      padding-top: 1em;
      font-size: 1em;
      cursor: pointer;

      i{
        margin-right: 0.5em
      }
    }
  }
`;

const SearchBar = observer(() => {
  const profilesContext = useContext(ProfilesContext);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [showFilterForm, setShowFilterForm] = useState(window.innerWidth > 700);

  const handleWindowResize = () => {
    window.addEventListener('resize', () => {
      return window.innerWidth > 700 ? setShowFilterForm(true) : setShowFilterForm(false)
    })
  }

  useEffect(() => handleWindowResize());

  const gotohome = () => {
    if (history.location === '/') return;

    history.push('/');
  }


  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    profilesContext.search(event.target.value);
    gotohome();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    profilesContext.search(searchValue);
    gotohome();
  }

  const toggleFilterForm = () => {
    setShowFilterForm(prevState => !prevState);
  }

  return (
    <SearchDiv>
      <div>
        <input type="search" onChange={handleInputChange} />
        <button onClick={handleSubmit}>
          <i className="fas fa-search"></i>
        </button>

        <div className="text-center mobile-only">
          <button className="filter-btn" onClick={toggleFilterForm}>
            <i className="fas fa-filter"></i> Show Filters
          </button>
        </div>
      </div>
      {profilesContext.allProfiles.length && showFilterForm && <FilterForm toggleForm={toggleFilterForm} />}
    </SearchDiv>
  );
});

export default SearchBar;