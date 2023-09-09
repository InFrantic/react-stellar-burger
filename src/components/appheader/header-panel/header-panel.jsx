import PropTypes from 'prop-types';
import styles from './header-panel.module.css';

function HeaderPanel(props) {
  return (
    <a className={`${styles.headerPanel} text text_type_main-default pr-5 pl-5 pt-4 pb-4 mb-4 mt-4 mr-2`}>
     {props.children}
    </a>
  );
}

HeaderPanel.propTypes = {
  children: PropTypes.node.isRequired
}

export default HeaderPanel;