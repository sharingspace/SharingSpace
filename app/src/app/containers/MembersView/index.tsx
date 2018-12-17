import React, { Component } from 'react';
import { StyledBadge, StyledCard, StyledContainer, StyledTitle, StyledImg } from './styled';
import { observer } from 'mobx-react';
import { membersStore } from '../../stores';
import LoadingWheel from '../LoadingWheel';
import user from '../../../assets/images/user.png';

const dummyData = [
  { name: 'Marlon', role: 'admin' },
  { name: 'Mark', role: 'manager' },
  { name: 'Jess', role: 'slave' },
  { name: 'Jikubb', role: 'assistant slave' },
  { name: 'Joel', role: 'nobody' },
];

class MembersView extends Component {
  componentDidMount() {
    membersStore.fetchMembers();
  }

  render() {
    const { members, fetchingData } = membersStore;
    return (
      <StyledContainer>
        {fetchingData && <LoadingWheel />}
        {members && members.map(member => (
          <StyledCard key={member.id}>
            <StyledImg src={user} alt="profile image" />
            <StyledTitle>{member.display_name}</StyledTitle>
            <StyledBadge>{member.role_name || 'Role'}</StyledBadge>
          </StyledCard>
        ))}
      </StyledContainer>
    );
  }
}

export default observer(MembersView);
