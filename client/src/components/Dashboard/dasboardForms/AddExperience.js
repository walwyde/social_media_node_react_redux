import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { addExp } from "../../../actions/profile";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const AddExperience = ({ addExp, history, profile: { profile, loading } }) => {
  const [isCurrent, setIsCurrent] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    description: "",
    current: isCurrent,
  });

  const { title, company, location, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChecked = (e) => {
    setIsCurrent(!isCurrent);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addExp(formData, history);
  };

  return profile && !loading ? (
    <Fragment>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            value={title}
            type="text"
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            value={company}
            type="text"
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            value={location}
            type="text"
            placeholder="Location"
            name="location"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            onChange={(e) => onChange(e)}
            value={from}
            type="date"
            name="from"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              value={current}
              checked={isCurrent}
              onChange={(e) => onChecked(e)}
              type="checkbox"
              name="current"
            />{" "}
            Current Job {isCurrent ? "true" : "false"}
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            onChange={(e) => onChange(e)}
            value={to}
            type="date"
            name="to"
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={(e) => {
              onChange(e);
            }}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
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

AddExperience.propTypes = {
  addExp: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { addExp })(withRouter(AddExperience));
