import React, { useState } from 'react';
import "./dataContainer.css"

function DataContainer() {
  const apiKey = 'pqd0q2AfrAoEMJVW41jlMXoOlxUItXhA';
  const [articles, setArticles] = useState([])
  const [filter, setFilter] = useState('home')
  const [keyword, setKeyword] = useState('');
  const [error,setError] =useState('')
  const [quantity, setQuantity] =useState(0)
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
            if(result.abstract.split(" ").includes(keyword) ){
                newArticles.push(result)
            } else if(result.abstract.split(" ").includes(keyword[0].toUpperCase()+keyword.slice(1))){
                
                newArticles.push(result)
            } else if(result.abstract.split(" ").includes(keyword.toLowerCase())){
                newArticles.push(result)
            }
        })
        })
        .then(()=>{
            setError("")
            setArticles(newArticles)
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
        <p>Showing {articles.slice(0,10).length} of {quantity} articles</p>
        {error?<span className="error">{error}</span>:''}
        </form>
        {articles.length===0?"":
        <div style={{display:'flex',flexWrap:'wrap'}}>
            {articles.slice(0,10).map(article=>{
                let rawTime = new Date(article.published_date);
                let finalTime = new Date(rawTime).toLocaleString('en-US',{timezone:'ET'});
                    return (
                        <article className="article">
                            <h3>{article.title}</h3>
                            <a href={article.url} rel="noopener noreferrer" target="_blank">{article.url}</a>
                            <p>{article.abstract}</p>
                            <span>Published on: {finalTime} EST</span>
                        </article>
                        )
            })}
       </div>}
   </section>
  );
}

export default DataContainer;
