interface Props {
    picture: string,
    nom?: string,
    prenom?: string
}

const Header = (props: Props) => {
    return (
        <div className='header'>
            <div className="user">
                <span className="pictureUser">
                    <img src={props.picture} alt="pictureUser" className="picture"/>
                </span>
                <p className="nomUser">{props.prenom}</p>
            </div>

            <nav>
                <ul>
                    <li>Home</li>
                    <li>Déconnection</li>
                </ul>
            </nav>
        </div>
    )
}

export default Header