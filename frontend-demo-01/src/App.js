import React, { useRef, useState } from 'react'
import axios from 'axios'
import Confetti from 'react-dom-confetti'
import './App.scss'


const API_ENDPOINT = 'https://pixabay.com/api/'
const API_KEY = '13417145-d0c367819415b077de5e950e3'

function App() {
    const input = useRef(null)
    const [images, setImages] = useState([])

    const search = async () => {
        const q = input.current.value
        console.log(`searching for ${q}`)

        const { data } = await axios.get(API_ENDPOINT, {
            params: {
                key: API_KEY,
                per_page: 50,
                q
            }
        })

        setImages(data.hits)
    }
  return (
      <div className='root'>
        <header>
          <h1>Frontend DEMO</h1>
        </header>

        <section className='search'>
            <input ref={input} />
            <button onClick={search}>SEARCH?</button>
            <Confetti active={!!images.length} />

        </section>
        <section className='images'>
           {images.map(image => (
               <img key={image.id} src={image.previewURL} height={100} alt={image.id} />
           ))}
        </section>
      </div>
  );
}

export default App;
