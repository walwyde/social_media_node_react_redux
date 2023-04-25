import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { spinner } from "../layouts/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

function profiles({ getProfiles, profile: { loading, profiles } }) {
  useEffect(() => {
    getProfiles();
  }, []);
  return;
  <Fragment>
    {loading ? (
      <spinner />
    ) : (
      <Fragment>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"></i>
          Browse And Connect With Developers
        </p>
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : (
            <h4>No Profiles Found</h4>
          )}
        </div>
      </Fragment>
    )}
  </Fragment>;
}

profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(profiles);
