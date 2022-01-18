import PropType from 'prop-types';

export default function Page({children, cool}) {      // object destructuring
    return (
        <div>
            <h2>I am the page component</h2>
            <h3>{cool}</h3>
            {children}
        </div>
    );
}

Page.propType = {
    cool: PropType.string,
    children: PropType.any,
};