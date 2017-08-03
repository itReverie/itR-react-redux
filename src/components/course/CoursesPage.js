import React , {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
    this.props.actions.createCourse(this.state.course);
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

//When an error like this appears: 'createCourse' is missing in props validation
CoursesPage.propTypes={
  actions:PropTypes.object.isRequired,
  courses : PropTypes.array.isRequired
};

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
