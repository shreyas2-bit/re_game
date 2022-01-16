import {useEffect,useState} from 'react'
import './App.css';
import SingleCard from './components/SingleCard'

const cardImg = [
  { "src" : "/img/helmet-1.png"},
  { "src" : "/img/potion-1.png"},
  { "src" : "/img/ring-1.png"},
  { "src" : "/img/scroll-1.png"},
  { "src" : "/img/shield-1.png"},
  { "src" : "/img/sword-1.png"}
]

function App() {

  const [cards,setCards] =  useState([])
  //turns
  const [turns,setTurns] = useState(0)

  //states for the card choices
  const[choice1,setChoice1] = useState(null)
  const[choice2,setChoice2] = useState(null)


  //card shuffling i.e. duplication x2
  const cardShuffler = () => {

    const shuffle = [...cardImg, ...cardImg] //spreading
    .sort(() => Math.random() - 0.5 )
    .map((card) => ({...card, id: Math.random()}))

    setCards(shuffle)
    setTurns(0)

  }

  // console.log(cards,turns)
  // choixce handler
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card)
  } 

  //comparision
  useEffect(() => {
    if(choice1 && choice2){
      if(choice1.src === choice2.src){
        console.log("cards match")
        resetTurn()
      }else{
        console.log("do not match")
        resetTurn()
      }
    }

  },[choice1,choice2]) //continuesly fires the fn


  //choice resetus and incr
  const resetTurn = () => {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurns => prevTurns+1 )
  }

  return (
    <div className="App">

      <h1>memo</h1>
      <button onClick={cardShuffler}>go!</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
