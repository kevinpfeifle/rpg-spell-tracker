import { NavLink } from 'react-router-dom'

/**
 * Component for all routes that do not exist. Let's the user know they are somewhere they shouldn't be.
 * @returns the created component.
 */
const RouteNotFound = () => {
    return (
        <div className='noPage'>
            <div className='container-translucent container-centered-content container-rounded-corners'>
                <h1>Halt, Adventurer!</h1>
                <h2>A wild Owlbear blocks your path! It is time to retreat - turn back now!</h2>
                <NavLink exact to='/'>Retreat to safety</NavLink>
            </div>
        </div>
    );
}

export default RouteNotFound;