import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state ={
      course: Object.assign({},this.props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
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
    this.props.actions.saveCourse(this.state.course);
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
}

function mapStateToProps(state) {
  let course = {id: '', watchHref:'',title:'',authorId:'',length:'', category:''};

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
