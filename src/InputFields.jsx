import {createEffect, createSignal, For} from "solid-js";
import {FormControl, InputGroup, Row} from 'solid-bootstrap';
import {AiOutlineStar} from "solid-icons/ai";


function InputFields({word}) {
    console.log(word())
    const [lettersList, setLettersList] = createSignal(word().split(''))
    const [score, setScore] = createSignal(0);

    // const handleAnswer = (answer) => {
    //     // if (answer === 'correct') {
    //         setScore(score() + 1);
    //     // }
    // };


    createEffect(() => {
        setLettersList(word().split(''));
    });

    const onInput = (event, index, letter) => {
        const typedLetter = event.target.value;
        if (typedLetter === letter) {
            event.target.style.background = "lightGreen";
            // handleAnswer();
            if (lettersList().length - 1 === index) {
                document.getElementById("nextBtn").focus();
                setScore(score() + 1);
            } else {
                document.getElementById(index + 1).focus();
            }
        } else {
            event.target.style.background = "pink";
        }
    }

    const generateInputFields = (list) => {
        return (
            <For each={list} fallback={<div>Click Next to improve</div>}>
                {(letter, index) => (
                    <input
                        placeholder="-"
                        type="text" className="form-control col-6"
                        maxLength={1}
                        size="sm"
                        id={index().toString()}
                        onInput={(event) => onInput(event, index(), letter)}
                    />
                )}
            </For>
        )
    }

    console.log(score() === 0)

    function showScore(score) {
        return (
            score === 0
                ? <div>No stars yet!</div>
                : [...Array(score)].map((_, index) => (
                    <AiOutlineStar key={index}/>
                ))
        )
    }

    return (
        <>
            <Row xs={1} md={2} col={3} class="pt-5">
                <InputGroup size="sm" class="mb-3">
                    {generateInputFields(lettersList())}
                </InputGroup>
            </Row>
            <div className="p-3">
                {score()} : {showScore(score())}
            </div>
        </>
    )
}

export default InputFields;