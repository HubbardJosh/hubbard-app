import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    text-decoration: none;
    margin: 1rem;
    color: black;
    position: relative;
    &:hover {
        color: grey;
        border-bottom: 1px solid black;
    }
`;
