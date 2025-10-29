// import React from "react";
// import Nav from 'react-bootstrap/Nav';
// import NavItem from 'react-bootstrap/NavItem';
// import NavLink from 'react-bootstrap/NavLink';
// import Figure from "react-bootstrap/Figure";
// import Button from "react-bootstrap/Button";



// export default function BootstrapNavigation() {
  
//     return (
        
//         <div>
//        <div id="wd-css-navigating-with-tabs">
//   <h2>Tabs</h2>
//   <Nav variant="tabs">
//   <NavItem>
//     <NavLink href="#/Labs/Lab2/Active">Active</NavLink>
//   </NavItem>
//   <NavItem>
//     <NavLink href="#/Labs/Lab2/Link1">Link 1</NavLink>
//   </NavItem>
//   <NavItem>
//     <NavLink href="#/Labs/Lab2/Link2">Link 2</NavLink>
//   </NavItem>
//   <NavItem>
//     <NavLink href="#/Labs/Lab2/Disabled" disabled>Disabled</NavLink>
//   </NavItem>
// </Nav>

// </div>    


// <div className="card" style={{ width: "18rem" }}>
//   <img src="/images/stacked.jpg" className="card-img-top" alt="Stacked Starship" />
//   <div className="card-body">
//     <h5 className="card-title">Stacking Starship</h5>
//     <p className="card-text">Mars or bust!</p>
//     <button className="btn btn-primary">Boldly Go</button>
//   </div>
// </div>


//         </div>


//     );
// }


import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function BootstrapNavigation() {
    return (
        
        <div>
        <div id="wd-css-navigating-with-cards">
  <h2> Cards </h2>
  <Card style={{ width: "18rem" }}>
    <CardImg variant="top" src="/images/stacked.jpg" />
    <CardBody>
      <CardTitle>Stacking Starship</CardTitle>
      <CardText>
        Stacking the most powerful rocket in history. Mars or bust!
      </CardText>
      <Button variant="primary">Boldly Go</Button>
    </CardBody>
  </Card>
</div>

        </div>


    );
}