import React from 'react';
import { StyledBadge, StyledCard, StyledContainer, StyledTitle } from './styled';

const dummyData = [
  { name: 'Marlon', role: 'admin' },
  { name: 'Mark', role: 'manager' },
  { name: 'Jess', role: 'slave' },
  { name: 'Jikubb', role: 'assistant slave' },
  { name: 'Joel', role: 'nobody' },
]

const MembersView = () => (
  <StyledContainer>
    {dummyData && dummyData.map(data => (
      <StyledCard>
        <StyledTitle>{data.name}</StyledTitle>
        <StyledBadge>{data.role}</StyledBadge>
      </StyledCard>
    ))}
  </StyledContainer>
);

export default MembersView;
