import React from 'react';

export const Loading = () => {
    return (
        <div className="col">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />      {/* spinner icon, pulse rotates in 8 steps, 3x increases size, fw is fixed width, primary is blue color */}
            <p>Loading...</p>
        </div>
    );
};