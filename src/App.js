import { useState } from 'react'
import { Routes as Switch, Route, Navigate } from 'react-router-dom'

import { Footer, Navbar, Results } from './components'

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false)

    return (
        <div className={darkTheme ? 'dark' : ''}>
            <div className="bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-gray-200">
                <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <div className="p-4">
                    <Switch>
                        <Route path="/" element={<Navigate to="/search" />} />
                        {['/search', '/image', '/news', '/video'].map(
                            (path) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={<Results />}
                                />
                            )
                        )}
                    </Switch>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default App
