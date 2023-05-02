import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Spinner } from "../layouts/Spinner";
import { getProfileById } from "../../actions/profile";
import Profiletop from "./Profiletop";
import { connect } from "react-redux";
import Profileabout from "./Profileabout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import GithubRepos from "./GithubRepos";
import { getRepos } from "../../actions/profile";

const Profile = ({
  match,
  getProfileById,
  profile: { profile },
  auth,
  getRepos,
}) => {
  console.log(profile);
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);
  return (
    <Fragment>
      {profile === null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-primary">
            Back to profiles
          </Link>

          {auth.isAuthenticated &&
            profile.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-primary">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <Profiletop profile={profile} />
          </div>
          <div className="profile-about bg-light p-2">
            <Profileabout profile={profile} />
          </div>
          <div className="profile-exp bg-white p-2">
            <ProfileExperience experience={profile.experience} />
          </div>
          <div className="profile-edu bg-white p-2">
            <ProfileEducation education={profile.education} />
          </div>
          <div class="profile-github">
            <GithubRepos profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById, getRepos })(Profile);
