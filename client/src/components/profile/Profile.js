import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Spinner } from "../layouts/Spinner";
import { getProfileById } from "../../actions/profile";
import { connect } from "react-redux";

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  console.log(match.params.id);
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (<Fragment>
        <Link to="/profiles" className="btn btn-primary">
          Back to profiles
        </Link>

        {auth.isAuthenticated &&
          loading === false &&
          auth.user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-primary">
              Edit User
            </Link>
          )}

        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
