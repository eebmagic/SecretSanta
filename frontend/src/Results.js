import React from 'react';
import { Panel } from 'primereact/panel';
import styles from './Results.module.css';

function Results({ data, showResults }) {
    // Check if data and its nested properties exist

    if (showResults) {
        return (
            <Panel header="Secret Santa Assignment 🎅🎄" className={styles.customResultsPanel}>
                <p className={styles.customParagraph}>
                    Hi <strong>{data.firstname}</strong>
                </p>
                <p className={styles.customParagraph}>
                    You've been assigned <strong>{data.assignee.firstname}</strong>!
                </p>
                <p className={styles.customParagraph}>
                    If you need to get in contact for gift swapping, you can contact them here:
                </p>
                <p className={styles.contactInfo}>
                    <strong>{data.assignee.contact}</strong>
                </p>
            </Panel>
        );

    } else {
        return (
            <Panel header="Secret Santa Assignment 🎅🎄" className={styles.customResultsPanel}>
                <p className={styles.customParagraph}>
                    Hi <strong>{data.firstname}</strong>
                </p>
                <p className={styles.customParagraph}>
                    Assignments aren't out yet, but when they are you'll find them here 😊
                </p>
            </Panel>
        );

    }
}

export default Results;
