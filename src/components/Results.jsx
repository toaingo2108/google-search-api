import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { useResultContext } from '../contexts/ResultContext'
import Loading from './Loading'
import { getResults } from '../contexts/apiCalls'

const Results = () => {
    const { results, isLoading, searchTerm, dispatch } = useResultContext()
    const location = useLocation()

    useEffect(() => {
        if (searchTerm) {
            if (location.pathname === '/video') {
                getResults(`/search/q=${searchTerm} video`, dispatch)
            } else {
                getResults(
                    `${location.pathname}/q=${searchTerm}&num=40`,
                    dispatch
                )
            }
        }
    }, [searchTerm, location.pathname, dispatch])

    if (isLoading) return <Loading />

    switch (location.pathname) {
        case '/search':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
                    {results?.map(({ link, title }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-sm">
                                    {link.length > 30
                                        ? link.substring(0, 30)
                                        : link}
                                </p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            )
        case '/image':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.map(({ image, link: { href, title } }, index) => (
                        <a
                            href={href}
                            className="sm:p-3 p-5"
                            key={index}
                            target="_blank"
                            rel="noreferrer">
                            <img
                                src={image?.src}
                                alt={title}
                                loading="lazy"
                                className=""
                            />
                            <p className="w-36 break-words text-sm mt-2">
                                {title}
                            </p>
                        </a>
                    ))}
                </div>
            )
        case '/news':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
                    {results?.map(({ link, source, title }, index) => (
                        <div key={index} className="md:w-2/5 w-full">
                            <a href={link} target="_blank" rel="noreferrer">
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                            <div className="flex gap-4">
                                <a
                                    className="hover:text-blue-300 hover:underline dark:hover:text-blue-700"
                                    href={source?.href}
                                    target="_blank"
                                    rel="noreferrer">
                                    {source?.href}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )
        case '/video':
            return (
                <div className="flex flex-wrap">
                    {results?.map((video, index) => (
                        <div key={index} className="p-2">
                            {video?.additional_links?.[0]?.href && (
                                <ReactPlayer
                                    url={video.additional_links?.[0].href}
                                    controls
                                    width="355px"
                                    height="200px"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )

        default:
            return 'ERROR'
    }
}

export default Results
