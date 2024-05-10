import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <>
      <p className={css.text}>Sorry, something went wrong</p>
    </>
  );
};

export default ErrorMessage;
