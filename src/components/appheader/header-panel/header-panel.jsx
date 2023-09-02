import PropTypes from 'prop-types';
import styles from './header-panel.module.css';
function HeaderPanel(props) {
  return (
    <a className={`${styles.headerPanel} pl-5 pr-5 pb-5 pt-5`}>
      {props.children}
    </a>
  );
}
HeaderPanel.propTypes = {
  children: PropTypes.node.isRequired
}
export default HeaderPanel;