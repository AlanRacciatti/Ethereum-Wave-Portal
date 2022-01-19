import React from 'react';
import { Spinner } from 'react-bootstrap';

const WaitingContainer = (props) => (
    <div className="waitingGif d-none" ref={props.containerRef}>
        <p>Writing your message in the blockchain. Please wait</p>
        <div>
            <img src="https://c.tenor.com/AspjzmOgmVMAAAAM/pickaxe-rock.gif" alt="waiting gif"/>
        </div>
        <div className="mt-10">
            <Spinner animation="border" role="status" className="m-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    </div>
)

export default WaitingContainer;
