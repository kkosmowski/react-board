import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App';
import { StrictMode } from 'react';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);