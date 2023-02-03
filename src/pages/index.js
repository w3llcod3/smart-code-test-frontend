import * as React from 'react';
import Container from '@mui/material/Container';

import Drawer from './../app/components/drawer'

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Drawer />
    </Container>
  );
}