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

    displayUpperCase() {
        if (Key.lowerCaseKeys.includes(this.key)) { // if upper case
            const index = Key.lowerCaseKeys.indexOf(this.key);
            const capitalKey = Key.capitalizedKeys[index];
            return capitalKey;
        }
        return this.key;
    }

    isCapitalChar() {
        return Key.capitalizedKeys.includes(this.key);
    }

}

export function Keyboard(props) {
    const [keyStates, setKeyStates] = useState({});
    const [isCapitalized, setIsCapitalized] = useState(false);
    const {currentChar} = props;
    const currentCharObj = new Key(currentChar);
    const isCurrentCharCapital = currentCharObj.isCapitalChar();

    const firstRow = [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='
    ]
    const secondRow = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'
    ]
    const thirdRow = [
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`
    ]
    const fourthRow = [
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'
    ];
    
    let firstRowKeys = firstRow.map(key => new Key(key));
    let secondRowKeys = secondRow.map(key => new Key(key));
    let thirdRowKeys = thirdRow.map(key => new Key(key));
    let fourthRowKeys = fourthRow.map(key => new Key(key));

    const handleKeyDown = (e) => {
        const currentKey = e.key;

        if (currentKey === "Shift") {
            setIsCapitalized(true);
        } 
        setKeyStates((oldKeysState) => ({
            ...oldKeysState,
            [currentKey]: true
        }));
        
    };

    const handleKeyUp = (e) => {
        const currentKey = e.key;

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
                {firstRowKeys.map((key, index) => {
                    let className = "";
                    if (keyStates[key.key]) {
                        className += "active ";
                    }
                    if (isCapitalized && currentChar === key.displayUpperCase() || !key.isCapitalChar() && !isCapitalized && currentChar === key.key) {
                        className += "highlighted";
                    } 
                    return (
                        <div 
                        key={index}
                        className={`key ${className}`}
                        >
                            {key.displayKey(isCapitalized)}
                        </div>
                    );
                })}
            </div>
            <div className="keyboard-row">
                {secondRowKeys.map((key, index) => {
                    let className = "";
                    if (keyStates[key.key]) {
                        className += "active ";
                    }
                    if (isCapitalized && currentChar === key.displayUpperCase() || !key.isCapitalChar() && !isCapitalized && currentChar === key.key) {
                        className += "highlighted";
                    } 
                    return (
                        <div 
                        key={index}
                        className={`key ${className}`}
                        >
                            {key.displayKey(isCapitalized)}
                        </div>
                    );
                })}
            </div>
            <div className="keyboard-row">
                {thirdRowKeys.map((key, index) => {
                    let className = "";
                    if (keyStates[key.key]) {
                        className += "active ";
                    }
                    if (isCapitalized && currentChar === key.displayUpperCase() || !key.isCapitalChar() && !isCapitalized && currentChar === key.key) {
                        className += "highlighted";
                    } 
                    return (
                        <div 
                        key={index}
                        className={`key ${className}`}
                        >
                            {key.displayKey(isCapitalized)}
                        </div>
                    );
                })}
            </div>
            <div className="keyboard-row">
                {fourthRowKeys.map((key, index) => {
                    let className = "";
                    if (keyStates[key.key]) {
                        className += "active ";
                    }
                    if (key.key === "Shift") {
                        className += "shift ";
                        if (isCurrentCharCapital && !isCapitalized) { // if the currentChar is a captialized character and we haven't already pressed the shift key
                            className += "highlighted ";
                        }
                    }
                    if (keyStates[key.key]) {
                        className += "active ";
                    }
                    if (key.displayUpperCase() === currentChar) {
                        className += "highlighted";
                    } 
                    return (
                        <div 
                        key={index}
                        className={`key ${className}`}
                        >
                            {key.displayKey(isCapitalized)}
                        </div>
                    );
                })}
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