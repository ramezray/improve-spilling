import wordsList from "./wordsList";
import {createEffect, createSignal} from "solid-js";
import InputFields from "./InputFields";
import {Button} from "solid-bootstrap";
import User from "./User";
import toast, { Toaster } from 'solid-toast';

function App() {
    const [selectedUser, setSelectedUser] = createSignal('');
    const [word, setWord] = createSignal("");
    const [showWord, setShowWord] = createSignal(true);
    const [wordPosition, setWordPosition] = createSignal(0);
    const [userWordsList, setUserWordsList] = createSignal([]);

    const notify = () => toast.error('Choose a user first');

    const generateWord = () => {
        if(selectedUser() === ""){
            return notify();
        }

        if (wordPosition() === userWordsList().length) {
            setWordPosition(0)
        }
        setWord(userWordsList()[wordPosition()]);
        setWordPosition(wordPosition() + 1)
    }

    createEffect(()=>{
        setUserWordsList(wordsList[selectedUser()]);
    })

    const sayTheWord = () => {
        const message = new SpeechSynthesisUtterance();
        message.text = word();
        message.voice = speechSynthesis.getVoices()[0]; // set the voice
        // message.rate = 0.7; // set the speaking rate
        // message.pitch = .75; // set the speaking pitch
        window.speechSynthesis.speak(message);
    }

    const listenAgain = () => {
        sayTheWord();
    }

    const getNextWord = () => {
        generateWord();
        sayTheWord();
        if (document.getElementById('0')) {
            document.getElementById('0').focus();
        }
    }

    function handleSelect(value) {
        setSelectedUser(value);
    }

    return (
        <>
            <nav>
                <User onSelect={handleSelect}/>
            </nav>
            <div className="container m-5 pt-5 " style={{background: "#23ffda"}}>
                <div className="row justify-content-center">
                    <div className="col col-6">
                        <main className="pt-5">
                            <Button variant="primary"
                                    onClick={() => setShowWord(!showWord())}>{showWord() ? "Hide the Word" : "Show the Word"}</Button>
                            {<div className="pt-3" hidden={!showWord()}>{word()}</div>}
                            <InputFields word={word}/>
                            <Button class="m-3" variant="primary" id="nextBtn" onClick={getNextWord}>Next</Button>
                            <Button variant="primary" onClick={listenAgain}>Listen Again</Button>
                        </main>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-center"
                // Spacing between each toast in pixels
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options that each toast will inherit. Will be overwritten by individual toast options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
        </>
    );
}

export default App;
