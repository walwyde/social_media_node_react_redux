import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../../../actions/profile";
import PropTypes from "prop-types";

const updateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    status: "",
    website: "",
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  });

  const {
    company,
    status,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  const handleSocialInputs = () => {
    toggleSocialInputs(!displaySocialInputs)
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small className="text-danger">* = required field</small>
      <form className="form">
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            value={company}
            type="text"
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            value={website}
            type="text"
            placeholder="Website"
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            value={location}
            type="text"
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            value={skills}
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={(e) => onChange(e)}
            value={githubusername}
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => handleSocialInputs()}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

          {displaySocialInputs && (
            <Fragment>
        <div 
            className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input
            onChange={(e) => onChange(e)}
            value={twitter}
            type="text"
            placeholder="Twitter URL"
            name="twitter"
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input
            onChange={(e) => onChange(e)}
            value={facebook}
            type="text"
            placeholder="Facebook URL"
            name="facebook"
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input
            onChange={(e) => onChange(e)}
            value={youtube}
            type="text"
            placeholder="YouTube URL"
            name="youtube"
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input
            onChange={(e) => onChange(e)}
            value={linkedin}
            type="text"
            placeholder="Linkedin URL"
            name="linkedin"
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input
            onChange={(e) => onChange(e)}
            value={instagram}
            type="text"
            placeholder="Instagram URL"
            name="instagram"
          />
        </div>
          </Fragment>
          )}
        <input
          onClick={(e) => onSubmit(e)}
          type="submit"
          className="btn btn-primary my-1"
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

createProfile.PropTypes = {
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
export default connect(null, { createProfile })(withRouter(updateProfile));
