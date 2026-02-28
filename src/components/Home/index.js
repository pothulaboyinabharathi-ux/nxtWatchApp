import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const {isDarkTheme} = useContext(ThemeContext)

  const [videosList, setVideosList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const getHomeVideos = async () => {
      setApiStatus(apiStatusConstants.loading)

      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setVideosList(data.videos)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getHomeVideos()
  }, [searchInput])

  const renderVideos = () => (
    <ul>
      {videosList.map(video => (
        <li key={video.id}>
          <img src={video.thumbnail_url} alt="video thumbnail" />
          <p>{video.title}</p>
          <p>{video.channel.name}</p>
          <p>{video.view_count}</p>
          <p>{video.published_at}</p>
        </li>
      ))}
    </ul>
  )

  const renderFailureView = () => (
    <div>
      <img
        src={
          isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button">Retry</button>
    </div>
  )

  const renderLoader = () => <div data-testid="loader">Loading...</div>

  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideos()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return renderLoader()
    }
  }

  return (
    <>
      <Header />
      <div className="home-layout">
        <Sidebar />
        <div
          className={`home-container ${isDarkTheme ? 'dark' : 'light'}`}
          data-testid="home"
        >
          <input
            type="search"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button data-testid="searchButton" type="button">
            Search
          </button>

          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default Home
