import React from 'react';
import { Container, Grid} from 'semantic-ui-react';
import MenuBar from './menu/MenuBar';

const BaseComponent = ({itemSelected, children})=> {
  return(
    <Grid relaxed celled='internally'>
      <Grid.Column width={3}>
        <MenuBar itemSelected={itemSelected}/>
      </Grid.Column>
      <Grid.Column width={9}>
        <Container>
          {children}
        </Container>
      </Grid.Column>
    </Grid>
  );
}

export default BaseComponent;