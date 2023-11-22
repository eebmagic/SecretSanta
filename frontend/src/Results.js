import React from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import styles from './Results.module.css';

import GiftDrawing from './GiftDrawing.js';
import GiftTag from './GiftTag.js';

function Results({ data, showResults }) {
    const toast = React.useRef(null);

    const copyToClipboard = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Copied to clipboard!',
        });
        navigator.clipboard.writeText(data.assignee.contact);
    }

    if (showResults) {
        return (
            <div className={styles.fullBox}>
                <Panel header="Secret Santa Assignment 🎅🎄" className={styles.customResultsPanel}>
                    <Toast ref={toast} />
                    <p className={styles.customParagraph}>
                        Hi <strong>{data.firstname}</strong>
                    </p>
                    <p className={styles.customParagraph}>
                        You've been assigned <strong>{data.assignee.firstname}</strong>!
                    </p>
                    <p className={styles.customParagraph}>
                        If you need to get in contact for gift swapping, you can contact them here:
                    </p>
                    <div className={styles.contactInfo}>
                        <p className={styles.contactInfoText}> <strong>{data.assignee.contact}</strong> </p>
                        <Button
                            icon="pi pi-copy"
                            className="p-button-rounded p-button-text"
                            onClick={copyToClipboard}
                        />
                    </div>
                    {
                        data.assignee.recs ? (
                            <p className={styles.customParagraph}>
                                Your recipient has given these recommendations: <strong>{data.assignee.recs}</strong>
                            </p>
                        ) : null
                    }
                </Panel>
                <div className={styles.customDrawing}>
                    <svg viewBox="0 0 200 235" transform="translate(0, 0) scale(1)">
                        <g transform="translate(-155, 0) scale(1)">
                            <GiftDrawing />
                        </g>
                        <g transform="translate(60, 40) rotate(-15, 0, 0) scale(0.7)">
                            <GiftTag from={data.firstname.split(" ")[0]} to={data.assignee.firstname.split(" ")[0]} />
                        </g>
                    </svg>
                </div>
            </div>
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
