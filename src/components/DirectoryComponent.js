import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

/* CLASS COMPONENT EXAMPLE 
1. begins with class keyword
2. followed by extends (creates child from parent) component
3. constructor method required when:
        -storing local state inside this component
        -when you wish to bind methods
4. When using constructor, must take props as argument
    - Properties
5. first line of constructor must be super(props)
    -so props are communicated to base constructor in parent component
6. if using state, this.state must equal to object*/
class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null 
        };
    } 

    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
    }

    renderSelectedCampsite(campsite) {
        if(campsite) {
            return(
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        return <div />;
    }

    /*render method will pull data for each campsite, using map from array we added to state above (id: 0,1,2,3) then will go thru each format to format name/description */
    render() {
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1">
                    <Card onClick={() => this.onCampsiteSelect(campsite)}>
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
            <div className="row">
                <div className="col-md-5 m-1">
                    {this.renderSelectedCampsite(this.state.selectedCampsite)}
                </div>
            </div>
            </div>
        );
    }
}

export default Directory;
