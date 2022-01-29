import React from 'react';               //Deafault React import and name import 
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

/* class CampsiteInfo extends Component {                  //JSX - create child class CampsiteInfo from the parent class Component  */

function RenderCampsite({campsite}) {                           //campsite is variable in the parameter list for renderCampsite
        return(                                         //return sets the col size for medium or greater to be 5 out of 12 columns & margin 1
                                                        //Copied the CARD component from DirectoryComponent to show the Card Title and Text on whatever card we click --- imported card details above for this to work
            <div className="col-md-5 m-1">              
                <Card>                                  
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        {/* <CardTitle>{campsite.name}</CardTitle> */}
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
}

function RenderComments({comments}) {                                         //method to show the comments from the campsites.js
        if(comments) {                                                       //checking comments aren't undefined
            return (                                                        
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>                                       
                    {comments.map(comment => {         //.map iterates thru array and performs given callback function each time -- {Embeding JavaScript within JSX}
                            return(
                                <div key={comment.id}>                      {/* searching comments by the id for each */}
                                <p> 
                                    {comment.text}<br />                    {/* returns comments in two lines of the text and author below. ---- <br /> starts a new line   */}
                                    --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} 
                                </p>
                            </div>
                            );
                    })}
                </div>                                                        //Return empty div if none of the above is applicable
            );
        }
        return <div />;
}

function CampsiteInfo(props) {
    if(props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>

                        <h2>
                            {props.campsite.name}
                        </h2>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />
}


/*   REMOVING IN WEEK 2 for FUNCTION COMPONENT
    render() {                                       
        if(this.props.campsite){                                //checking if an object with name "campsite" (passed thru props) is truthy (not null)
            return (
                <div className ="container">
                    <div className="row">                                       {/* Boostrap row class as attibute }
                        {this.renderCampsite(this.props.campsite)}              {/* Calling renderCampSite function for the campsite }
                        {this.renderComments(this.props.campsite.comments)}     {/* Calling the render function for the comments }
                    </div>
                </div>
            );
        }
        return (
            <div />                                     //will return empty div with no class if it's null
        )
    }
*/ 


export default CampsiteInfo;                            //export to the App.JS otherwise will be useless 