import FetchInterceptor from '../src/components/FetchInterceptor'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const allowed_status_codes = [200, 401, 404];
  const onAfterRequest = async (response) => {
    if (!allowed_status_codes.includes(response.status)) {
      window.location.href = '/';
    }
  }

  return <>
    <FetchInterceptor afterRequest={onAfterRequest} />
    <Component {...pageProps} />
  </>
}

export default MyApp
