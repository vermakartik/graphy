import React from 'react';
import '../App.css';

let Instructions = () => (
    <div className="container-fluid ins-container">
        <div className="ins_container">
            <h1 className="ins_header">Instructions</h1>
            <p>Hello, This is a walk through about what is this program and how to use it. </p>
        </div>
        <div className="ins_container">
            <h2 className="ins_header">What the heck is this?</h2>
            <p>This a time Simulator that lets you simulate the data as explained in the next sections.</p>
        </div>
        <div className="ins_container">
            <h2 className="ins_header">How the hell do I use it?</h2>
            <p>To Use this software there are basically three steps.</p>
            <p>
                <ol>
                    <li>Prepare the data in Excel.</li>
                    <li>Load the data in <strong className="ins-strong">Data</strong> tab</li>
                    <li>Press <i className="fas fa-play ins-icon"></i> button in <strong className="ins-strong">Play</strong> tab to start the simulation. </li>
                </ol>

                And Voila! you are Done.
            </p>
        </div>
        <div className="ins_container">
            <h2 className="ins_header">But I don't Like Current Settings!</h2>
            <p>What the heck, you don't like my settings? You gotta be kidding me!</p>
            <p>Anyways, there is a <strong className="ins-strong">settings</strong> tab that you can use to configure your own Settings for the simulation bars. </p>
            <p>The Settings Use Usual CSS format so all CSS formats are valid here:-).<br/> 
            e.g. to change padding vertical and horizontal individually use '2px 4px' for individuals
            </p>
            <p>Learn more about CSS <a href="https://www.w3schools.com/css/default.asp" target="_blank">Here</a>.</p>
        </div>
        <div className="ins_container">
            <h2 className="ins_header">How Do I Submit Data?</h2>
            <p>
                Its Easy!
                <ol>
                    <li>
                        Prepare your data in Excel sheet. Only three columns are required as shown below:
                        <table className="ins-table">
                            <tr className="ins_r">
                                <td className="ins_d">Title</td>
                                <td className="ins_d">Image URL Link</td>
                                <td className="ins_d">time in format (yyyy-mm-dd) </td>
                                <td className="ins_d">(Optional)</td>
                            </tr>
                        </table>
                    </li>
                    <li>
                        press Select Some files in <strong className="ins-strong">Data</strong> tab.
                    </li>
                </ol>
            </p>
        </div>        
    </div>
)

export default Instructions