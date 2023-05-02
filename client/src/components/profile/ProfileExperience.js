import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ experience }) => {
  return (
    experience.length > 0 && (
      <div>
        <h2 className="text-primary">Experience</h2>
        {experience.map((exp, index) => (
          <div key={index}>
            <h3 className="text-dark">{exp.company}</h3>
            <p>
              <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
              {exp.to ? <Moment format="DD/MM/YYYY">{exp.to}</Moment> : "Now"}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    )
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
