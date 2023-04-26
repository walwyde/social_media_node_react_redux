import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { getProfileById } from '../../actions/profile'

const Profile = ({match}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [])
  return (
    <div>Profile</div>
  )
}

Profile.propTypes = {}

export default Profile