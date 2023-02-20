import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase-config";
import { formatTime } from "../../utils/index";
import { collection, getDocs, addDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import Loading from "../Loading/Loading";
import "./Leaderboard.css";

const Leaderboard = (props) => {

    const modes = ["easy", "medium", "hard", "expert"];
    const { t } = useTranslation();
    const [scores, setScores] = useState([]);
    const [name, setName] = useState("");
    const [mode, setMode] = useState(props.mode);
    const [expanded, setExpanded] = useState(false);
    const [highScores, setHighScores] = useState([]);
    const [currentRank, setCurrentRank] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

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

    // Check if game was won fairly (didn't press solve) 
    // and the currently shown ranks' mode is the same as the original game's mode
    const isCurrentModeAndWon = () => {
        return props.hasWon && props.mode === mode;
    };

    // Check if user can submit new record (name input)
    const canSubmitNewRecord = () => {
        return isCurrentModeAndWon() && !submitted && props.newRecord;
    };

    // Check if users current rank is within first 5 and list is currenly collapsed
    const shouldCollapseRank = () => {
        return currentRank > 5 && isCurrentModeAndWon() && !expanded;
    };

    // Check if i is the current rank
    const isCurrentRank = (i) => {
        return isCurrentModeAndWon() && currentRank === (i + 1);
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
                if (!submitted && props.hasWon && props.mode === mode && props.newRecord) {
                    sortedScores.push({ name: props.name, time: props.time, moves: props.moves, date: props.date });
                    sortedScores.sort((a, b) => a.time - b.time || a.moves - b.moves || b.date - a.date);
                    setCurrentRank(sortedScores.findIndex(score => score.date === props.date) + 1);
                }

                // update scores
                setScores(sortedScores);

                // default to collapsed list
                setHighScores(sortedScores.filter((_, i) => i < 5));
                setExpanded(false);

            } catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        };

        getScores();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, submitted, props, loading]);


    return (
        <div className="scores">
            {!props.challenge && <div className="ranks">
                <div className="flex-container mode-leaderboard-container">
                    {modes.map(mod =>
                        <div
                            key={mod}
                            className={`btn-mode ${mode === mod && "selected-mode"}`}
                            onClick={() => changeMode(mod)}>{t(mod)}
                        </div>
                    )}
                </div>
                <header className="header-container">
                    <div className="col">Rank</div>
                    <div className="col center-col">Name</div>
                    <div className="col center-col">Moves</div>
                    <div className="col last-col">Time</div>
                </header>

                {loading ?
                    <Loading scale={2} /> :
                    highScores.map((score, i) =>
                        <div className={`row ${i < 3 && "top-scores"} ${isCurrentRank(i) && "current-score"}`} key={i}>
                            <div className="col">{i + 1}</div>
                            <div className="col center-col">{score.name}</div>
                            <div className="col center-col">{score.moves}</div>
                            <div className="col last-col">{formatTime(score.time)}</div>
                        </div>
                    )}

                {shouldCollapseRank() &&
                    <div className="row current-score">
                        <div className="col">{currentRank}</div>
                        <div className="col center-col">{submitted ? name : "You"}</div>
                        <div className="col center-col">{props.moves}</div>
                        <div className="col last-col">{formatTime(props.time)}</div>
                    </div>
                }

                <div className="row expand-collapse">
                    {expanded ?
                        <i className="fas fa-chevron-up" onClick={getTopFiveScores}></i>
                        :
                        <i className="fas fa-chevron-down" onClick={getAllScores}></i>
                    }
                </div>

            </div>
            }
            {canSubmitNewRecord() &&
                <div className="name-input-container">
                    {props.challenge && <div>You are at <b>#{currentRank}</b> on the leaderboard</div>}
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

export default Leaderboard;
