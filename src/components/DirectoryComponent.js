import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
// import CampsiteInfo from './CampsiteInfoComponent';     //pulling data from CampsiteInfoComponent file for the comments to be displayed
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


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

{/*     UPDATED IN WEEK 2 - TO THE FUNCTIONAL COMPONENT
class Directory extends Component {                 //JSX - create child class DIRECTORY from the parent class COMPONENT imported from the standard REACT above

    constructor(props) {                            //Must include props when you have constructor ('properties')
        super(props);                               //this.props = props in this constructor, use w/constructor - required
        this.state = {                              //special property that needs to hold an object
            selectedCampsite: null 
        };
    } 


                                                                    Removing this for the OnClick supplied by Main component thru props instead
    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
    }


                                                                    Removing in week 2 as this is in CampsiteInfo.js
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


render() {                                      
        const directory = this.props.campsites.map(campsite => {                    //Pull data for each site using map on array we added to state above {id: 0, 1, 2, 3} then will go thru each to format name-description
            return (
                <div key={campsite.id} className="col-md-5 m-1">
                        <Card onClick ={() => this.props.onClick(campsite.id)}>
{/* <Card onClick={() => this.onCampsiteSelect(campsite)}>                              Removed this line and updated to above line
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
*/} 

function RenderDirectoryItem({campsite}) {
    return (
        // <Card onClick={() => onClick(campsite.id)}>        REMOVED as this is rendered in the Directory Component
        <Card>
            <Link to={`/directory/${campsite.id}`}>         {/* whichever campsite is rendered, a link is created on search bar of the directory address -- BACKTICKS */}
                    <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Directory(props) {
    const directory = props.campsites.campsites.map(campsite => {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} />
            </div>
        );
    });

if (props.campsites.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.campsites.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Directory</h2>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    {directory}
                </div>                                                          
{/* <CampsiteInfo campsite={this.state.selectedCampsite}/>       Rather than calling renderSelectedCampsite above that we cleared, we will call CampsiteInfo from CampsiteInfoComponent.js but removing in week 2 for the onClick - this.props  */}  
            </div>
        );
}

export default Directory;