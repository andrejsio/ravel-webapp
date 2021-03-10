import { FaTimes } from 'react-icons/fa'

const Trip = ({ trip, onDelete, onToggle }) => {
  return (
    <div
      className={`trip ${trip.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(trip.id)}
    >
      <h3>
        {trip.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(trip.id)}
        />
      </h3>
      <p>{trip.day}</p>
    </div>
  )
}

export default Trip
