import React , {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseAction';

class CoursesPage extends React.Component
{
  constructor (props, context)
  {

    //constructor that initializes the state
    super(props, context);
    this.state = {
                  course: { title: null}
                 };
    //Adding bind statements for our functions
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);

  }

  //Adding functions
  onTitleChange(event){
    const course=this.state.course;
    course.title = event.target.value;
    this.setState({course:course});
  }

  onClickSave()
  {
    //Dispatch an action
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  courseRow(course, index)
  {
    return <div key={index}>{course.title}</div>;
  }

 render(){
   return (
     <div>
       <h1>Courses</h1>
       {this.props.courses.map(this.courseRow)}
       <h2>Add Courses</h2>
       <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title}/>
       <input
          type="submit"
          value="Save"
          onClick={this.onClickSave}/>
     </div>
   );
 }
}

CoursesPage.propTypes={
  dispatch: PropTypes.func.isRequired,
  courses:PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps)
{
  return {
    //The name the variable here comes from the name of the reducer.
    courses: state.courses
  };
}

//function mapDispatchToProps
//Dispatch allows you to fire up actions and if you do not specify it, you can use it at the top as this.props.dispatch


//This is a way to call two functions
export default connect(mapStateToProps /*, mapDispatchToProps*/)(CoursesPage);
