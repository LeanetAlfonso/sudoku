import React, { useState } from "react";
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import CustomDialog from '../CustomDialog/CustomDialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import formatTime from '../../../utils/formatTime';
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';
import ShareURL from '../../ShareURL/ShareURL';
import Leaderboard from '../../Leaderboard/Leaderboard';
import "./GameDetails.css";

export default function GameDetails(props) {

    const { t } = useTranslation();
    const { gameDetails, setGameDetails, movesTaken, elapsed, pressedSolve, mode, url, URLdata } = props;
    const lostGame = pressedSolve || (URLdata && ((URLdata.time < elapsed) || (URLdata.time === elapsed && URLdata.moves < movesTaken)));

    const [submitted, setSubmitted] = useState(false);
    const onSubmitNameCallback = () => {
        setSubmitted(true);
    };

    return (
        (gameDetails.isOpen) &&
        <CustomDialog
            testId='game-details'
            isOpen={gameDetails.isOpen}
            centered
        >
            {lostGame ?
                <>
                    {!URLdata &&
                        <IconButton disableRipple className='details-icon' data-testid="game_lost_icon">
                            <i className="fa fa-regular fa-skull-crossbones custom-details fa-4x"></i>
                        </IconButton>
                    }
                    <DialogTitle variant="h4" align="center" data-testid="game_lost_title">
                        {t('game_lost_title')}
                    </DialogTitle>
                </>
                :
                <>
                    <DialogTitle variant="h4" align="center" data-testid="game_won_title">
                        {t('game_won_title')}
                    </DialogTitle>
                </>
            }
            {(lostGame || URLdata) &&
                <>
                    <DialogContent className="row">
                        <div className="column custom-details" >
                            {URLdata &&
                                <Typography variant="h6" align="center">
                                    <b>{t('you')}</b>
                                </Typography>}
                            <Typography variant="subtitle1" className="details-container-row">
                                <div className="details-container-col"><b>{t('mode')}:</b></div>
                                <div className="details-container-col">{t(mode)}</div>
                            </Typography>
                            <Typography variant="subtitle1" className="details-container-row">
                                <div className="details-container-col"><b>{t('moves')}:</b></div>
                                <div className="details-container-col">{movesTaken}</div>
                            </Typography>
                            <Typography variant="subtitle1" className="details-container-row">
                                <div className="details-container-col"><b>{t('time')}:</b></div>
                                <div className="details-container-col">{formatTime(elapsed)}</div>
                            </Typography>

                        </div>
                        {URLdata &&
                            <div className="column" >
                                <Typography variant="h6" align="center">
                                    <b>{t('enemy')}</b>
                                </Typography>
                                <Typography variant="subtitle1" className="details-container-row">
                                    <div className="details-container-col"><b>{t('mode')}:</b> </div>
                                    <div className="details-container-col">{t(URLdata.mode)}</div>
                                </Typography>
                                <Typography variant="subtitle1" className="details-container-row">
                                    <div className="details-container-col"><b>{t('moves')}:</b></div>
                                    <div className="details-container-col">{URLdata.moves}</div>
                                </Typography>
                                <Typography variant="subtitle1" className="details-container-row">
                                    <div className="details-container-col"><b>{t('time')}:</b> </div>
                                    <div className="details-container-col">{formatTime(URLdata.time)}</div>
                                </Typography>
                            </div>
                        }
                    </DialogContent>
                </>
            }
            <DialogContent>
                <Leaderboard
                    hasWon={!pressedSolve}
                    name={t("you")}
                    time={elapsed}
                    moves={movesTaken}
                    mode={mode}
                    date={gameDetails.date}
                    challenge={URLdata}
                    onSubmitNameCallback={onSubmitNameCallback}
                    newRecord
                />
            </DialogContent>

            <DialogActions sx={{ flexDirection: "column" }}>
                <Button
                    testId='ok'
                    text={submitted ? t('ok') : t('unsaved')}
                    onClick={() => setGameDetails({ ...gameDetails, isOpen: false })}
                    buttonStyle="btn--primary--solid"
                />
                {!pressedSolve && url &&
                    <Typography variant="subtitle2" align="center" padding="5px" fontSize="13px">
                        <ShareURL text={t('share_url')} url={url} btn={false} />
                    </Typography>
                }
            </DialogActions>
        </CustomDialog>
    );
}
