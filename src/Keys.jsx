import { useEffect, useState } from 'react';

class Key {
    static lowerCaseKeys = [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`,
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'
    ];
    static capitalizedKeys = [
        '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|',
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 
        'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'
    ];  

    constructor(key) {
        this.key = key;
    }

    displayKey(isCapitalized) {
        if (isCapitalized) {
            const index = Key.lowerCaseKeys.indexOf(this.key);
            return Key.capitalizedKeys[index];
        }
        return this.key;
    }

    displayLowerCase() {
        if (Key.capitalizedKeys.includes(this.key)) { // if upper case
            const index = Key.capitalizedKeys.indexOf(this.key);
            const lowerCaseKey = Key.lowerCaseKeys[index];
            return lowerCaseKey;
        }
        return this.key;
    }

}

export function Keyboard() {
    const [keyStates, setKeyStates] = useState({});
    const [isCapitalized, setIsCapitalized] = useState(false);

    const firstRow = [
        // Number Row
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
    ]
    const secondRow = [
        // second row
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'
    ]
    const thirdRow = [
        // Home Row
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`
    ]
    const fourthRow = [
        // Bottom Row
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'
    ];
    const firstRowKeys = firstRow.map(key => new Key(key));
    const secondRowKeys = secondRow.map(key => new Key(key));
    const thirdRowKeys = thirdRow.map(key => new Key(key));
    const fourthRowKeys = fourthRow.map(key => new Key(key));

    const handleKeyDown = (e) => {
        const currentKeyObject = new Key(e.key);
        const currentKey = currentKeyObject.displayLowerCase(); // keep keys in terms of their lower case versions

        if (currentKey === "Shift") {
            setIsCapitalized(true);
        } 
        setKeyStates((oldKeysState) => ({
            ...oldKeysState,
            [currentKey]: true
        }));
        
    };

    const handleKeyUp = (e) => {
        const currentKeyObject = new Key(e.key);
        const currentKey = currentKeyObject.displayLowerCase(); // keep keys in terms of their lower case versions

        if (currentKey === "Shift") {
            setIsCapitalized(false);
        }
        setKeyStates((oldKeysState) => ({
            ...oldKeysState,
            [currentKey]: false
        }));
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // remove event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []); // empty array allows for start at the begining

    // if the isCapitalized is true, then set the key to it's capitalized version
    return (
        <div className="keyboard">
            <div className="keyboard-row">
                {firstRowKeys.map((key, index) => (
                    <div 
                        key={index}
                        className={`key-${keyStates[key.key] ? 'pressed' : 'not-pressed'}`}
                    >
                        {key.displayKey(isCapitalized)}
                    </div>
                ))}
            </div>
            <div className="keyboard-row">
                {secondRowKeys.map((key, index) => (
                    <div 
                        key={index}
                        className={`key-${keyStates[key.key] ? 'pressed' : 'not-pressed'}`}
                    >
                        {key.displayKey(isCapitalized)}
                    </div>
                ))}
            </div>
            <div className="keyboard-row">
                {thirdRowKeys.map((key, index) => (
                    <div 
                        key={index}
                        className={`key-${keyStates[key.key] ? 'pressed' : 'not-pressed'}`}
                    >
                        {key.displayKey(isCapitalized)}
                    </div>
                ))}
            </div>
            <div className="keyboard-row">
                {fourthRowKeys.map((key, index) => {
                    let className = "";
                    if (keyStates[key.key]) {
                        if (key.key === "Shift") {
                            className = 'shift-pressed';
                        } else {
                            className ='pressed';
                        }
                    } else {
                        if (key.key === "Shift") {
                            className = 'shift-not-pressed';
                        } else {
                            className = 'not-pressed';
                        }
                    }
                    return (
                        <div 
                        key={index}
                        className={`key-${className}`}
                        >
                            {key.displayKey(isCapitalized)}
                        </div>
                    );
                })}
            </div>
            <div className="keyboard-row">
                <div 
                    key={0}
                    className={`key-spacebar-${keyStates[" "] ? 'pressed' : 'not-pressed'}`}
                > 
                </div>
            </div>
        </div>
    );
}