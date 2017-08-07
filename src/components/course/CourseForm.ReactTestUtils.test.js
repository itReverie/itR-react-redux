import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';


function setup(savingParameter){
  let props = {
    course: {}, saving: savingParameter, errors:{},
    onSave: () => {},
    onChange:() => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();

  return {
          props,
          output,
          renderer
        };
}

//group and label your tests
describe ('CourseForm via React Test Utils', ()=>{

  it('renders a form and h1', () =>{
    //This is what we are going to render
    const { output } = setup();
    expect(output.type).toBe('form');

    // lets destructured the array from teh first element to see what is rendering
    let [ h1 ] = output.props.children; // take the first element
    expect(h1.type).toBe('h1');
  });

  it('save button is labeled "Save" when not saving', ()=>{
    const {output} = setup(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', ()=>{
    const {output} = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  });

});
