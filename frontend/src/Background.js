import React from 'react';
import styles from './Background.module.css';

const Background = (props) => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.blackOverlay}></div>
            {/* <img src="./images/square.png" alt="logo" /> */}
            {/* <div className={styles.backgroundC}/> */}

            <div className={styles.mainContent}>
                {props.children}

            </div>
        </div>
    )
}

export default Background;