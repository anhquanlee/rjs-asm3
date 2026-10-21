import {
  faArrowLeft,
  faArrowRotateRight,
  faHouse,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  isRouteErrorResponse,
  Link,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  const status = isNotFound ? '404' : 'Oops!';

  const title = isNotFound
    ? 'This page could not be found.'
    : 'Something went wrong.';

  const description = isNotFound
    ? "The page you're looking for might have been moved or doesn't exist anymore."
    : "We couldn't load the page right now. Please try again in a moment.";

  function handleRetry() {
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white italic">
      <header className="mx-auto flex w-full max-w-235 items-center justify-center px-5 py-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-[23px] tracking-[0.2em] text-black"
        >
          BOUTIQUE
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center bg-[#f8f9fa] px-5 py-12">
        <div className="w-full max-w-160 bg-white px-7 py-12 text-center shadow-[0_5px_35px_rgba(0,0,0,0.04)] sm:px-12">
          <div className="mx-auto mb-7 flex h-17 w-17 items-center justify-center rounded-full bg-[#faf3e9]">
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="text-[25px] text-[#c7a375]"
            />
          </div>

          <h1 className="mb-3 text-[76px] leading-none font-light tracking-wide text-[#333] sm:text-[95px]">
            {status}
          </h1>

          <p className="mb-7 text-[12px] tracking-[0.2em] text-[#c7a375]">
            {isNotFound ? 'PAGE NOT FOUND' : 'UNEXPECTED ERROR'}
          </p>

          <div className="mx-auto mb-7 h-px w-15 bg-[#ddd]" />

          <h2 className="mb-4 text-[24px] font-normal text-[#333]">{title}</h2>

          <p className="mx-auto mb-10 max-w-100 text-[14px] leading-7 text-[#999]">
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="flex h-11 items-center justify-center gap-2 bg-[#333] px-6 text-[12px] not-italic text-white transition-colors hover:bg-black"
            >
              <FontAwesomeIcon icon={faHouse} />
              Back to Home
            </Link>

            {isNotFound ? (
              <Link
                to="/shop"
                className="flex h-11 items-center justify-center gap-2 border border-[#888] px-6 text-[12px] not-italic text-[#555] transition-colors hover:border-black hover:text-black"
              >
                <FontAwesomeIcon icon={faShoppingBag} />
                Browse Products
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleRetry}
                className="flex h-11 cursor-pointer items-center justify-center gap-2 border border-[#888] px-6 text-[12px] not-italic text-[#555] transition-colors hover:border-black hover:text-black"
              >
                <FontAwesomeIcon icon={faArrowRotateRight} />
                Try Again
              </button>
            )}
          </div>

          <div className="mt-12 border-t border-[#eee] pt-7">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cursor-pointer text-[12px] text-[#aaa] hover:text-[#333]"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Go back to previous page
            </button>
          </div>
        </div>
      </main>

      <footer className="py-7 text-center text-[12px] tracking-wide text-[#aaa]">
        BOUTIQUE — YOUR SHOPPING DESTINATION
      </footer>
    </div>
  );
}

export default ErrorPage;
