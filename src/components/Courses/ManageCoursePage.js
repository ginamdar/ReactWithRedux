import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

const ManageCoursePage = ({courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props}) => {
  const [ course, setCourse ] = useState({...props.course});
  const [ errors, setErrors ] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(err => console.error(err));
    } else {
      setCourse({...props.course});
    }
    if (authors.length === 0) {
      loadAuthors().catch(err => console.error(err));
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push('/courses');
    });
  }

  return (
    <CourseForm errors={errors} authors={authors} course={course} onSave={handleSave} onChange={handleChange}></CourseForm>
  )
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}
const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length ? getCourseBySlug(state.courses, slug) : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);