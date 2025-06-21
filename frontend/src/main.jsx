import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { store } from './store'
import App from './App.jsx'
import './assets/main.scss'
import resources from './locales/index.js'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

const initApp = async () => {
  const i18n = i18next.createInstance()

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    })

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </Provider>
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StrictMode>,
  )
}

initApp()
