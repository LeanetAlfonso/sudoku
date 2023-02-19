import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../../../firebase-config";
import { formatTime } from "../../../utils/index";
import { collection, getDocs, addDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";

const LeaderBoard = (props) => {

    const modes = ["easy", "medium", "hard", "expert"];
    const { t } = useTranslation();
    const [scores, setScores] = useState([]);
    const [name, setName] = useState("");
    const [mode, setMode] = useState(props.mode);
    const [expanded, setExpanded] = useState(false);
    const [highScores, setHighScores] = useState([]);
    const [currentRank, setCurrentRank] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const scoresCollectionRef = collection(db, "scores");

    // Change mode (difficulty)
    const changeMode = (newMode) => {
        setMode(newMode);
    };

    // Submit score
    const submitScore = async () => {
        if (name !== "") {
            await addDoc(scoresCollectionRef, { name: name, time: props.time, moves: props.moves, mode: props.mode, date: serverTimestamp() });
            setSubmitted(true);
        }
    };

    // Show all scores
    const getAllScores = async () => {
        setHighScores(scores);
        setExpanded(true);
    };

    // Show high scores only (top 5)
    const getTopFiveScores = async () => {
        setHighScores(scores.filter((_, i) => i < 5));
        setExpanded(false);
    };

    useEffect(() => {
        const getScores = async () => {
            try {
                // filter by: mode
                // sort by: time (asc), moves (asc), date (desc)
                const q = query(scoresCollectionRef, where("mode", "==", mode), orderBy("time"), orderBy("moves"), orderBy("date", "desc"));
                const querySnapshot = await getDocs(q);
                const sortedScores = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                // before user submits name, show their current ranking without storing in db
                if (!submitted && props.hasWon && props.mode === mode) {
                    sortedScores.push({ name: props.name, time: props.time, moves: props.moves, date: props.date });
                    sortedScores.sort((a, b) => a.time - b.time || a.moves - b.moves || b.date - a.date);
                    setCurrentRank(sortedScores.findIndex(score => score.date === props.date) + 1);
                }

                // update scores
                setScores(sortedScores);

                // show expanded or collapsed view of scores accordingly
                expanded ? setHighScores(sortedScores) : setHighScores(sortedScores.filter((_, i) => i < 5));

            } catch (err) {
                console.log(err);
            }
        };
        getScores();

    }, [mode, submitted]);


    return (
        <div className="scores">
            <div className="flex-container mode-leaderboard-container">
                {modes.map(mod =>
                    <div
                        key={mod}
                        className={`btn-mode ${mode === mod && "selected-mode"}`}
                        onClick={() => changeMode(mod)}>{t(mod)}
                    </div>
                )}
            </div>
            <header>
                <div className="col">Rank</div>
                <div className="col center-col">Name</div>
                <div className="col center-col">Moves</div>
                <div className="col last-col">Time</div>
            </header>
            {highScores.map((score, i) =>
                <div className={`row ${i < 3 && "top-scores"} ${props.mode === mode && props.hasWon && currentRank === (i + 1) && "current-score"}`} key={i}>
                    <div className="col">{i + 1}</div>
                    <div className="col center-col">{score.name}</div>
                    <div className="col center-col">{score.moves}</div>
                    <div className="col last-col">{formatTime(score.time)}</div>
                </div>
            )}

            {currentRank > 5 && props.hasWon && props.mode === mode && !expanded &&
                <div>
                    {currentRank > 6 &&
                        <div className="row">
                            <div className="col">&#xFE19;</div>
                            <div className="col center-col">&#xFE19;</div>
                            <div className="col center-col">&#xFE19;</div>
                            <div className="col last-col">&#xFE19;</div>
                        </div>
                    }
                    <div className="row current-score">
                        <div className="col">{currentRank}</div>
                        <div className="col center-col">{submitted ? name : "You"}</div>
                        <div className="col center-col">{props.moves}</div>
                        <div className="col last-col">{formatTime(props.time)}</div>
                    </div>
                </div>
            }
            <div className="row expand-collapse">
                {expanded ?
                    <i className="fas fa-chevron-up" onClick={getTopFiveScores}></i>
                    :
                    <i className="fas fa-chevron-down" onClick={getAllScores}></i>
                }
            </div>
            {props.hasWon && props.mode === mode && !submitted &&
                <div className="name-input-container">
                    <div>Enter your name to save your score!</div>
                    <input type="text"
                        id="name"
                        name="name" value={name}
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        maxLength="7"
                    />
                    <i className={`fas fa-check ${name === "" && "invalid-button"}`} onClick={submitScore}></i>
                </div>
            }
        </div>
    );
};

export default LeaderBoard;
