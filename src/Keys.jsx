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
        const index = Key.lowerCaseKeys.indexOf(this.key);
        return isCapitalized ? Key.capitalizedKeys[index] : this.key;
    }

}

export function Keyboard() {
    const [pressedKey, setPressedKey] = useState("");
    const [isCapitalized, setIsCapitalized] = useState(false);   
    const firstRow = [
        // Number Row
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='
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
        if (e.key == "Shift") {
            setIsCapitalized(true);
        } else {
            setPressedKey(e.key);
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === "Shift") {
            setIsCapitalized(false);
        } 
        setPressedKey(""); // reset pressed key
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // remove event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // if the isCapitalized is true, then set the key to it's capitalized version
    return (
        <div className="keyboard">
            <div className="keyboard-row">
                {firstRowKeys.map((key, index) => (
                    <div 
                        key={index}
                        className={`key-${pressedKey === key.key ? 'pressed' : 'not-pressed'}`}
                    >
                        {key.displayKey(isCapitalized)}
                    </div>
                ))}
            </div>
            <div className="keyboard-row">
                {secondRowKeys.map((key, index) => (
                    <div 
                        key={index}
                        className={`key-${pressedKey === key.key ? 'pressed' : 'not-pressed'}`}
                    >
                        {key.displayKey(isCapitalized)}
                    </div>
                ))}
            </div>
            <div className="keyboard-row">
                {thirdRowKeys.map((key, index) => (
                    <div 
                        key={index}
                        className={`key-${pressedKey === key.key ? 'pressed' : 'not-pressed'}`}
                    >
                        {key.displayKey(isCapitalized)}
                    </div>
                ))}
            </div>
            <div className="keyboard-row">
                {fourthRowKeys.map((key, index) => (
                    <div 
                        key={index}
                        className={`key-${pressedKey === key.key ? 'pressed' : 'not-pressed'}`}
                    >
                        {key.displayKey(isCapitalized)}
                    </div>
                ))}
            </div>
        </div>
    );
}