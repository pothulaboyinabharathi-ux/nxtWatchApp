import {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const VideoItemDetails = () => {
  const {id} = useParams()
  const {isDarkTheme, savedVideos, toggleSaveVideo} = useContext(ThemeContext)

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.loading)
  const [video, setVideo] = useState({})
  const [likeStatus, setLikeStatus] = useState('NONE')

  useEffect(() => {
    const getVideoDetails = async () => {
      setApiStatus(apiStatusConstants.loading)
      const jwtToken = Cookies.get('jwt_token')

      const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const v = data.video_details
        setVideo({
          id: v.id,
          title: v.title,
          videoUrl: v.video_url,
          viewCount: v.view_count,
          publishedAt: v.published_at,
          description: v.description,
          channel: {
            name: v.channel.name,
            profileImageUrl: v.channel.profile_image_url,
            subscriberCount: v.channel.subscriber_count,
          },
        })
        setApiStatus(apiStatusConstants.success)
      }
    }

    getVideoDetails()
  }, [id])

  const isSaved = savedVideos.some(each => each.id === video.id)

  const onClickLike = () => setLikeStatus('LIKE')
  const onClickDislike = () => setLikeStatus('DISLIKE')
  const onClickSave = () => toggleSaveVideo(video)

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => (
    <div className="video-details-content">
      <ReactPlayer url={video.videoUrl} width="100%" />

      <p className="video-title">{video.title}</p>

      <div className="video-stats">
        <p>{video.viewCount}</p>
        <p>{video.publishedAt}</p>

        <div className="actions">
          <button
            type="button"
            onClick={onClickLike}
            className={likeStatus === 'LIKE' ? 'active-btn' : 'inactive-btn'}
          >
            <BiLike /> Like
          </button>

          <button
            type="button"
            onClick={onClickDislike}
            className={likeStatus === 'DISLIKE' ? 'active-btn' : 'inactive-btn'}
          >
            <BiDislike /> Dislike
          </button>

          <button
            type="button"
            onClick={onClickSave}
            className={isSaved ? 'active-btn' : 'inactive-btn'}
          >
            <BiListPlus /> {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <hr />

      <div className="channel-section">
        <img src={video.channel.profileImageUrl} alt="channel logo" />
        <div>
          <p>{video.channel.name}</p>
          <p>{video.channel.subscriberCount}</p>
        </div>
      </div>

      <p className="description">{video.description}</p>
    </div>
  )

  return (
    <>
      <Header />
      <div className="route-layout">
        <Sidebar />
        <div
          className={`video-details-container ${
            isDarkTheme ? 'dark' : 'light'
          }`}
          data-testid="videoItemDetails"
        >
          {apiStatus === apiStatusConstants.loading
            ? renderLoader()
            : renderSuccessView()}
        </div>
      </div>
    </>
  )
}

export default VideoItemDetails
