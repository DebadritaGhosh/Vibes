import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
const Nav = ({ setLibraryStatus, libraryStatus }) => {
    return (
        <nav>
            <h1>Vibes.</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library &nbsp;
                <FontAwesomeIcon 
                icon={faMusic} 
                color="#E03B8B"   
                />
            </button>
        </nav>
    )
}
export default Nav;