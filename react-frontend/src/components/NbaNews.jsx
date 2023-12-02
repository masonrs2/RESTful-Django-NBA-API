import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TrimText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substr(0, maxLength) + '...'
  }
  return text
} 

const convertDateDay = (date) => {
  const today = new Date();
  const day = today.getDate();
  
  if (date.length === 2 && date[0] === '0') {
    return Math.abs(day-parseInt(date[1]))
  }
  return day-date
}

const NbaNews = () => {
  const [newsData, setNewsData] = useState([])
  const fetchNewsData = () => {
    const url = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?page=2&limit=50`
    fetch(url)
    .then(response => {
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then(fetchedData => {
      console.log("fetchedData: ", fetchedData)
      setNewsData(fetchedData)

    })
  }

  useEffect(() => {
    fetchNewsData()
    
  }, [])
  return (
    <div className='flex w-screen h-full pt-12 px-16 md:px-20 lg:px-24 xl:px-32 2xl:px-48' >
      <div className='flex flex-col gap-6 text-zinc-400 lg:grid lg:grid-cols-2 2xl:grid-cols-3 ' >
        {
          newsData?.articles?.map((article, index) => (
            <a href={article?.links?.web?.href}  key={index} className="flex lg:flex-col p-2 rounded-xl shadow-xl outline outline-1 outline-gray-400 cursor-pointer">
              <img className="w-64 xl:h-96 object-contain xl:object-cover lg:w-full rounded-xl" src={article?.images[0]?.url} />
              <div className="ml-4 lg:ml-0 mt-3" >
                <h1 className="font-semibold text-md md:text-md lg:text-lg xl:text-xl ">{article?.headline}</h1>
                <p className="text-zinc-300 text-sm md:text-md xl:text-lg">{TrimText(article?.description, 150)}</p>
                <div className="flex gap-1 text-sm mt-2 text-gray-400 font-medium">
                  <p>{convertDateDay(article?.published.split('-')[2]?.split('T')[0])}d</p>
                  <p>•</p>
                  <p>{article?.byline ? article?.byline : "Johnny Jones"}</p>
                </div>
              </div>
            </a>
          ))
        }
      </div>
    </div>
  )
}

export default NbaNews