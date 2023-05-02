import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ education }) => {
  return (
    education.length > 0 &&
    education.map((edu, index) => (
      <div key={index}>
        <h3 className="text-dark">{edu.school}</h3>
        <p>
          {<Moment format="DD/MM/YYYY">{edu.from}</Moment>} -{" "}
          {edu.to ? <Moment format="DD/MM/YYYY">{edu.to}</Moment> : "Now"}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          <strong>Description: </strong>
          {edu.description}
        </p>
      </div>
    ))
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
