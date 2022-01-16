import {useEffect,useState} from 'react'
import './App.css';
import SingleCard from './components/SingleCard'

const cardImg = [
  { "src" : "/img/EZ.png",matched: false},
  { "src" : "/img/feelsStrong.png",matched: false},
  { "src" : "/img/sadge.png",matched: false},
  { "src" : "/img/pepega.png",matched: false},
  { "src" : "/img/monkaW.png",matched: false},
  { "src" : "/img/pepehands.png",matched: false}
]

function App() {

  const [cards,setCards] =  useState([])
  //turns
  const [turns,setTurns] = useState(0)

  //states for the card choices
  const[choice1,setChoice1] = useState(null)
  const[choice2,setChoice2] = useState(null)
  const[disabled,setDisabled] = useState(false)


  //card shuffling i.e. duplication x2
  const cardShuffler = () => {

    const shuffle = [...cardImg, ...cardImg] //spreading
    .sort(() => Math.random() - 0.5 )
    .map((card) => ({...card, id: Math.random()}))
    
    //reset choice 1&2
    setChoice1(null)
    setChoice2(null)

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
        setDisabled(true)
        
        console.log("cards match")
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src===choice1.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        console.log("do not match")
        setTimeout(() => resetTurn(), 600)
      }
    }

  },[choice1,choice2]) //continuesly fires the fn

  console.log(cards)
  //choice resetus and incr
  const resetTurn = () => {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurns => prevTurns+1 )
    setDisabled(false)
  }

  //automatically start
  useEffect(()=> {
    cardShuffler()

  }, [])

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
            flipped={card===choice1 || card ===choice2 || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>

    </div>
  );
}

export default App;
