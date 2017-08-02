import React , {PropTypes} from 'react';

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
    alert(`Saving ${this.state.course.title}`);
  }

 render(){
   return (
     <div>
       <h1>Courses</h1>
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

export default CoursesPage;
