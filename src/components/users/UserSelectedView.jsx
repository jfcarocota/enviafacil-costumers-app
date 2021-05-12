import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Header, List, Select } from 'semantic-ui-react';
import {UserSearchById, roleList } from '../../api';
import BaseComponent from '../BaseComponent';

const UserSelectedView = ()=> {
  const history = useHistory();

  const [id, setId] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState({});
  const[roleOptions, setRoleOptions] = useState([]);



  useEffect(()=>{
    console.log(history.location.state.id);
    //setId(history.location.state.id);
    UserSearchById(history.location.state.id).then(user =>{
      //setCostumer(costumer);
      setEmail(user.email);
      setPassword(user.password);
      setRole(user.role);
      console.log(user);
    });
    roleList().then(roles => {
      console.log(roles);
      setRoleOptions(roles.map(item =>({ key: item.id, value: item.id, text: item.name})))
    });
  }, [history.location.state.id]);

  /*const updateItem = (prop, event, index) => {
    const old = accounts[index];
    const updated = { ...old, [prop]: event.target.value }
    const clone = [...accounts];
    clone[index] = updated;
    setAccounts(clone);
}*/

  const clickEdit = ()=>{
    setFormEnabled(false);
  };

  const clickUpdate = ()=> {
    setFormEnabled(true);
    /*const splitName = name.split(' ');
    console.log({id, name, phone, email});
    updateCostumer(id, splitName[0], splitName[1], splitName[2], splitName[3], name, phone, email)
    .then(costumer => {
      console.log(costumer);
      accounts.forEach((item) =>{
        console.log(item);
        updateCostumerPackage(item.id, item.account, item.password, id, item.parcel.id)
        .then(acc => console.log(acc));
      });
    });*/
  }

  /*const handleNameChange = ({target}) => setName(target.value);
  const handleEmailChange = ({target}) => setEmail(target.value);
  const handlePhoneChange = ({target}) => setPhone(target.value);

  useEffect(()=> console.log(accounts), [accounts]);*/

  return (
    <BaseComponent itemSelected='Buscar Empleados' children={
      <>
        <Form>
          <Header as='h3'>Datos básicos</Header>
          <Form.Field disabled={formEnabled}>
            <label>Correo electrónico</label>
            <input placeholder='Correo electrónico' type='text' value={email}/>
          </Form.Field>
          <Form.Field disabled={formEnabled}>
            <label>Contraseña</label>
            <input placeholder='Contraseña' type='text' value={password}/>
          </Form.Field>
          <Header as='h3'>Datos de rol</Header>
          <Form.Field disabled={formEnabled}>
            <label>Rol</label>
            <Select placeholder='Rol...' options={roleOptions} defaultValue={role.id} value={role.id}/>
          </Form.Field>
          <List relaxed>
            {/*
              accounts.map((item, index) =>(
                <List.Item key={item.id}>
                  <Header as='h4'>{item.parcel.name}</Header>
                  <List.Content>
                    <Form>
                      <Form.Field disabled={formEnabled}>
                        <label>Cuenta</label>
                        <input
                        placeholder='Last Name'
                        type='text'
                        value={item.account}
                        onChange={e => updateItem('account', e, index)}
                        />
                      </Form.Field>
                      <Form.Field disabled={formEnabled}>
                        <label>Password</label>
                        <input
                        placeholder='Last Name'
                        type='text'
                        value={item.password}
                        onChange={e => updateItem('password', e, index)}
                        />
                      </Form.Field>
                    </Form>
                  </List.Content>
                </List.Item>
              ))*/
            }
          </List>
          <Button color='blue' onClick={clickUpdate}>Guardar</Button>
          <Button color='green' onClick={clickEdit}>Editar</Button>
        </Form>
      </>
    }/>
  );
}

export default UserSelectedView;