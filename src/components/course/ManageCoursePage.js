import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';
import toastr from 'toastr';


//Converting a function component into a class allow us to have additional features like:
//local state and lifecycle hooks.
class ManageCoursePage extends React.Component {



  constructor(props, context) {

    // we should always pass props to the base constructor to initialize the state
    super(props, context);

    //Once we initialize the state we can add as many more properties as we want.
    //This are the properties that might change state
    this.state ={
      course: Object.assign({},this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  //This method it's useful to populate when the existing course is loaded
  componentWillReceiveProps(nextProps){
    if(this.props.course.id != nextProps.course.id){
      this.setState({course: Object.assign ({},nextProps.course)});
    }
  }





 //TODO: Analyse a bit more
  updateCourseState(event){
    const field = event.target.name; //this is the event on change of each field. For example: Title, Lenght, etc
    let course = Object.assign({},this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event){
    event.preventDefault();
    //Helper state to show a UI to let the user know the API save function has being called
    this.setState ({saving:true});
    this.props.actions.saveCourse(this.state.course)
                      .then(()=>this.redirect())
                      .catch(error=> {
                            toastr.error(error);
                            this.setState({saving:false});
                      });
  }

  redirect(){
    //Set the local state back to false
    this.setState ({saving:false});
    toastr.success('Course saved');

    //Ideally we shouldn't be using context as it is adviseable to use props and the state.
    //Moreover, with redux we can do most of this stuff. We will leave this context just as an example of how to use it.
    this.context.router.push('/courses');
  }


  render() {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}
        />
    );
  }
}




//This properties might not be exactly what we set in our state.
//This are the properties that we need for the page to render
ManageCoursePage.propTypes = {
  course  : PropTypes.object.isRequired,
  authors : PropTypes.array.isRequired,
  actions : PropTypes.object.isRequired
};

//Pulling the React Router context
ManageCoursePage.contextTypes= {
  router: PropTypes.object
};





function getCourseById(courses, id)
{
  const course = courses.filter(course=> course.id ==id);
  if(course){
    return course[0]; // as the result of the mapper is an array, we just select the first one
  }
  return null;
}


//We are adding ownProps as an extra parameter (in this case id via the URL) just because we need that parameter to process some information.
//However, ownProps is optional.
function mapStateToProps(state, ownProps) {

  //We are using the curse id to load (prepopulate) the information of that course in the form
  const courseId= ownProps.params.id;

  //Otherwise we just load the course empty so the user adds a new course
  let course = {id: '', watchHref:'',title:'',authorId:'',length:'', category:''};

  if(courseId && state.courses.length >0 )
  {
    course = getCourseById(state.courses, courseId );
  }

  //This is the place to transform data in the format we want
  const authorsFormattedForDropdown = state.authors.map(author =>{
        return {
          value: author.id,
          text:  author.firstName+' '+author.lastName
        };
});

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
