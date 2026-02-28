import {useContext} from 'react'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const FailureView = ({retry}) => {
  const {isDarkTheme} = useContext(ThemeContext)

  const failureImg = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

  return (
    <div className="failure-container">
      <img src={failureImg} alt="failure view" />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble. Please try again.</p>
      <button type="button" onClick={retry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
