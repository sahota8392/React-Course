import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import CampsiteInfo from './CampsiteInfoComponent';     //pulling data from CampsiteInfoComponent file for the comments to be displayed

/*                                                      CLASS COMPONENT EXAMPLE 
    1. Begins with class keyword
    2. Followed by extends - creates child from parent component -- creating Directory from Component imported from React above
    3. Constructor method required when:
        -storing local state inside component
        -when you need to bind methods
    4. When using constructor, must take props (properties) as argument
    5. First line of constructor must be super(props)
        -so props are communicated to base constructor in parent component
    6. If using state, this.state must equal to object
*/

class Directory extends Component {                 //JSX - create child class DIRECTORY from the parent class COMPONENT imported from the standard REACT above

    constructor(props) {                            //Must include props when you have constructor ('properties')
        super(props);                               //this.props = props in this constructor, use w/constructor - required
        this.state = {                              //special property that needs to hold an object
            selectedCampsite: null 
        };
    } 

    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
    }

/*                                                       Removing in week 2 as this is in CampsiteInfo.js
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
*/

render() {                                      
        const directory = this.props.campsites.map(campsite => {                    //Pull data for each site using map on array we added to state above {id: 0, 1, 2, 3} then will go thru each to format name-description
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
                    <CampsiteInfo campsite={this.state.selectedCampsite}/>       {/* Rather than calling renderSelectedCampsite above that we cleared, we will call CampsiteInfo from CampsiteInfoComponent.js */}  
            </div>
        );
    }
}

export default Directory;