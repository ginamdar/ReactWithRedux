import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';

const ManageCoursePage = ({courses, authors, loadAuthors, loadCourses}) => {
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(err => console.error(err));
    }
    if (authors.length === 0) {
      loadAuthors().catch(err => console.error(err));
    }
  }, [])

  return (
    <>
      <h2>Manage Course</h2>
    </>
  )
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    authors: state.authors
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
