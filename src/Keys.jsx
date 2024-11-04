import { useEffect, useState } from 'react';

// this will display the keyboard and provide its functionality
export function Keyboard(props) {
    const lowerCaseKeys = [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`,
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'
    ];
    const capitalizedKeys = [
        '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 
        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'
    ];  

    // will contain objects that have one parameter which is their name associated with a boolean that states whether they're pressed or not
    const [keyStates, setKeyStates] = useState({});
    // boolean state that determines whether the keyboard is in capitalized mode (shift key down) or not
    const [isKeyboardCapitalized, setIsKeyboardCapitalized] = useState(false); 
    const {currentChar} = props; // hoisted state from the TypeAlong component, it is the current char the user need to type
    const isCurrentCharCapital = isCapitalChar(currentChar);

    // returns the capitalized or regular version of the key, it's expected to always take in a lower case version of the key
    function changeCapitalization(keyName, capitalize) {
        if (capitalize) {
            const index = lowerCaseKeys.indexOf(keyName);
            return capitalizedKeys[index];
        } else {
            if (lowerCaseKeys.includes(keyName)) {
                return keyName;
            } else {
                const index = capitalizedKeys.indexOf(keyName);
                return lowerCaseKeys[index];
            }
        }
    }

    // checks if the current key is a capitalized key
    function isCapitalChar(keyName) {
        return capitalizedKeys.includes(keyName);
    }

    // this will handle state chanages for when a key is pressed
    const handleKeyDown = (e) => {
        const currentKey = e.key;

        // if the current key is the shift key, set the keyboard state to capitalized
        if (currentKey === "Shift") {
            setIsKeyboardCapitalized(true);
            // to prevent keys from sticking if they're held down between capitalized states, we need to manually reset them
            setKeyStates((oldKeysState) => {
                const newKeyStates = { ...oldKeysState };
                // for each key, get their upper case & upper case version, if the lower case version is pressed in the old key state then reset it and reset the capitalized key
                lowerCaseKeys.forEach(lowerKey => {
                    // get upper cased version
                    const upperCaseKey = changeCapitalization(lowerKey, true);

                    // reset key's state in both its capitalized and lower case versions
                    if (newKeyStates[lowerKey]) {
                        newKeyStates[upperCaseKey] = false;
                        newKeyStates[lowerKey] = false;
                    }
                });
                return newKeyStates;
            });
        }

        // then always change the key state and add in the current key that is being pressed
        setKeyStates((oldKeysState) => ({
            ...oldKeysState,
            [currentKey]: true
        }));
        
    };

    const handleKeyUp = (e) => {
        const currentKey = e.key;
    
        if (currentKey === "Shift") {
            setIsKeyboardCapitalized(false);
            // to prevent keys from sticking if they're held down between capitalized states, we need to manually reset them
            setKeyStates((oldKeysState) => {
                const newKeyStates = { ...oldKeysState };
                // for each key, get their lower case & upper case version, if the upper case version is pressed in the old key states then reset it and reset the lower case key
                capitalizedKeys.forEach(capitalKey => {
                    // get lower cased version
                    const lowerCaseKey = changeCapitalization(capitalKey, false);

                    // reset key's state in both its capitalized and lower case versions
                    if (newKeyStates[capitalKey]) {
                        newKeyStates[capitalKey] = false;
                        newKeyStates[lowerCaseKey] = false;
                    }
                });
                return newKeyStates;
            });
        } 

        // then always change the key state and add in the current key that is being released
        setKeyStates((oldKeysState) => ({
            ...oldKeysState,
            [currentKey]: false
        }));
        
    };

    // based on the desired row (1-4) this will return the row. each key will have the correct class names based on our states
    function displayRow(row) {
        let currentRowKeys = [];

        // these are just arrays with the desire row's keys, they're based off the lower case versions for consistency
        if (row === 1) {
            currentRowKeys = lowerCaseKeys.slice(0, 13).map(key => key);
        } else if (row === 2) {
            currentRowKeys = lowerCaseKeys.slice(13, 26).map(key => key);
        } else if (row === 3) {
            currentRowKeys = lowerCaseKeys.slice(26, 37).map(key => key);
        } else if (row === 4) {
            currentRowKeys = lowerCaseKeys.slice(37, 50).map(key => key);
        }

        // create the row by going through each of the keys, and getting their state(s)
        return currentRowKeys.map((key, index) => {
            let className = "";

            // if the upper case or lower case version is within the array of keyState objects, then it's being pressed
            if (keyStates[key] || keyStates[changeCapitalization(key, true)]) {
                className += "active ";
            }

            // since row 4 has the shift key, we need to account for that since it's style slightly differently than the other keys
            if (row === 4) {
                // mark the shift key with the className 'shift'
                if (key === "Shift") {
                    className += "shift ";

                    // highlight the shift key if the user needs to press it to get to the desired character
                    if (isCurrentCharCapital && !isKeyboardCapitalized) {
                        className += "highlighted ";
                    }
                }
            }

            // we want to highlight the key only if we're in the correct capitalization state (if the shift key is pressed or not) to do so 
            if (isKeyboardCapitalized && currentChar === changeCapitalization(key, true) || !isCapitalChar(key) && !isKeyboardCapitalized && currentChar === key) {
                className += "highlighted";
            } 

            // create the key
            return (
                <div 
                key={index}
                className={`key ${className}`}
                >
                    {changeCapitalization(key, isKeyboardCapitalized)}
                </div>
            );
        })
    }

    // these event listeners are only created once when the app launches
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // remove event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []); // empty array allows for start at the begining

    // return the full keyboard, along with the spacebar
    return (
        <div className="keyboard">
            <div className="keyboard-row">
                {displayRow(1)}
            </div>
            <div className="keyboard-row">
                {displayRow(2)}
            </div>
            <div className="keyboard-row">
                {displayRow(3)}
            </div>
            <div className="keyboard-row">
                {displayRow(4)}
            </div>
            <div className="keyboard-row">
                <div 
                    key={0}
                    className={`key spacebar ${keyStates[" "] ? 'active' : ''}${currentChar === " " ? 'highlighted' : ''}`}
                > 
                </div>
            </div>
        </div>
    );
}