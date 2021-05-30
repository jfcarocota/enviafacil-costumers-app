import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Checkbox, Form, Header, List, Select, Icon } from 'semantic-ui-react';
import { addCostumer, getParcellist } from '../../api';
import BaseComponent from '../BaseComponent';

const CostumerAddView = ()=> {
  const history = useHistory();

  const [formEnabled, setFormEnabled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [parcels, setParcels] = useState([]);

  useEffect(()=>{
    getParcellist().then(parcels => setParcels(parcels.map(parcel => ({key: parcel.id, value: parcel.id, text: parcel.name}))));
  }, []);

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

  const clickCreate = ()=> {
    //setFormEnabled(true);
    const splitName = name.split(' ');

    const formData = {
      firstName: splitName[0],
      middleName: splitName[1],
      lastName: splitName[2],
      secondLastName: splitName[3],
      fullName: name,
      phonNumber: phone,
      email
    }

    console.log(formData);

    /*
    firstName: $firstName, middleName: $middleName, lastName: $lastName,
    secondLastName: $secondLastName, fullName: $fullName, phonNumber: $phonNumber, email: $email
    */


    //console.log({id, name, phone, email});
    /*updateCostumer(id, splitName[0], splitName[1], splitName[2], splitName[3], name, phone, email)
    .then(costumer => {
      console.log(costumer);
      accounts.forEach((item) =>{
        console.log(item);
        updateCostumerPackage(item.id, item.account, item.password, id, item.parcel.id)
        .then(acc => console.log(acc));
      });
    });*/
  }

  const handleNameChange = ({target}) => setName(target.value);
  const handleEmailChange = ({target}) => setEmail(target.value);
  const handlePhoneChange = ({target}) => setPhone(target.value);

  useEffect(()=> console.log(accounts), [accounts]);

  return (
    <BaseComponent itemSelected='Agregar Clientes' children={
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
          <Form.Group>
            <Select 
            placeholder='Paquetería...'
            options={parcels}
            //defaultValue={parcels[0].id}
            //value={parcels[0].id}
            />
            <Button color='green' icon>
              <Icon name='add'/>
            </Button>
          </Form.Group>
        </Form>
        <Button color='blue' onClick={clickCreate}>Crear usuario</Button>
      </>
    }/>
  );
}

export default CostumerAddView;