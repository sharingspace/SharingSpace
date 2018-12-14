import React, { Component } from 'react';
import { StyledBadge, StyledCard, StyledContainer, StyledTitle } from './styled';
import { observer } from 'mobx-react';
import { membersStore } from '../../stores';

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
    const { members } = membersStore;
    console.log('members', members);
    return (
      <StyledContainer>
        {members && members.map(member => (
          <StyledCard key={member.id}>
            <StyledTitle>{member.display_name}</StyledTitle>
            <StyledBadge>role</StyledBadge>
          </StyledCard>
        ))}
      </StyledContainer>
    );
  }
}

export default observer(MembersView);
