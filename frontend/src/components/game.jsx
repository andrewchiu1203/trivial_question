import { useState, useEffect } from 'react';
import Shuffle from '../helper/shuffle'

function Game({username, setGoGame, csrf}) {
    const [questions, setQuestions] = useState([]);
    const [onNumber, setOnNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [msg, setMsg] = useState("");
    const [finishGame, setFinishGame] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [pause, setPause] = useState(false);

    const questionWaitTime = 15;

    const fetchQuestions = async() => {
        try{
            const response = await fetch("http://localhost:8000/api/get_questions", {
                credentials: "include",
            });

            var data = [];
            data = await response.json();

            if(data != []){
                console.log("Loading questions complete");
                console.log(data);
                setQuestions(Shuffle(data));
            }

        }catch(err){
            console.log(err);
        }
    }

    const sendStats = () => {
        fetch("http://localhost:8000/api/send_stats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrf,
            },
            credentials: "include",
            body: JSON.stringify({username: username, score: score}),
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const checkAnswer = (event) => {
        try{
            var correct = event.target.value;
        }catch{
            var correct = "false";
        }

        setTimeout(() => {
            setOnNumber(onNumber + 1);
            setPause(false);
            console.log("Waiting end");

        }, 2000);
        
        if(correct === "true"){
            setScore(score + 1);
            setMsg("Correct!");
        }else{
            setMsg("Oops....");
        }

        setPause(true);
        console.log("Waiting");
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        setTimeLeft(questionWaitTime);
        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    checkAnswer(null);
                    clearInterval(timerInterval);
                    console.log('Countdown complete!');
                    return 0;
                }else{
                    return prevTime - 1;
                }
            });

        }, 1000);

        return () => clearInterval(timerInterval);

    }, [onNumber]);

    useEffect(() => {
        if(onNumber == 10){
            setFinishGame(true);
            sendStats();
            setTimeLeft(0);
        }
    }, [onNumber])

    return (<>
        <div className='container'>
            <h1>Game</h1>

            {questions.map((question, i) => (
                <div key={i} style={{display: (i == onNumber) ? "block" : "none"}}>
                    <p>Q{i + 1} / 10</p>
                    <p>{question.title}</p>

                    {question.options.map((option, j) => (
                        <div key={j}>
                            <button type="button" value={option.correct}
                                    className='btn-primary' onClick={checkAnswer}
                                    style={pause ? (option.correct ? {backgroundColor: "#41a532"}
                                                                   : {backgroundColor: "#d74949"})
                                                 : {}}>
                                {option.option}
                                {/* ({option.correct ? <>v</> : <>x</>}) */}
                            </button>
                        </div>
                    ))} 
                    <br />
                    <br />
                </div>
            ))}

            {finishGame ? <div>
                            <p>Your score is {score} / 10 !</p>
                        </div>
                        : <div>
                            {pause  ? <p>{msg}</p>
                                    : <p>Time: {timeLeft}</p>
                            }
                        </div>
            }

            <button className='btn-secondary' onClick={() => {setGoGame(false);}}>
                Quit Game
            </button>
            <br />
            <br />
        </div>
    </>)
}

export default Game;