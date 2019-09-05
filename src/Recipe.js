import React from 'react';
import style from './recipe.module.css';

//passed from props on app.js
const Recipe = ({title, calories, image, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ul>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ul>
            <strong>Calorie content:</strong>
            <p>{calories}</p>
            <img className={style.image} src={image} alt={title}/>
        </div>
    );
}

export default Recipe;