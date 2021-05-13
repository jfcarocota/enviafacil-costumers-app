import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Checkbox, Form, Header, List } from 'semantic-ui-react';
import { costumersSearchById, updateCostumer, updateCostumerPackage } from '../../api';
import BaseComponent from '../BaseComponent';

const CostumerSelectedView = ()=> {
  const history = useHistory();

  const [id, setId] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accounts, setAccounts] = useState([]);



  useEffect(()=>{
    console.log(history.location.state.id);
    costumersSearchById(history.location.state.id).then(costumer =>{
      setId(costumer.id);
      setName(costumer.fullName);
      setEmail(costumer.email);
      setPhone(costumer.phonNumber);
      setAccounts(costumer.packages);
    });
  }, [history.location.state.id]);

  const updateItem = (prop, event, index) => {
    const old = accounts[index];
    const updated = { ...old, [prop]: event.target.value }
    const clone = [...accounts];
    clone[index] = updated;
    setAccounts(clone);
}

  const clickEdit = ()=>{
    setFormEnabled(false);
  };

  const clickUpdate = ()=> {
    setFormEnabled(true);
    const splitName = name.split(' ');
    //console.log({id, name, phone, email});
    updateCostumer(id, splitName[0], splitName[1], splitName[2], splitName[3], name, phone, email)
    .then(costumer => {
      console.log(costumer);
      accounts.forEach((item) =>{
        console.log(item);
        updateCostumerPackage(item.id, item.account, item.password, id, item.parcel.id)
        .then(acc => console.log(acc));
      });
    });
  }

  const handleNameChange = ({target}) => setName(target.value);
  const handleEmailChange = ({target}) => setEmail(target.value);
  const handlePhoneChange = ({target}) => setPhone(target.value);

  useEffect(()=> console.log(accounts), [accounts]);

  return (
    <BaseComponent itemSelected='Buscar Clientes' children={
      <>
        <Form>
          <Header as='h3'>Datos básicos</Header>
          <Form.Field disabled={formEnabled}>
            <label>Nombre</label>
            <input placeholder='First Name' type='text' value={name} onChange={handleNameChange}/>
          </Form.Field>
          <Form.Field disabled={formEnabled}>
            <label>Correo electrónico</label>
            <input placeholder='Last Name' type='text' value={email} onChange={handleEmailChange}/>
          </Form.Field>
          <Form.Field disabled={formEnabled}>
            <label>Teléfono</label>
            <input placeholder='Last Name' type='text' value={phone} onChange={handlePhoneChange}/>
          </Form.Field>
          <Header as='h3'>Cuentas de paquetería</Header>
          <List relaxed>
            {
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
              ))
            }
          </List>
          <Button color='blue' onClick={clickUpdate}>Guardar</Button>
          <Button color='green' onClick={clickEdit}>Editar</Button>
        </Form>
      </>
    }/>
  );
}

export default CostumerSelectedView;