import {useContext} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const SavedVideos = () => {
  const {savedVideos, isDarkTheme} = useContext(ThemeContext)

  const renderNoSavedVideos = () => (
    <div className="no-saved-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  const renderSavedVideos = () => (
    <>
      <h1 className="saved-heading">Saved Videos</h1>
      <ul className="saved-videos-list">
        {savedVideos.map(video => (
          <li key={video.id} className="saved-video-item">
            <Link to={`/videos/${video.id}`}>
              <img src={video.thumbnailUrl} alt="video thumbnail" />
              <p>{video.title}</p>
              <p>{video.channel.name}</p>
              <p>{video.viewCount}</p>
              <p>{video.publishedAt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <>
      <Header />
      <div className="route-layout">
        <Sidebar />
        <div
          className={`saved-container ${isDarkTheme ? 'dark' : 'light'}`}
          data-testid="savedVideos"
        >
          {savedVideos.length === 0
            ? renderNoSavedVideos()
            : renderSavedVideos()}
        </div>
      </div>
    </>
  )
}

export default SavedVideos
