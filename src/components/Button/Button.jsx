import PropTypes from 'prop-types';
import { BiPlusMedical } from 'react-icons/bi';
import LoadMoreButton from './Button.style';

export const Button = ({ onClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      Load more <BiPlusMedical />
    </LoadMoreButton>
  );
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
