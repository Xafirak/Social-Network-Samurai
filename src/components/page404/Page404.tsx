import Button from '@mui/material/Button';
import React from 'react'
import classes from './Page404.module.css'
import { useNavigate } from 'react-router-dom';


const Page404 = () => {
    const navigate = useNavigate()


    return (
        <div className={classes.errorPage}>
            <h1>
                404 PAGE NOT FOUND xD
            </h1>

            <img src="https://media.tenor.com/9zmtHZ0tIjkAAAAi/nyancat-rainbow-cat.gif" alt="nyancat^_^" />

            <Button
                className={classes.btn}
                onClick={() => navigate('/profile')}
                variant="contained"
                color='warning'
            > OK 
            </Button>



        </div >
    )
};

export default Page404
