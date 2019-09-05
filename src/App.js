import React, {useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = '';
  const APP_KEY = '';

const [recipies, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('chicken'); //display chicken recipes on load

//executed the first time the page renders
//also executed after everytime something re-renders
//here is where we should fetch api data etc.
useEffect( () => {
  getRecipes();
}, [query]); //because of [] it will only run the first time the page rendered
//if you pass an argument into the [] it will only run when that argument changes etc

//make asynchronous call to api
const getRecipes = async () => {
  //can write as a promise and .then() etc
  //won't get immediate response so must 'await' --> we don't know how long external data will take to come back
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  //when data comes back make it into a json obj
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
}

const handleOnChange = e => {
  setSearch(e.target.value);  
};

const getSearch = e =>{
  //stop page refreshing
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={handleOnChange} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipies">
      {recipies.map(recipe => (
        //taking data from state (line 11) and passing to props then passed to Recipe component
        //add props to pull data from json returned by api and send them to recipe component
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))} 
      </div>     
    </div>
  )
}

export default App;
