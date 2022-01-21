import React, { Component } from 'react';

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
            campsites: [
                {
                    id: 0,
                    name: 'React Lake Campground',
                    image: 'assets/images/react-lake.jpg',
                    elevation: 1233,
                    description: "Nestled in the foothills of the Chrome Mountains, this campground on the shores of the pristine React Lake is a favorite for fly fishers."
                },
                {
                    id: 1,
                    name: 'Chrome River Campground ',
                    image: 'assets/images/chrome-river.jpg',
                    elevation: 877,
                    description: "Spend a few sunny days and starry nights beneath a canopy of old-growth firs at this enchanting spot by the Chrome River."
                },
                {
                    id: 2,
                    name: 'Breadcrumb Trail Campground',
                    image: 'assets/images/breadcrumb-trail.jpg',
                    elevation: 2901,
                    description: "Let NuCamp be your guide to this off-the-beaten-path, hike-in-only campground."
                },
                {
                    id: 3,
                    name: 'Redux Woods Campground',
                    image: 'assets/images/redux-woods.jpg',
                    elevation: 42,
                    description: "You'll never want to leave this hidden gem, deep within the lush Redux Woods."
                }
            ],
        };
    }

    /*render method will pull data for each campsite, using map from array we added to state above (id: 0,1,2,3) then will go thru each format to format name/description */
    render() {
        const directory = this.state.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col">
                    <img src={campsite.image} alt={campsite.name} />
                    <h2>{campsite.name}</h2>
                    <p>{campsite.description}</p>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
            </div>
        );
    }
}

export default Directory;
