import profile from '../profile.png';
import search from '../searchIcon.png';
import { Link } from "react-router-dom";

function Header(){
    return (
        <header className="mainHeader">
            <div id="headerContent">
                <h1 className="logoName">PodShare</h1>
                <nav>
                    <ul>
                        <li>
                            <Link id="link" to="/">Home</Link>
                        </li>
                        <li>
                            <Link id="link" to="/">Discover</Link>
                        </li>
                        <li>
                            <Link id="link" to="/">About</Link>
                        </li>               
                    </ul>
                </nav>
                </div>
                <div>
                    <img id="icon" src={search}/>
                    <img id="icon" src={profile}/>
                </div>           
        </header>
    );
}

export default Header;