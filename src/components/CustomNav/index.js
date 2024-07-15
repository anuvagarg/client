import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


const CustomNav = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
    <div>
      <Navbar color="primary" dark fixed = "top" expand = "false">
        <NavbarBrand href="/">Strapi Authentication</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="/logout">
                Logout
              </NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/*   */}
        </Collapse>
      </Navbar>
    </div>
    
    );
};

export default CustomNav;