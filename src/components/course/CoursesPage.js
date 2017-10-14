import React  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

//import '../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
//import styles from '../buttons.scss';

class CoursesPage extends React.Component
{
  //-------------------------------------------------------------------
  //--------------Initialize state and call our actions to be bind-----
  //-------------------------------------------------------------------
  constructor (props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }


  //-------------------------------------------------------------------
  //Adding child functions to be called by Render
  //-------------------------------------------------------------------
  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }


  //A way to redirct to a page
  redirectToAddCoursePage(){
    browserHistory.push('/course');
  }

  //-------------------------------------------------------------------
  //-Ideally we should just render a call to a presentation component
  //-Avoid mark up in this CONTAINER COMPONENT.
  //- This component ideally should not have JSX
  //-------------------------------------------------------------------
 render(){
    const {courses} = this.props;

   return (
     <div>
       <h1>Courses</h1>
       <input type="submit"
              value="AddCourse"
              className="btn btn-primary"
              onClick={this.redirectToAddCoursePage}/>
       <CourseList courses={courses}/>
     </div>
   );
 }
}


//-------------------------------------------------------------------
//----Prop Types validations
//-------------------------------------------------------------------
//When an error like this appears: 'createCourse' is missing in props validation
CoursesPage.propTypes={
  actions : PropTypes.object.isRequired,
  courses : PropTypes.array.isRequired
};



//-------------------------------------------------------------------
//Redux connect section
//-------------------------------------------------------------------
function mapStateToProps(state)
{
  return {
    //The name the variable here comes from the name of the reducer.
    courses: state.courses
  };
}

//Note: once we are using mapDispatchToProps we no longer need to expose dispatch
function mapDispatchToProps (dispatch)
{
  //It is important to type DISPATCH as that sets our flow with redux
  return {
       actions: bindActionCreators(courseActions,dispatch)
  };
}

//This is a way to call two functions
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
