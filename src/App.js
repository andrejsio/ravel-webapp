import { useState} from 'react'
import { FaTasks } from 'react-icons/fa'
import Header from './components/Header'
import Trips from './components/Trips'
import AddTrip from './components/AddTrip'

function App() {
  const [trips, setTrips] = useState([
    {
        id: 1,
        text: 'Trip to Hawaii',
        day: 'Feb 5th 2020',
        reminder: true,
    },
    {
        id: 2,
        text: 'Trip to Venice',
        day: 'Mar 5th 2021',
        reminder: true,
    }
])
  // Add Trip
  const addTrip = (trip) => {
    const id = Math.floor(Math.random() *10000) + 1
    const newTrip = {id, ...trip}
    setTrips([...trips, newTrip])
  }
  // Delete Trip
  const deleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id))
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTrips(
      trips.map((trip) => 
        trip.id == id ? { ...trip, reminder: 
          !trip.reminder} : trip
      )
    )
  }

  return (
    <div className='container'>
      <Header />
      <AddTrip onAdd={addTrip}/>
      {trips.length >0 ? <Trips trips={trips} onDelete={deleteTrip} onToggle={toggleReminder}/> : 'No Trips'}
    </div>
  );
}

export default App;
