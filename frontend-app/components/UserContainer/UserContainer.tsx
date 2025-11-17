import style from "./UserContainer.module.css"


export default function UserContainer({ username }: { username: string }) {
    return (
        <div className={style.mainContainer}>
            <div className={style.userContainer}>
                <img className={style.profilePicture} src="/Avatar.svg" alt="" />
                <p className={style.username}>{username}</p>
            </div>
            <div className={style.iconContainer}>
                <a href="/" className={style.logoutButton}>
                    <img className={style.svgLogoutIcon} src="/Logout.svg" alt="Logout" />
                </a>
            </div>
        </div>
    )
}