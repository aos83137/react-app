import React from 'react';

// const Hello = ()=> React.createElement(
//     'p',
//     {className: 'hello'},
//     'hello, world!'
// )
// const CHildren2 = ()=>{
//     return(
//         <p>2: Hello, world!!</p>
//     );
// }
// const Children3 = ()=> <p>3: Hello,, world!</p>;
const Hello =(props)=>{
    return (
        <section className="box">
            {/* <CHildren2></CHildren2>
            <Children3></Children3> */}
            <p>Hello, my name is {props.name}.</p>
        </section>
    )
}

export default Hello;