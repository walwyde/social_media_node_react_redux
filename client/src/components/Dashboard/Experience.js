import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = ({
  deleteExperience,
  profile: { profile },
}) => {
  const onExperienceDelete = (id, e) => {
    e.preventDefault();
    deleteExperience(id);
  }
  const { experience } = profile;
  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        {experience.map((exp) => (
          <tbody key={exp._id}>
            <tr>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.title}</td>
              <td className="hide-sm">
                <Moment format="YY-MM-DD">{exp.from}</Moment> -{" "}
                {exp.current ? (
                  "Now"
                ) : (
                  <Moment format="YY-MM-DD">{exp.to}</Moment>
                )}
              </td>
              <td>
                <button
                  onClick={(e) => onExperienceDelete(exp._id, e)}
                  className="btn btn-danger"
                >
                  Delete 
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

Experience.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { deleteExperience })(Experience);
