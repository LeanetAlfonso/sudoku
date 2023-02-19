import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import formatTime from '../../../utils/formatTime';
import "./GameDetails.css";
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';
import ShareURL from '../../ShareURL/ShareURL';
import LeaderBoard from '../HighScores/LeaderBoard';

export default function GameDetails(props) {

    const { t } = useTranslation();
    const { highScores, gameDetails, setGameDetails, movesTaken, elapsed, pressedSolve, mode, url, URLdata } = props;
    const storedTheme = localStorage.getItem("theme");
    const lostGame = pressedSolve || (URLdata && ((URLdata.time < elapsed) || (URLdata.time === elapsed && URLdata.moves < movesTaken)));

    return (
        (gameDetails.isOpen) &&
        <Dialog
            data-testid='game-details'
            open={gameDetails.isOpen}
            // black mode support
            PaperProps={{
                style: {
                    backgroundColor: storedTheme === "dark" ? "#242727" : "#eee",
                    color: storedTheme === "dark" ? "#dbd7d7" : "#333",
                    boxShadow: 'none',
                },
            }}>
            {lostGame ?
                <>
                    <IconButton disableRipple className='details-icon'>
                        <i className="fa fa-regular fa-skull-crossbones custom-details fa-4x"></i>
                    </IconButton>
                    <DialogTitle variant="h4" align="center">
                        {t('game_lost_title')}
                    </DialogTitle>
                </> :
                <>
                    <IconButton disableRipple className='details-icon'>
                        <i className="fa fa fa-regular fa-trophy custom-details fa-4x"></i>
                    </IconButton>
                    <DialogTitle variant="h4" align="center">
                        {t('game_won_title')}
                    </DialogTitle>
                </>
            }
            {!URLdata && !lostGame &&
                <DialogContent>
                    <LeaderBoard
                        hasWon={true}
                        name={highScores.name}
                        time={highScores.time}
                        moves={highScores.moves}
                        mode={highScores.mode}
                        date={highScores.date}
                    />

                </DialogContent>
            }
            <DialogContent className="row">
                <div className="column" >
                    {URLdata &&
                        <Typography variant="h6" align="center" className="custom-details">
                            <b>{t('you')}</b>
                        </Typography>}
                    <Typography variant="subtitle1">
                        <b>{t('mode')}:</b> {t(mode)}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>{t('moves')}:</b> {movesTaken}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>{t('time')}:</b> {formatTime(elapsed)}
                    </Typography>
                </div>
                {URLdata &&
                    <div className="column" >
                        <Typography variant="h6" align="center" className="custom-details">
                            <b>{t('enemy')}</b>
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>{t('mode')}:</b> {t(URLdata.mode)}
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>{t('moves')}:</b> {URLdata.moves}
                        </Typography>
                        <Typography variant="subtitle1">
                            <b>{t('time')}:</b> {formatTime(URLdata.time)}
                        </Typography>
                    </div>
                }
            </DialogContent>
            {!pressedSolve && url &&
                <DialogContent>
                    <Typography variant="subtitle1" align="center">
                        <ShareURL text={t('share_url')} url={url} btn={false} />
                    </Typography>
                </DialogContent>
            }
            <DialogActions>
                <Button
                    testId='ok'
                    text={t('ok')}
                    onClick={() => setGameDetails({ ...gameDetails, isOpen: false })}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </Dialog>
    );
}
