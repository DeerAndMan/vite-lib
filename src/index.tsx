import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/theme';
import store from '@/store/store.ts';
import { Toastify } from '@/components';
import App from './App';
import './index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <ThemeProvider>
      <Provider store={store}>
        <Toastify />
        <App />
      </Provider>
    </ThemeProvider>
  );
}
