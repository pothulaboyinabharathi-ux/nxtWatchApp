import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {useContext} from 'react'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => {
  const {isDarkTheme, toggleTheme} = useContext(ThemeContext)

  const logoUrl = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  const onConfirmLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className={`header ${isDarkTheme ? 'dark' : 'light'}`}>
      <Link to="/">
        <img src={logoUrl} alt="website logo" className="logo" />
      </Link>

      <div className="header-actions">
        <button
          type="button"
          data-testid="theme"
          onClick={toggleTheme}
          className="icon-btn"
        >
          Theme
        </button>

        <Popup modal trigger={<button type="button">Logout</button>}>
          {close => (
            <div className="popup-content">
              <p>Are you sure, you want to logout</p>
              <div className="popup-actions">
                <button type="button" onClick={() => close()}>
                  Cancel
                </button>
                <button type="button" onClick={onConfirmLogout}>
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
