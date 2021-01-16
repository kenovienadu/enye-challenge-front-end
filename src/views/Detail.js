import { useContext, useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ProfilesContext from '../profiles.store';


const Wrapper = styled.div`
  width: min(500px, 90vw);
  margin: 1em auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  color: grey;
  cursor: pointer;

  i{
    margin-right: 0.5em
  }
`;

const ProfileDetailCard = styled.div`
  background: white;
  border-radius: 8px;
  margin: 20px 0;
  min-height: 200px;
  padding: 1em;

  .line{
    background: #d3d3d369
  }

  .name{
    font-weight: 500;
    font-size: 1.4em;
    margin-bottom: 1em;

    span{
      opacity: 0.5;
      font-size: 0.8em;

      @media screen and (max-width: 700px){
        display: block;
      }
    }
  }
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span{
    padding: 0.5em 0;
    text-transform: capitalize;

    &:first-child{
      opacity: 0.8;
      font-size: 0.8em
    }
  }
`;

const DetailView = () => {
  const { findProfileByUsername, allProfiles } = useContext(ProfilesContext);
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (profile) return;

    const found = findProfileByUsername(username, allProfiles);

    if (!username || !found) {
      return history.push('/');
    }

    setProfile(found);
    console.log(found);
    window.scrollTo(0, 0);
  }, [profile, findProfileByUsername, username, history, allProfiles]);

  return (
    <>
      {profile && <ProfileDetail profile={profile}></ProfileDetail>}
    </>
  )
}

const ProfileDetail = ({ profile }) => {
  return (<Wrapper>
    <Link to="/">
      <BackButton>
        <i className="fas fa-arrow-left"></i>
        Back
      </BackButton>
    </Link>
    <ProfileDetailCard>
      <p className="name">{profile.FirstName + ' ' + profile.LastName} <span>({profile.UserName})</span></p>
      <div className="line"></div>
      <FlexBetween>
        <span>Username</span>
        <span>{profile.UserName}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Gender</span>
        <span>{profile.Gender}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Email</span>
        <span>{profile.Email}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Phone</span>
        <span>{profile.PhoneNumber}</span>
      </FlexBetween>
      <div className="line"></div>
      <FlexBetween>
        <span>payment method</span>
        <span>{profile.PaymentMethod}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Card No</span>
        <span>{profile.CreditCardNumber}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Card Type</span>
        <span>{profile.CreditCardType}</span>
      </FlexBetween>
      <div className="line"></div>
      <FlexBetween>
        <span>Mac Address</span>
        <span>{profile.MacAddress}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Domain Name</span>
        <span>{profile.DomainName}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Longitude</span>
        <span>{profile.Longitude}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Latitude</span>
        <span>{profile.Latitude}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Last Login Date</span>
        <span>{profile.LastLogin.split(' ')[0]}</span>
      </FlexBetween>
      <FlexBetween>
        <span>Last Login Time</span>
        <span>{profile.LastLogin.split(' ')[1]}</span>
      </FlexBetween>
    </ProfileDetailCard>
  </Wrapper>)
}

export default DetailView;