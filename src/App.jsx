import { useState, createContext, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Profile from './Components/Profile'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'

export const AppContext = createContext()

function App() {
  const [user, setUser] = useState()
  const [posts, setPosts] = useState()
  const[friendList, setFriendList] = useState()

  //fetch main profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://boolean-uk-api-server.fly.dev/josteinruen/contact/1')
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [])

  //fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://boolean-uk-api-server.fly.dev/josteinruen/post')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  //fetch all contacts
  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const response = await fetch('https://boolean-uk-api-server.fly.dev/josteinruen/contact')
        const data = await response.json()
        setFriendList(data)
      } catch (error) {
        console.error('Error fetching friend list:', error)
      }
    }

    fetchFriendList()
  }, [])


  return (
    <>
      <div>
        <AppContext.Provider value={{user, setUser, posts, setPosts}}>
          <div className="App">
            <Header/>
            <Sidebar/>
            <main>
              <Routes>
                
                <Route path="/profile" element={<Profile/>} />
              </Routes>
            </main>
          </div>
        </AppContext.Provider>
      </div>

    </>
  )
}

export default App
