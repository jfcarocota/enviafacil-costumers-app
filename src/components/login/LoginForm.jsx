import React, {useEffect, useState} from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import {Auth} from '../../Auth';

const LoginForm = ()=> {

  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onEmailChange = ({target}) => setEmail(target.value);

	const onPasswordChange = ({target}) => setPassword(target.value);

  const TryLogin = ()=> {
    Auth(email, password).then(token => token & window.location.reload());
  }


  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' textAlign='center' color='blue'>
        <Image src='/logo.png' /> Inicio de sesión
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input
          fluid
          icon='user'
          iconPosition='left'
          placeholder='Correo Electrónico'
          onChange={onEmailChange}
          />
          <Form.Input
          fluid
          icon='lock'
          iconPosition='left'
          placeholder='Contraseña'
          type='password'
          onChange={onPasswordChange}
          />

          <Button fluid size='large' color='blue' onClick={TryLogin}>
            Iniciar Sersión
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
  );
}

export default LoginForm;