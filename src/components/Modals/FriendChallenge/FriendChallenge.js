import React from 'react';
import Button from '../../Button/Button';
import DialogTitle from '@mui/material/DialogTitle';
import CustomDialog from '../CustomDialog/CustomDialog';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import formatTime from '../../../utils/formatTime';
import { useTranslation } from "react-i18next";
import IconButton from '@mui/material/IconButton';

export default function FriendChallenge(props) {

    const { t } = useTranslation();
    const { friendChallenge } = props;

    return ((friendChallenge.isOpen) &&
        <CustomDialog
            testId='friend-challenge'
            isOpen={friendChallenge.isOpen}
        >
            <IconButton disableRipple className='details-icon'>
                <i className="fa fa-regular fa-dice custom-details fa-4x"></i>
            </IconButton>
            <DialogTitle variant="h5">
                {t('challenge_title')}
            </DialogTitle>
            <DialogTitle variant="h7">
                {t('challenge_subtitle')}
            </DialogTitle>

            <DialogContent>
                <Typography variant="subtitle1">
                    <b>{t('game_mode')}:</b> {t(friendChallenge.mode)}
                </Typography>
                <Typography variant="subtitle1">
                    <b>{t('moves')}:</b> {friendChallenge.moves}
                </Typography>
                <Typography variant="subtitle1">
                    <b>{t('time')}:</b> {formatTime(friendChallenge.time)}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    testId="challenge-btn-ok"
                    text={t('accept_challenge')}
                    onClick={friendChallenge.onAccept}
                    buttonStyle="btn--primary--solid"
                />
            </DialogActions>
        </CustomDialog>
    );
}
