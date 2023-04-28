import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { getProfileById } from '../../actions/profile'
import {connect} from 'react-redux'

const Profile = ({match, getProfileById}) => {
  console.log(match.params.id)
  useEffect(() => {
    getProfileById(match.params.id)
  }, [])
  return (
    <div>Profile</div>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getProfileById})(Profile)