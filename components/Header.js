import Link from 'next/link'
import { logout } from '../utils/auth'

const Header = props => (
    <header>
        <nav>
            <ul>
                <li>
                    <Link href='/load'>
                        <a>Caricamento file</a>
                    </Link>
                </li>
                <li className="logout">
                    <button type="button" onClick={ logout }>Esci</button>
                </li>
            </ul>
        </nav>
        <style jsx>{ `
      ul {
        display: flex;
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }
      li {
        margin-right: 10px;
        margin-left: 10px;
        border-bottom: 1px solid #aaa;
      }
      a {
        color: #000;
        text-decoration: none;
      }
      .logout {
        border-color: #800000;
      }
      .logout button {
        color: #800000;
        border: 0;
        background-color: #fff;
      }
      header {
        padding: 20px;
      }
    ` }</style>
    </header>
)

export default Header