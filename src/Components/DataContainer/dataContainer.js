import React, { useState, useEffect } from 'react';
import "./dataContainer.css"

function DataContainer(props) {
  const apiKey = 'pqd0q2AfrAoEMJVW41jlMXoOlxUItXhA';
  const [articles, setArticles] = useState([])
  const [filter, setFilter] = useState('home')
  const [keyword, setKeyword] = useState('');
  const [error,setError] =useState('')
  const [quantity, setQuantity] =useState(0)
  const [timezone, setTimezone] =useState(true);
  const filterOptions = ['home', 'arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health',  'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', "smarter-living", 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']

  const handleKeywordChange = (event) =>{
      event.preventDefault()
      setKeyword(event.target.value)
}

const changeSection = (event,value) =>{
    event.preventDefault();
    setFilter(event.target.value)
}


const getResults = (event) =>{
    let newArticles = [];
    event.preventDefault();
    if(!keyword){
       setError('Please enter a keyword')
       return
    } else {
        fetch(`https://api.nytimes.com/svc/topstories/v2/${filter}.json?api-key=${apiKey}`)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
            data.results.forEach(result=>{
            if(result.title.split(" ").includes(keyword) ){
                newArticles.push(result)
            }
        })
        })
        .then(()=>{
            setArticles(newArticles)
            setKeyword('')
            setQuantity(newArticles.length)
        })
   }
  };

  return (
   <section className='mainForm'>
         <p>Enter a keyword to start your search!</p>
        <form  className='mainForm'>
        <label>
            Keyword:
            <input type="text" name='keyword' className='keyword' value={keyword} onChange={handleKeywordChange}/>
        </label>
        <label>
                Select a category:
                <select onChange={changeSection}>
                    {filterOptions.map(option=>{
                    return <option value={option}>{option}</option>
                    })}
        
                </select>
            </label>
        <button onClick={getResults}className='button'>Search</button>
        {error?<span className="error">{error}</span>:''}
        </form>
        {articles.length===0?"":
        <div>
            <p>Showing {articles.slice(0,10).length} of {quantity} articles</p>
            <button className='button' onClick={(event)=>{
                event.preventDefault();
                setTimezone(!timezone)
            }}>Change timezone</button>
            {articles.slice(0,10).map(article=>{
                // This date keeps coming back as CST. Subtracting 1 hour to convert to EST
                let rawTime = new Date(article.published_date);
                let zone = timezone?rawTime:rawTime.setHours(rawTime.getHours()+16)
                let finalTime = new Date(zone).toLocaleString("en-US");
                    return (
                        <article className="article">
                            <h3>{article.title}</h3>
                            <a href={article.url} rel="noopener noreferrer" target="_blank">{article.url}</a>
                            <p>{article.abstract}</p>
                            {timezone?<span>Published on: {finalTime} EST</span>:<span>Published on: {finalTime} FJT</span>}
                        
                        </article>
                        )
            })}
       </div>}
   </section>
  );
}

export default DataContainer;


/* {articles.length===0?"":
        <div>
            <label>
                Select a category:
                <select onChange={handleChange}>
                    {filterOptions.map(option=>{
                    return <option value={option}>{option}</option>
                    })}
        
                </select>
            </label>
            <p>Showing {a.slice(0,10).length} of {quantity} articles</p>
            <button className='button' onClick={(event)=>{
                event.preventDefault();
                setTimezone(!timezone)
            }}>Change timezone</button>
            {articles.slice(0,10).map(article=>{
                // This date keeps coming back as CST. Subtracting 1 hour to convert to EST
                let rawTime = new Date(article.published_date);
                let zone = timezone?rawTime:rawTime.setHours(rawTime.getHours()+16)
                let finalTime = new Date(zone).toLocaleString("en-US");
                    return (
                        <article className="article">
                            <h3 onClick={()=>{console.log(article.published_date.toISOString())}}>{article.title}</h3>
                            <a href={article.url} rel="noopener noreferrer" target="_blank">{article.url}</a>
                            <p>{article.abstract}</p>
                            {timezone?<span>Published on: {finalTime} EST</span>:<span>Published on: {finalTime} FJT</span>}
                        
                        </article>
                        )
            })}
       </div>}
      {articles.length===0?"":articles.slice(0,10).map(article=>{
          // This date keeps coming back as CST. Subtracting 1 hour to convert to EST
          let rawTime = new Date(article.published_date);
          let zone = timezone?rawTime:rawTime.setHours(rawTime.getHours()+16)
          let finalTime = new Date(zone).toLocaleString("en-US");
            return (
                <article className="article">
                    <h3 onClick={()=>{console.log(article.published_date.toISOString())}}>{article.title}</h3>
                    <a href={article.url} rel="noopener noreferrer" target="_blank">{article.url}</a>
                    <p>{article.abstract}</p>
                    {timezone?<span>Published on: {finalTime} EST</span>:<span>Published on: {finalTime} FJT</span>}
                   
                </article>
                )
        })} */