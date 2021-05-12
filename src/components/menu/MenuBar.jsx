import React, { useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import { Logout } from '../../Auth';

const MenuBar = ({itemSelected})=> {
  const [activeItem, setActiveItem] = useState(itemSelected);

  const history = useHistory();

  //const handleItemClick = (e, { name }) => setActiveItem(name);
  const handleLogout = (e, { name }) => {
    setActiveItem(name);
    Logout();
    history.push('/');
    window.location.reload();
  }

  const HandleSearchCostumers = (e, { name }) => {
    setActiveItem(name);
    history.push('/costumerssearch');
  }

  const HandleSearchUsers = (e, { name }) => {
    setActiveItem(name);
    history.push('/usersssearch');
  }


  return (
  <Menu text vertical color='blue'>
    <Menu.Item header>Menú</Menu.Item>
    <Menu.Item
      name='Buscar Clientes'
      active={activeItem === 'Buscar Clientes'}
      onClick={HandleSearchCostumers}
    />
    <Menu.Item
      name='Buscar Empleados'
      active={activeItem === 'Buscar Empleados'}
      onClick={HandleSearchUsers}
    />
    <Menu.Item
      name='Cerrar Sesión'
      active={activeItem === 'Cerrar Sesión'}
      onClick={handleLogout}
    />
  </Menu>
  )
}

export default withRouter(MenuBar);