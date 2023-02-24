import React from 'react';
import Dialog from '@mui/material/Dialog';

const CustomDialog = (props) => {
    const { isOpen, testId, children, centered } = props;
    return (
        <Dialog
            data-testid={testId}
            open={isOpen}
            // black mode support
            PaperProps={{
                style: {
                    backgroundColor: "var(--background-color)",
                    color: "var(--font-color)",
                    boxShadow: 'none',
                    alignItems: centered && 'center'
                },
            }}>
            {children}
        </Dialog>
    );
};

export default CustomDialog;
