import { Link } from 'react-router-dom'
import styles from './not-found.module.css'

export function NotFound() {
    return (
        <div className={`${styles.back}`}>
            <div className={`${styles.noise}`}></div>
            <div className={`${styles.overlay}`}></div>
            <div className={`${styles.terminal}`}>
                <h1>Error <span className={`${styles.errorcode}`}>404</span></h1>
                <p className={`${styles.output}`}>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
                <p className={`${styles.output}`}>Please try to <Link to='/' className={`${styles.link}`}>return to the homepage</Link>.</p>
                <p className={`${styles.output}`}>Good luck.</p>
            </div>
        </div>
    )
}