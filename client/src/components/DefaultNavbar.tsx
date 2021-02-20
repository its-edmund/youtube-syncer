import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

const DefaultNavbar = (): JSX.Element => {
  return (
    <Navbar color="dark" dark expand='md'>
      <NavbarBrand href="/#">
            youtube syncer
      </NavbarBrand>
      <Nav className='mr-auto' navbar>
        <NavItem>
          <NavLink href='/#tab1'>Tab 1</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/#tab2'>Tab 2</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/#tab3'>Tab 3</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default DefaultNavbar;
