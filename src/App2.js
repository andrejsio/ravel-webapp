import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Trips from './components/Trips'
import AddTrip from './components/AddTrip'
import About from './components/About'

const App = () => {
  const [showAddTrip, setShowAddTrip] = useState(false)
  const [trips, setTrips] = useState([])

  useEffect(() => {
    const getTrips = async () => {
      const tripsFromServer = await fetchTrips()
      setTrips(tripsFromServer)
    }

    getTrips()
  }, [])

  // Fetch Trips
  const fetchTrips = async () => {
    const res = await fetch('http://localhost:5000/trips')
    const data = await res.json()

    return data
  }

  // Fetch Trip
  const fetchTrip = async (id) => {
    const res = await fetch(`http://localhost:5000/trips/${id}`)
    const data = await res.json()

    return data
  }

  // Add Trip
  const addTrip = async (trip) => {
    const res = await fetch('http://localhost:5000/trips', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(trip),
    })

    const data = await res.json()

    setTrips([...trips, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTrip = { id, ...trip }
    // setTrips([...trips, newTrip])
  }

  // Delete Trip
  const deleteTrip = async (id) => {
    const res = await fetch(`http://localhost:5000/trips/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTrips(trips.filter((trip) => trip.id !== id))
      : alert('Error Deleting This Trip')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const tripToToggle = await fetchTrip(id)
    const updTrip = { ...tripToToggle, reminder: !tripToToggle.reminder }

    const res = await fetch(`http://localhost:5000/trips/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTrip),
    })

    const data = await res.json()

    setTrips(
      trips.map((trip) =>
        trip.id === id ? { ...trip, reminder: data.reminder } : trip
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTrip(!showAddTrip)}
          showAdd={showAddTrip}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTrip && <AddTrip onAdd={addTrip} />}
              {trips.length > 0 ? (
                <Trips
                  trips={trips}
                  onDelete={deleteTrip}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Trips To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App