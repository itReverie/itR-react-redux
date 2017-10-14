import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import PropTypes from 'prop-types';

class ManageCoursePage extends React.Component {



  constructor(props, context) {
    super(props, context);
    this.state ={
      course: Object.assign({},this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  //This method it's usefulto populate when the existing course is loaded
  componentWillReceiveProps(nextProps){
    if(this.props.course.id != nextProps.course.id){
      this.setState({course: Object.assign ({},nextProps.course)});
    }
  }





 //TODO: Analyse a bit more
  updateCourseState(event){
    const field = event.target.name;
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


function mapStateToProps(state, ownProps) {

  const courseId= ownProps.params.id;

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
