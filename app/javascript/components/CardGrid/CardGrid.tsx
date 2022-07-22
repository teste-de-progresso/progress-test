import React, { FC } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
`;

type Props = {
  className?: string
  children: any
}

export const CardGrid: FC<Props> = ({ children, className }) => (
  <Grid className={className}>
    {children}
  </Grid>
);
