import {useContext} from 'react'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

import './index.css'

const NotFound = () => {
  const {isDarkTheme} = useContext(ThemeContext)

  const notFoundImg = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

  return (
    <>
      <Header />
      <div className="notfound-layout">
        <Sidebar />
        <div className={`notfound-container ${isDarkTheme ? 'dark' : 'light'}`}>
          <img src={notFoundImg} alt="not found" className="notfound-img" />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    </>
  )
}

export default NotFound
