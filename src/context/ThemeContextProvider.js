import {useState} from 'react'
import ThemeContext from './ThemeContext'

const ThemeContextProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev)
  }

  const toggleSaveVideo = video => {
    setSavedVideos(prevVideos => {
      const isAlreadySaved = prevVideos.find(
        each => each.id === video.id,
      )

      if (isAlreadySaved) {
        return prevVideos.filter(each => each.id !== video.id)
      }

      return [...prevVideos, video]
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        savedVideos,
        toggleSaveVideo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider