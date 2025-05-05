import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import RecipeItems from '../components/RecipeItems'

const Home = () => {
  const navigate = useNavigate()
   const [isOpen , setIsOpen] = useState(false)

  const addRecipe = ()=>{
    let token = localStorage.getItem("token")
    if(token)
         navigate ("/addRecipe")
    else{
     setIsOpen(true)
     }
  }

  return (
    <>
      <section className='home'>
         <div className='left'>
            <h1>Food Recipe</h1>
            <h5>Food is more than just fuel — it's a feeling, a memory, a moment shared. In every home-cooked meal, there's a little bit of love, a sprinkle of tradition, and a dash of comfort. Good food brings people together, tells stories without words, and fills both the belly and the soul with warmth. Happiness, after all, is often found in the aroma of spices and the clinking of spoons around the table.</h5>
            <button onClick={addRecipe}>Share Your Recipe</button>
         </div>
         <div className='right'>
             <img src={foodRecipe} width='320px' height='300px' alt="" />
         </div >
          
      </section>
       <div className='bg'>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,128L30,112C60,96,120,64,180,85.3C240,107,300,181,360,186.7C420,192,480,128,540,106.7C600,85,660,107,720,128C780,149,840,171,900,197.3C960,224,1020,256,1080,240C1140,224,1200,160,1260,128C1320,96,1380,96,1410,96L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
       </div>
       {(isOpen) && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
            <div className='recipe'>
                <RecipeItems />
       </div>
    </>
  )
}

export default Home
