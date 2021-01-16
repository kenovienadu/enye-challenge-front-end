import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';


const FlexWrapper = styled.div`
  background: white;
  height: 100px;
  border-radius: 5px;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.1s ease-in;

  &:hover{
    box-shadow: 0 1px 5px #8080808c;
  }

  .image-wrapper,button{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: lightgrey;
    border: none
  }

  .content{
    display: inline-block;
    width: 80%;

    h4{
      margin-bottom: 0.4em
    }

    p{
      opacity: 0.6;
      font-size: 12px;
      padding-bottom: 0.3em;

      i{
        margin-right: 1em
      }
    }
  }
  
`;

const Wrapper = styled.div`
  width: min(500px, 90vw);
  margin: 0.5em auto;
  a{
    color: inherit;
    text-decoration: none;

    &:hover{
      color: inherit;
      text-decoration: none
    }
  }
`;

const ProfileCard = ({ profile, position }) => {

  return (
    <Wrapper>
      <Link to={profile ? `/detail/${profile.UserName}` : ''}>
        <FlexWrapper>
          <div>
            {position || <Skeleton circle={true} height={25} width={25} />}
          </div>
          <div className="content">
            <h4>{profile ? (profile.FirstName + ' ' + profile.LastName) : <Skeleton width={200} height={15} />}</h4>
            <p><i className="fas fa-envelope"></i>{profile ? profile.Email : <Skeleton width={130} height={15} />}</p>
            <p><i className="fas fa-phone"></i> {profile ? profile.PhoneNumber : <Skeleton width={130} height={15} />}</p>
          </div>
          <span>
            {profile ? <i className="fas fa-arrow-right"></i> : <Skeleton circle={true} height={25} width={25} />}
          </span>
        </FlexWrapper>
      </Link>
    </Wrapper>
  );
}

export default ProfileCard;