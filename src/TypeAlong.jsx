import { useEffect, useState } from 'react';

class Phrase {
    constructor(prompt) {
        this.prompt = prompt;
        this.promptChars = prompt.split('');
        this.length = this.promptChars.length;
    }

    // given the current character the user needs to type, determine what has already been typed
    getCompletedCharsString(currentCharIndex) {
        const completedChars = this.promptChars.slice(0, currentCharIndex);

        // if we're at the end of the prompt, just return the full prompt
        if (currentCharIndex === this.length) {
            return this.prompt;
        }

        // turn it back into a string
        const completedString = completedChars.join('');
        return completedString;
    }

    // return a character from this phrase based off its index
    getCurrentChar(currentCharIndex) {
        const currentChar = this.promptChars[currentCharIndex];
        return currentChar;
    }

    // given the current character the user needs to type, determine what still needs to be typed
    getIncompletedCharsString(currentCharIndex) {
        let incompletedChars = [];

        // don't want to include the current in-progress character, hence the addition of 1 to the index
        if (currentCharIndex + 1 < this.length) {
            incompletedChars = this.promptChars.slice(currentCharIndex + 1, this.length); 
        } 

        // turn it back into a string
        const completedString = incompletedChars.join('');
        return completedString;
    }

    // return the length of our prompt in terms of number of characters
    getLength() {
        return this.length;
    }
}

// will create the dynamically changing display of the prompt
export function TypeAlong(props) {
    // this state will represent the current expected character's index in terms of the prompt
    const [charIndex, setCharIndex] = useState(0);
    // this state will represent the current prompt's index in terms of the array of prompts
    const [promptIndex, setPromptIndex] = useState(0);
    // hoisted state to set the current character so that the Keys component knows what character we're expecting
    const {setCurrentChar} = props
    const prompts = [
        "The quick brown fox jumps over the lazy dog.",
        "Hello World! Welcome to JavaScript programming.",
        "Coding is a journey, not a destination.",
        "Frontend development requires creativity and logic.",
        "React and Redux make state management easier.",
        "Challenge yourself every day to improve your skills.",
        "HTML, CSS, and JavaScript are web basics.",
        "Debugging is an essential skill for developers.",
        "Typing accurately is crucial for productivity.",
        "Stay focused and keep learning new concepts.",
        "Clean code is easy to read and maintain.",
        "The best way to learn coding is by doing it.",
        "Problem-solving skills are key in programming.",
        "Consistent practice leads to mastery over time.",
        "Shortcuts can improve your workflow efficiency.",
        "Always test your code before deploying it.",
        "Version control helps in tracking code changes.",
        "Responsive design is essential for mobile users.",
        "Code reviews improve quality and collaboration.",
        "Learning algorithms strengthens coding skills."
    ];
    
    // array of prompt objects for each prompt string
    const promptObjects = prompts.map((prompt) => new Phrase(prompt)); 
    const currentPrompt = promptObjects[promptIndex];

    // whenever a key is pressed, check if it's the expected key and change state accordingly
    const handleKeyDown = (e) => {
        const currentKey = e.key;

        // get the current expected character from the current prompt
        const currentPrompt = promptObjects[promptIndex];
        const expectedChar = currentPrompt.getCurrentChar(charIndex);

        // if a key is pressed, check if it's the expected key/character 
        if (currentKey === expectedChar) {
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
        // otherwise just don't do anything if the user types the wrong key
    };

    // updates everytime the character index or prompt index advances because otherwise the 'keyHandleDown' function wouldn't see the latest values
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // also update the current expected character state on every prompt index and charIndex state change
        setCurrentChar(currentPrompt.getCurrentChar(charIndex));

        // remove event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [charIndex, promptIndex]); 
    
    return ( 
        <>
            {currentPrompt && ( // checking if the 'currentPrompt' variable is not null or undefined
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