import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Header, List, Select, Segment } from 'semantic-ui-react';
import {UserSearchById, roleList, updateUser } from '../../api';
import BaseComponent from '../BaseComponent';

const UserSelectedView = ()=> {
  const history = useHistory();

  const [id, setId] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[roleOptions, setRoleOptions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roleId, setRoleId] = useState('');



  useEffect(()=>{
    console.log(history.location.state.id);
    UserSearchById(history.location.state.id).then(user =>{
      setId(user.id);
      setEmail(user.email);
      setPassword(user.password);
      setRoleId(user.role.id);
      setPermissions(user.role.permissions);
      console.log(user);
      roleList().then(roles => {
        //console.log(roles);
        setRoleOptions(roles.map(item =>({ key: item.id, value: item.id, text: item.name})))
      });
    });
  }, [history.location.state.id]);

  const handleEmailChange = ({target}) => setEmail(target.value);
  const handlePasswordChange = ({target}) => setPassword(target.value);
  const handleRoleChange = ({target}, data) => setRoleId(data.value);

  const clickEdit = ()=>{
    setFormEnabled(false);
  };

  const clickUpdate = ()=> {
    setFormEnabled(true);
    console.log({id, email, password, roleId});
    updateUser(id, email, password, roleId)
    .then( user => {
      //console.log(user);
      window.location.reload();
    });
  }

  return (
    <BaseComponent itemSelected='Buscar Empleados' children={
      <>
        <Form>
          <Header as='h3'>Datos básicos</Header>
          <Form.Field disabled={formEnabled}>
            <label>Correo electrónico</label>
            <input placeholder='Correo electrónico' type='text' value={email} onChange={handleEmailChange}/>
          </Form.Field>
          <Form.Field disabled={formEnabled}>
            <label>Contraseña</label>
            <input placeholder='Contraseña' type='text' value={password} onChange={handlePasswordChange}/>
          </Form.Field>
          <Header as='h3'>Datos de rol</Header>
          <Form.Field disabled={formEnabled}>
            <label>Rol</label>
            <Select placeholder='Rol...'
            options={roleOptions}
            defaultValue={roleId}
            value={roleId}
            onChange={handleRoleChange}
            />
          </Form.Field>
          <Segment>
            <Header as='h4'>Permisos</Header>
            <List relaxed>
              {
              permissions.map((permission) => (
                <List.Item key={permission.id}>
                  <List.Content>
                    <label>{permission.name}</label>
                  </List.Content>
                </List.Item>
              ))
              }
            </List>
          </Segment>
          <Button color='blue' onClick={clickUpdate}>Guardar</Button>
          <Button color='green' onClick={clickEdit}>Editar</Button>
        </Form>
      </>
    }/>
  );
}

export default UserSelectedView;