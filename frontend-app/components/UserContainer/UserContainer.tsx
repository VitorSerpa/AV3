import style from "./UserContainer.module.css"

interface UserContainerProps {
  username: string
  cargo?: string
}

export default function UserContainer({ username, cargo }: UserContainerProps) {
  return (
    <div className={style.mainContainer}>
      <div className={style.userContainer}>
        <img className={style.profilePicture} src="/Avatar.svg" alt="Avatar" />
        <div className={style.userInfo}>
          <p className={style.username}>{username}</p>
          {cargo && <p className={style.cargo}>{cargo}</p>}
        </div>
      </div>
      <div className={style.iconContainer}>
        <a href="/" className={style.logoutButton}>
          <img className={style.svgLogoutIcon} src="/Logout.svg" alt="Logout" />
        </a>
      </div>
    </div>
  )
}
