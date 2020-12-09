import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import './cards.css';

function Cards(props) {
    return (
        <Card 
        onClick={props.onClick}
        className={`InfoBox ${props.active && "InfoBox--selected"} ${
            props.isRed && "InfoBox--red"
          }`}>
            <CardContent>

                {/*title*/}
                <Typography className="Infobox_title" color="textSecondary" gutterBottom>
                {props.title} 
                </Typography>
                 {/*Cases*/}

                 <h2 className={`infoBox__cases ${!props.isRed && "infoBox__cases--green"}`}>
                    {props.cases}
                    </h2>
                  {/*Total cases*/}
                  <Typography className="Infobox_total" color="textSecondary">
                {props.total} Total 
                </Typography>

            </CardContent>
        </Card>
    )
}

export default Cards;
