import React , {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';

//This is a stateless component: It means it just renders html and in this case it does not have properties
//activeClassName : it's a cool functionality already in react that says if the link is active apply the style active
const Header =()=>{
 return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
    </nav>
 );
};

export default Header;
