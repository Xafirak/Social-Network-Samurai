import { Box, Typography } from '@mui/material';
import React from 'react';
import classes from './Footer.module.css'

export const Footer = () => {
    return (
        <div className={classes.footer}>
            <Box alignContent='center' sx={{  p: 3 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Created by IT-KAMA
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                     Copyright© <strong>Samurai Social Network </strong> 2023
                </Typography>                
            </Box>
        </div>
    )
}