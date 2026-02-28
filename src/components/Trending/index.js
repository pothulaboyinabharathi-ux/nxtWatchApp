import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Trending = () => {
  const {isDarkTheme} = useContext(ThemeContext)

  const [videosList, setVideosList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading)

  useEffect(() => {
    const getTrendingVideos = async () => {
      setApiStatus(apiStatusConstants.loading)
      const jwtToken = Cookies.get('jwt_token')

      const response = await fetch('https://apis.ccbp.in/videos/trending', {
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
          publishedAt: video.published_at,
          channelName: video.channel.name,
        }))
        setVideosList(updated)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getTrendingVideos()
  }, [])

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderVideos = () => (
    <ul className="trending-videos">
      {videosList.map(video => (
        <li key={video.id} className="trending-video-item">
          <Link to={`/videos/${video.id}`}>
            <img src={video.thumbnailUrl} alt="video thumbnail" />
            <p>{video.title}</p>
            <p>{video.channelName}</p>
            <p>{video.viewCount}</p>
            <p>{video.publishedAt}</p>
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
          className={`trending-container ${isDarkTheme ? 'dark' : 'light'}`}
          data-testid="trending"
        >
          <div className="route-header">
            <HiFire />
            <h1>Trending</h1>
          </div>

          {apiStatus === apiStatusConstants.loading && renderLoader()}
          {apiStatus === apiStatusConstants.success && renderVideos()}
        </div>
      </div>
    </>
  )
}

export default Trending
