import styled from 'styled-components';

// styles
export const StyledContainer = styled.div`
  padding: 10px 50px;
	width: 100%;
`;

export const StyledCard = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid lightgrey;
	margin-bottom: 10px;
`;
export const StyledBadge = styled.div`
	margin-left: 1rem;
	margin-top: 0.78rem;
	position: absolute;
	border-radius: 100px;
	color: #bfbcc2;
	font-size: 0.90rem;
	padding: 3px 12px;
	background-color: #7d57aa;
	display: inline-block;
	cursor: pointer;
  &:hover {
		color: #ffffff;
		background: #553B73;
		text-decoration: none;
  }
`;
export const StyledTitle = styled.div`
	font-size: 2.125rem;
	display: inline-block;
`;