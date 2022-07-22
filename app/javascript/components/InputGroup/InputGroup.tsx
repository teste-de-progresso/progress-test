import React, { FC } from "react";
import styled from "styled-components";

const StyledInputGroup = styled.div`
  &:first-of-type {
      margin-top: 0
  }
  &:last-of-type {
      margin-bottom: 0
  }
`;

type Props = {
  children?: any
}

export const InputGroup: FC<Props> = ({ children }) => (
  <StyledInputGroup className="mt-4 mb-2">{children}</StyledInputGroup>
);
