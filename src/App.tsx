import {BrowserRouter} from 'react-router-dom'  
import RoutesSetup from './routes/RouteSetup'


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RoutesSetup></RoutesSetup> 
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       <code>src/App.tsx</code> and save to reload.
    //       <br />
    //       <code>function test(){}</code>
    //     </p>
    //     <button className='px-10 shadow'>button</button>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
