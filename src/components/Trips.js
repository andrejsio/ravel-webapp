import Trip from './Trip'

const Trips = ({ trips, onDelete, onToggle }) => {
  return (
    <>
      {trips.map((trip, index) => (
        <Trip key={index} trip={trip} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  )
}

export default Trips