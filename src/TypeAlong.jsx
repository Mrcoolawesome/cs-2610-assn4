import { useEffect, useState } from 'react';

class Phrase {
    constructor(prompt) {
        this.prompt = prompt;
        this.promptChars = prompt.split('');
        this.length = this.promptChars.length;
    }

    getCompletedCharsString(currentCharIndex) {
        const completedChars = this.promptChars.slice(0, currentCharIndex); // don't want to include the current in-progress character
        if (currentCharIndex === this.length) {
            return this.prompt;
        }
        const completedString = completedChars.join('');
        return completedString;
    }

    getCurrentChar(currentCharIndex) {
        const currentChar = this.promptChars[currentCharIndex]; // don't want to include the current in-progress character
        return currentChar;
    }

    getIncompletedCharsString(currentCharIndex) {
        let incompletedChars = [];
        if (currentCharIndex + 1 < this.length) {
            incompletedChars = this.promptChars.slice(currentCharIndex + 1, this.length); // don't want to include the current in-progress character
        } 
        const completedString = incompletedChars.join('');
        return completedString;
    }

    getLength() {
        return this.length;
    }
}

// need to have a prompt array, with strings of prompts
    // then for each prompt, break them up into their characters and wait for user to type
    // when user has typed correct character, change the character's syntax

export function TypeAlong(props) {
    // want to have an array of booleans called areCharsTyped to check if each character is typed correctly
    const [charIndex, setCharIndex] = useState(0);
    const [promptIndex, setPromptIndex] = useState(0);
    const {setCurrentChar} = props

    const prompts = ["asdf!1", "YOOO*&^"];
    const promptObjects = prompts.map((prompt) => new Phrase(prompt)); // array of prompt object for each prompt string

    const handleKeyDown = (e) => {
        const currentKey = e.key;

        // if a key is pressed, check if it's the current 
        const currentPrompt = promptObjects[promptIndex];
        const expectedChar = currentPrompt.getCurrentChar(charIndex);

        if (currentKey === expectedChar){
            if (charIndex + 1 === currentPrompt.getLength()) { // if we've finished the current prompt
                if (promptIndex + 1 === prompts.length) { // reset back to the first prompt if all other prompts were finished
                    setPromptIndex(0);
                    setCharIndex(0);
                } else { // otherwise just move to the next prompt
                    setPromptIndex(promptIndex + 1);
                    setCharIndex(0);
                }
            } else { // if we're not on an edge case than just move to the next character
                setCharIndex(charIndex + 1);
            }
        }

        // otherwise just don't do anything
    };

    const handleKeyUp = (e) => {
        const currentKey = e.key;
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        setCurrentChar(currentPrompt.getCurrentChar(charIndex));

        // remove event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [charIndex, promptIndex]); // empty array allows for start at the begining


    const currentPrompt = promptObjects[promptIndex];
    // get the current char by finding using the current index and the chars array, and see if you've been activated
    return ( 
        <>
            {currentPrompt && (
                <div className="phrase" key={currentPrompt.getLength()}>
                    <span 
                        className="typed-phrase"
                    >
                        {currentPrompt.getCompletedCharsString(charIndex)}
                    </span>
                    <span 
                        className="pointer"
                    >
                        {currentPrompt.getCurrentChar(charIndex)}
                    </span>
                    <span 
                        className="remaining-phrase"
                    >
                        {currentPrompt.getIncompletedCharsString(charIndex)}
                    </span>
                </div>
            )}
        </>
    );

}