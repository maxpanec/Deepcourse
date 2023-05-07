import React from "react";

import "./About.css"

//About us page
const About = () => {
    return(
        <b>
            <div className="OuterDiv">
                <div>
                    <h1>Team DeepCourse</h1>
                </div>
                {/* Team Member Names */}
                <div className="innerDiv">
                    <h2>Members</h2>
                    <ul className="names">
                        <li>Maxwell Panec</li>
                        <li>Justin Barragan</li>
                        <li>Peizu Li</li>
                        <li>Hung Nguyen</li>
                    </ul>
                </div>
            </div>
        </b>
    );
};

export default About;