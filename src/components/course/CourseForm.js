import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import PropTypes from 'prop-types';

const CourseForm = ({course, allAuthors, onSave, onChange, saving, errors}) => {
    return (
        <form>
          <h1>Manage Courses</h1>
          <TextInput
          name="title"
          label="Title"
          placeholder="Title"
          value={course.title}
          onChange={onChange}
          error={errors.title}/>

          <SelectInput
          name="authorId"
          label="Author"
          value={course.authorId}
          defaultOption="Select Author"
          options={allAuthors}
          onChange={onChange}
          error={errors.authorId}
          />

          <TextInput
            name="category"
            label="Category"
            placeholder="Category"
            value={course.category}
            onChange={onChange}
            error={errors.category}/>
          <TextInput
            name="length"
            label="Length"
            placeholder="Length"
            value={course.length}
            onChange={onChange}
            error={errors.length}/>

          <input
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave}
          />

        </form>
    );
};


// As a good practice the props here should be the same as the parameter
CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    allAuthors : PropTypes.array,
    onSave : PropTypes.func.isRequired,
    onChange : PropTypes.func.isRequired,
    saving : PropTypes.bool,
    errors : PropTypes.object
};

export default CourseForm;
