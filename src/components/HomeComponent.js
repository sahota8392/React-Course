import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function Home(props) {
    return(
        <div className="container">     {/* boostrap class of Container */}
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard item={props.campsite} />
                </div>

                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>

                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
            <h4>Home</h4>
        </div>
    );
}

//the function RenderCard will be called in the function Home above
function RenderCard({item}) {
    return(
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

export default Home;