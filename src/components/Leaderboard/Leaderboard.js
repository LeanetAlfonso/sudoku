import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase-config";
import { formatTime } from "../../utils/index";
import { collection, getDocs, addDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import Loading from "../Loading/Loading";
import "./Leaderboard.css";

const Leaderboard = (props) => {
    const {
        hasWon,
        name,
        time,
        moves,
        mode,
        date,
        challenge,
        onSubmitNameCallback,
        newRecord } = props;

    const MODES = ["easy", "medium", "hard", "expert"];
    const { t } = useTranslation();
    const [scores, setScores] = useState([]);
    const storedName = localStorage.getItem("name");
    const [currentName, setCurrentName] = useState(storedName || "");
    const [currentMode, setCurrentMode] = useState(mode);
    const [expanded, setExpanded] = useState(false);
    const [highScores, setHighScores] = useState([]);
    const [currentRank, setCurrentRank] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    // database scores collection
    const scoresCollectionRef = collection(db, "scores");

    // Change mode (difficulty)
    const changeMode = (newMode) => {
        setCurrentMode(newMode);
    };

    // Submit score and save name on local storage
    const submitScore = async () => {
        if (currentName !== "") {
            onSubmitNameCallback();
            setSubmitted(true);
            localStorage.setItem("name", currentName);
            await addDoc(scoresCollectionRef, { name: currentName, time: time, moves: moves, mode: mode, date: serverTimestamp() });
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
    const isCurrentModeAndWon = hasWon && mode === currentMode;

    // Check if user can submit new record (name input)
    const canSubmitNewRecord = isCurrentModeAndWon && !submitted && newRecord;

    // Check if users current rank is within first 5 and list is currenly collapsed
    const shouldCollapseRank = currentRank > 5 && isCurrentModeAndWon && !expanded;

    // Check if i is the current rank
    const isCurrentRank = (i) => {
        return isCurrentModeAndWon && currentRank === (i + 1);
    };

    useEffect(() => {
        const getScores = async () => {
            try {
                // filter by: mode
                // sort by: time (asc), moves (asc), date (desc)
                const q = query(scoresCollectionRef, where("mode", "==", currentMode), orderBy("time"), orderBy("moves"), orderBy("date", "desc"));
                const querySnapshot = await getDocs(q);
                const sortedScores = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                // before user submits name, show their current ranking without storing in db
                if (!submitted && hasWon && mode === currentMode && newRecord) {
                    sortedScores.push({ name: name, time: time, moves: moves, date: date });
                    sortedScores.sort((a, b) => a.time - b.time || a.moves - b.moves || b.date - a.date);
                    setCurrentRank(sortedScores.findIndex(score => score.date === date) + 1);
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
    }, [currentMode, submitted, newRecord, date, hasWon, mode, moves, name, time]);


    return (
        <div className="scores" data-testid="leaderboard">
            {!challenge && <div className="ranks" data-testid="ranks">
                <div className="flex-container mode-leaderboard-container">
                    {MODES.map((mod, i) =>
                        <div
                            key={mod}
                            data-testid={mod + "-mode-button"}
                            className={`btn-mode ${i > 0 && "btn-right"} ${currentMode === mod && "selected-mode"}`}
                            onClick={() => changeMode(mod)}>{t(mod)}
                        </div>
                    )}
                </div>
                <header className="header-container">
                    <div className="col">{t("rank")}</div>
                    <div className="col">{t("name")}</div>
                    <div className="col center-col">{t("moves")}</div>
                    <div className="col last-col">{t("time")}</div>
                </header>

                {loading ?
                    <Loading scale={2} /> :
                    highScores.map((score, i) =>
                        <div className={`row ${i < 3 && "top-scores"} ${isCurrentRank(i) && "current-score"}`} key={i}>
                            <div className="col">{i + 1}</div>
                            <div className="col">{score.name}</div>
                            <div className="col center-col">{score.moves}</div>
                            <div className="col last-col">{formatTime(score.time)}</div>
                        </div>
                    )}

                {shouldCollapseRank &&
                    <div className="row current-score">
                        <div className="col">{currentRank}</div>
                        <div className="col center-col">{submitted ? currentName : t("you")}</div>
                        <div className="col center-col">{moves}</div>
                        <div className="col last-col">{formatTime(time)}</div>
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
            {canSubmitNewRecord &&
                <div className="name-input-container" data-testid="name-input-container">
                    {challenge && <div>{t("rank_pre")}<b> #{currentRank} </b>{t("rank_post")}.</div>}
                    <div>{t("save_score")}</div>
                    <input type="text"
                        id="name"
                        name="name"
                        value={currentName}
                        placeholder={t("name")}
                        onChange={e => setCurrentName(e.target.value)}
                        maxLength="7"
                        data-testid="name-input"
                    />
                    <i data-testid="submit-record"
                        className={`fas fa-check ${currentName === "" && "invalid-button"}`}
                        onClick={submitScore}>
                    </i>
                </div>
            }
        </div>
    );
};

export default Leaderboard;
