import { NavLink } from 'react-router-dom'

/**
 * Component for all routes that do not exist. Let's the user know they are somewhere they shouldn't be.
 * @returns the created component.
 */
const AccessDenied = () => {
    return (
        <div className='accessDenied'>
            <div className='container-translucent container-centered-content container-rounded-corners'>
                <h1>Halt, Adventurer!</h1>
                <h2>You've entered a restricted area. Turn back now, or be sent to the king's dungeons!</h2>
                <NavLink exact to='/'>Retreat to safety</NavLink>
            </div>
        </div>
    );
}

export default AccessDenied;