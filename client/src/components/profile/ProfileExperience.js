import React from "react";
import PropTypes from "prop-types";

const ProfileExperience = ({
  experience,
}) => {
  return (
    experience.length > 0 && (<div>
      <h2 className="text-primary">Experience</h2>
      {experience.map((exp, index) => (
        <div key={index}>
          <h3 className="text-dark">{exp.company}</h3>
          <p>
            {exp.from} - {exp.to ? exp.to : exp.current}
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
    </div>)
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
