// import * as React from "react";
// import * as ReactDOM from "react-dom";
// //import App from './App';
// import FirstComponent from './components/FirstComponent'
// ReactDOM.render(
//     <div>
//       <h1>Hello, Welcome to React and TypeScript</h1>
//       <FirstComponent/>
//     </div>,
//     document.getElementById("root")
// );

import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

//const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,document.getElementById("root")
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';

// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
