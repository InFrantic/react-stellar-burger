import PropTypes from 'prop-types';
import styles from './header-panel.module.css';

function HeaderPanel(props) {
  return (
    <a className={`${styles.headerPanel} text text_type_main-default p-5 mb-4 mt-4 mr-2`}>
     {props.children}
    </a>
  );
}

HeaderPanel.propTypes = {
  children: PropTypes.node.isRequired
}

export default HeaderPanel;