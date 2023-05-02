import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { getRepos } from '../../actions/profile'
import { connect } from 'react-redux'

const GithubRepos = ({profile: {profile, repos}, getRepos}) => {
  useEffect(() => {
    getRepos(profile.githubusername)
  }, [getRepos])

  return (
    <div>
      <h2 class="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
         {repos.length > 0 ? 
           repos.map((repo, index) => ( 
              <div key={index} className="repo bg-white p-1 my-1">
            <div>
              <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
                {repo.description}
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">{repo.language}</li>
                <li className="badge badge-dark">Watchers: {repo.watchers}</li>
                <li className="badge badge-light">Forks: {repo.forks}</li>
              </ul>
            </div>
              </div>
           ) ) : <h4>No Github Repos Found</h4>}
    </div>
  )
}

GithubRepos.propTypes = {
  state: PropTypes.object.isRequired,
  getRepos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getRepos})(GithubRepos)