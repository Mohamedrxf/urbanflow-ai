import { createBrowserRouter } from 'react-router-dom'

const Home = () => <h1>UrbanFlow AI</h1>

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])
