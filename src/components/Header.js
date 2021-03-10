import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {
    const onClick = () => {
        console.log('click')
    }
    return (
        <header className='header'>
            <h3>{title}</h3>
            <Button color='steelblue' text='<back' onClick = {onClick}/>
            <Button color='steelblue' text='next>' onClick = {onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Ravel Trip List',
}

Header.propTypes = {
    title: PropTypes.string,
}

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }

export default Header
