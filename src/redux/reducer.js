import { CAMPSITES } from '../shared/campsites';            //.. goes back one folder
import { COMMENTS } from '../shared/comments';              // {module} being exported; export default Component is not this
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS} from '../shared/promotions';

//have export in front since we need to access these from other files
export const initialState = {                       
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

//reducer function - default function parameters so if no state passed in, state gets set to initial state we created
export const Reducer = (state = initialState, action) => {
    return state;
}