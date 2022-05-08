import React from 'react';
import classes from './footer.module.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Footer() {
    return (
        <div className={classes.footerComponent}>
            <div className={classes.footerLeft}>
                <p style={{ marginRight: '4px' }}>©2022 made with</p>
                <FavoriteIcon color="error" />
                <p style={{ marginLeft: '4px' }}>by Duc Ju</p>
            </div>
            <div className={classes.footerRight}>
                <a>About Me</a>
                <a>Contact</a>
                <a>Blog</a>
            </div>
        </div>
    );
}

export default Footer;
