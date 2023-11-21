import React from 'react';

import styles from './GiftTag.module.css';

const COLOR = "#f0dcb1";

const GiftTag = ({from, to}) => (
    // <g transform="translate(10, 80) rotate(-15, 0, 0) scale(2)">
    <g>
        {/* <!-- Yellow tag background --> */}
        <rect x="20" y="5" width="120" height="60" fill={COLOR}/>
        
        {/* <!-- Longer isosceles trapezoid on one side --> */}
        <polygon points="0,20 20,5 20,65 0,50" fill={COLOR}/>
        
        {/* <!-- Black border around the tag --> */}
        <line x1="20" y1="5" x2="140" y2="5" stroke="black" strokeWidth="2"/>
        <line x1="140" y1="5" x2="140" y2="65" stroke="black" strokeWidth="2"/>
        <line x1="20" y1="65" x2="140" y2="65" stroke="black" strokeWidth="2"/>

        {/* <!-- Black border around the trapezoid --> */}
        <line x1="20" y1="5" x2="0" y2="20" stroke="black" strokeWidth="2"/>
        <line x1="0" y1="20" x2="0" y2="50" stroke="black" strokeWidth="2"/>
        <line x1="0" y1="50" x2="20" y2="65" stroke="black" strokeWidth="2"/>

        {/* <!-- Transparent circle "cutout" with a black border --> */}
        <circle cx="18" cy="35" r="10" fill="white" fillOpacity="0" stroke="black" strokeWidth="2"/>
        
        {/* <!-- Text: From and To --> */}
        <text x="40" y="28" fontFamily="MyCustomFont" fontSize="28" fill="black">To: {to}</text>
        <text x="50" y="55" fontFamily="MyCustomFont" fontStyle="bold" fontSize="28" fill="black">From: {from}</text>
    </g>
)

export default GiftTag;