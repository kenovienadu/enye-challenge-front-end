import styled from 'styled-components';
import Empty from '../empty.svg';

const Wrapper = styled.div`
  width: min(500px, 70vw);
  margin: 2em auto;
  font-size: 1.5em;

  p{
    text-align: center;

    span{
      display: block;
      font-size: 1.8em;
      font-weight: 700;
    }
  }

  div{
    display: grid;
    place-items: center;
    margin-top: 50px;
  }

  img{
    width: min(100%, 300px);
    margin: 30px auto;
  }

`;

const NoProfilesComponent = (
  <Wrapper>
    <p><span>OOPS</span> No matching profiles</p>

    <div>
      <img src={Empty} alt="" />
    </div>

  </Wrapper>
);

export default NoProfilesComponent;