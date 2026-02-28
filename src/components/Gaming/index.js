import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
}

const Gaming = () => {
  const {isDarkTheme} = useContext(ThemeContext)

  const [videosList, setVideosList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading)

  useEffect(() => {
    const getGamingVideos = async () => {
      setApiStatus(apiStatusConstants.loading)
      const jwtToken = Cookies.get('jwt_token')

      const response = await fetch('https://apis.ccbp.in/videos/gaming', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const updated = data.videos.map(video => ({
          id: video.id,
          title: video.title,
          thumbnailUrl: video.thumbnail_url,
          viewCount: video.view_count,
        }))
        setVideosList(updated)
        setApiStatus(apiStatusConstants.success)
      }
    }

    getGamingVideos()
  }, [])

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderVideos = () => (
    <ul className="gaming-videos">
      {videosList.map(video => (
        <li key={video.id} className="gaming-video-item">
          <Link to={`/videos/${video.id}`}>
            <img src={video.thumbnailUrl} alt="video thumbnail" />
            <p>{video.title}</p>
            <p>{video.viewCount}</p>
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <Header />
      <div className="route-layout">
        <Sidebar />
        <div
          className={`gaming-container ${isDarkTheme ? 'dark' : 'light'}`}
          data-testid="gaming"
        >
          <div className="route-header">
            <SiYoutubegaming />
            <h1>Gaming</h1>
          </div>

          {apiStatus === apiStatusConstants.loading && renderLoader()}
          {apiStatus === apiStatusConstants.success && renderVideos()}
        </div>
      </div>
    </>
  )
}

export default Gaming
