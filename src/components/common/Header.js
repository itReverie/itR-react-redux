import React , {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

//This is a stateless component: It means it just renders html and in this case it does not have properties
//activeClassName : it's a cool functionality already in react that says if the link is active apply the style active
const Header =({loading})=>{
 return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
 );
};

Header.propTypes={
  loading: PropTypes.bool.isRequired
};

export default Header;
