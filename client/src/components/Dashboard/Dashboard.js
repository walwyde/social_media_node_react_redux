import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Experience from "./Experience";
import Education from "./Education";
import { spinner } from "../layouts/Spinner";
import DashboardActions from "./DashboardActions";
import { deleteAccount } from "../../actions/profile";

const Dashboard = ({
  loadCurrentProfile,
  deleteAccount,
  auth: { user, isAuthenticated },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    loadCurrentProfile();
  }, []);
  return loading && profile === null ? (
    spinner()
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> welcome {user ? user.name : "Anonymous"}
      </p>
      <DashboardActions />
      {!loading && profile === null ? (
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
      ) : (
        <Fragment>
         { profile.experience.length > 0 && (<Experience />) }
          { profile.education.length > 0 && <Education /> }
        </Fragment>
      )}
      <div className="my-2">
        <button 
        onClick={(e) => {
          e.preventDefault();
          deleteAccount()}} 
        className="btn btn-danger">
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  loadCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadCurrentProfile, deleteAccount })(Dashboard);
