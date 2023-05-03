import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { addEdu } from "../../../actions/profile";
import { connect } from "react-redux";

const AddEducation = ({ addEdu, history, profile: { profile, loading } }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    description: "", 
  });
  const { school, degree, fieldofstudy, from, to, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addEdu(formData, history);
  };

  const [isChecked, setIsChecked] = useState(false);

  const checkedHandler = () => {
    setIsChecked(!isChecked);
  };

  return profile && !loading ? (
    <Fragment>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input
            value={school}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={degree}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            value={from}
            onChange={(e) => onChange(e)}
            type="date"
            name="from"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              value="current"
              onChange={checkedHandler}
              checked={isChecked}
              type="checkbox"
              name="current"
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            value={to}
            onChange={(e) => onChange(e)}
            type="date"
            name="to"
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={(e) => onChange(e)}
            value={description}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input
          onClick={(e) => onSubmit(e)}
          type="submit"
          className="btn btn-primary my-1"
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  ) : (
    <Fragment>
      <p className="bg-light my-1">
        {" "}
        <i className="fas fa-chevron-down"></i> Please Use This Link To Add
        Profile Information
      </p>{" "}
      <Link to="/create-profile" className="btn btn-primary">
        Create Profile
      </Link>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEdu: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addEdu })(withRouter(AddEducation));
