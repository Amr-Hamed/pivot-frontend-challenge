import React from 'react';

import Grid from "@material-ui/core/Grid";

import Logo from '../../assets/images/logo.png';
import './Header.css';

const Header = ()=>{
    return(
        <Grid container className='logo-container'>
          <img src={Logo} className='logo'/>
          <h2 className='header-title'>VERGE</h2>
        </Grid>
    )
}

export default Header;