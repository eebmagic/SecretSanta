import React, { useState } from 'react';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import styles from './Results.module.css';

import GiftDrawing from './GiftDrawing.js';
import GiftTag from './GiftTag.js';

const ENDPOINT = "https://fishbowl.lol:5050/recs";

function Results({ data, showResults, toast }) {
    const [recsBox, setRecsBox] = useState("");

    const copyToClipboard = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Copied to clipboard!',
        });
        navigator.clipboard.writeText(data.assignee.contact);
    }

    const sendRecs = (recs) => {
        console.log(`SENDING RECS: ${recs}`);
        fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                recs: recs
            })
        }).then(res => {
            if (res.ok) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Recs updated!',
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: `Error updating recs: ${res}`,
                });
            }
        })
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
                                {data.assignee.firstname.split(" ")[0]} has given these recommendations: <strong>{data.assignee.recs}</strong>
                            </p>
                        ) : (
                            <p className={styles.customParagraph}>
                                {data.assignee.firstname.split(" ")[0]} hasn't given any recommendations yet 😕
                            </p>
                        )
                    }
                    <p className={styles.customParagraph}>
                        You've given these recs (to your own secret Santa): <strong>{data.recs}</strong>
                    </p>
                    <InputText
                        value={recsBox}
                        onChange={(e) => setRecsBox(e.target.value)}
                        placeholder="update your recs"
                    />
                    <Button
                        label="Submit Recs"
                        onClick={() => sendRecs(recsBox)}
                    />
                    <p>NOTE: Every time you submit will just replace your recs.</p>
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
                <p className={styles.customParagraph}>
                    You've given these recommendations: <strong>{data.recs}</strong>
                </p>
                <InputText
                    value={recsBox}
                    onChange={(e) => setRecsBox(e.target.value)}
                    placeholder="update your recs"
                />
                <Button
                    label="Submit Recs"
                    onClick={() => sendRecs(recsBox)}
                />
                <p>NOTE: Every time you submit will just replace your recs.</p>
            </Panel>
        );

    }
}

export default Results;
