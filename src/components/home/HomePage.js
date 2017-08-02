import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render()
  {
    return (
      <div className="jumbotron">
        <h1>Course Administration</h1>
        <p>React, Redux and React Router in ES6 for ultra responsive web apps.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}

{/*When someone else imports the file, they will say:  import HomePage from 'HomePage' */}
export default HomePage;
