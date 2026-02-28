import {Link} from 'react-router-dom'
import {useContext} from 'react'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Sidebar = () => {
  const {isDarkTheme} = useContext(ThemeContext)

  return (
    <aside className={`sidebar ${isDarkTheme ? 'dark' : 'light'}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/trending">Trending</Link>
        </li>
        <li>
          <Link to="/gaming">Gaming</Link>
        </li>
        <li>
          <Link to="/saved-videos">Saved Videos</Link>
        </li>
      </ul>

      <div className="contact">
        <p>CONTACT US</p>
        <div className="social">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </div>
        <p>Enjoy! Now to see your channels and recommendations!</p>
      </div>
    </aside>
  )
}

export default Sidebar
