import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

function Education({ profile: { profile, loading }, deleteEducation }) {
  const { education } = profile;
  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        {education.map((edu) => (
          <tbody key={edu._id}>
            <tr>
              <td>{edu.school}</td>
              <td className="hide-sm">{edu.degree}</td>
              <td className="hide-sm">
                <Moment format="YY-MM-DD">{edu.from}</Moment> -
                {edu.current ? (
                  "Now"
                ) : (
                  <Moment format="YY-MM-DD">{edu.to}</Moment>
                )}
              </td>
              <td>
                <button
                  onClick={() => deleteEducation(edu._id)}
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
}

Education.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { deleteEducation })(Education);
