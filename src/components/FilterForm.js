import styled from 'styled-components';
import { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ProfilesContext from '../profiles.store';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  left: 0;
  width: 250px;
  background: none;
  display: grid;
  place-items: center;
  padding-left: 1em;
  z-index: 200;

  .backdrop{
    display: none;
  }

  @media screen and (max-width: 700px){
    background: #00000059;
    width: 100vw;
    padding: 0 2em;
    grid-template-rows: auto auto auto;
    
    .backdrop{
      display: inline-block;
      height: calc((100vh - 320px)/2);
      width: 100%;
      cursor: pointer;
    }

  };

  > form {
    background: white;
    min-height: 200px;
    width: 100%;
    border-radius: 5px;
    padding: 1.5em;

    h4{
      position: relative;

      button{
        background: none;
        border: none;
        padding: 0.5em;
        position: absolute;
        right: 0.5em;
        top: 0;
        font-size: 1em;
        transform: translate(10px, -10px);
        cursor: pointer
      }
    }

    .checkbox-wrapper{
      display: grid;
      grid-template-columns: 30px auto;
      gap: 1em;
      margin: 0.5em 0;

      label{
        font-size: 0.8em
      }
    }

    > button{
      background: var(--primary-color);
      color: white;
      font-size: 1em;
      border-radius: 3px;
      padding: 0.5em;
      display: block;
      width: 100%;
      border: none;
      margin: 1em 0;
      font-weight: 500
    }

    .clear{
      color: grey;
      text-align: center;
      opacity: 0.7;
    }

  }
`;

const FilterForm = observer(({ toggleForm }) => {
  const profilesContext = useContext(ProfilesContext);

  const [filterState, setFilterState] = useState(profilesContext.filters);


  const setvalue = (key) => {
    profilesContext.toggleFilter(key);
    setFilterState(profilesContext.filters);
  }

  const updateFilters = () => {

    profilesContext.applyFilters();

    if (window.innerWidth >= 700) return;

    toggleForm();
  }


  return (
    <Wrapper as="section">
      <div className="backdrop" onClick={() => toggleForm()}></div>
      <form onSubmit={(e) => e.preventDefault()}>
        <h4>Gender
          <button className="mobile-only" onClick={() => toggleForm()}>
            <i className="fas fa-times"></i>
          </button>
        </h4>
        <div className="checkbox-wrapper">
          <input type="checkbox" checked={filterState.male} onChange={(e) => setvalue('male')}></input>
          <label>Male</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" checked={filterState.female} onChange={(e) => setvalue('female')}></input>
          <label>Female</label>
        </div>


        <br></br>

        <h4>Credit Card Type</h4>
        <div className="checkbox-wrapper">
          <input type="checkbox" checked={filterState.mastercard} onChange={(e) => setvalue('mastercard')}></input>
          <label>MasterCard</label>
        </div>
        <div className="checkbox-wrapper">
          <input type="checkbox" checked={filterState.visa} onChange={(e) => setvalue('visa')}></input>
          <label>Visa</label>
        </div>

        <br></br>
        <button onClick={() => updateFilters()}>Apply Filters</button>
        {/* <p className="clear">Clear Filters</p> */}
      </form>
      <div className="backdrop" onClick={() => toggleForm()}></div>
    </Wrapper>
  );
});

export default FilterForm;