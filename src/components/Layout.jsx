import React from 'react';
import { Container } from 'reactstrap';

export default props => (
  <div>
    <Container>
      {props.children}
    </Container>
  </div>
);