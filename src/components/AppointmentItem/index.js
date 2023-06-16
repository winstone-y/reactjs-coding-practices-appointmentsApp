// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachApt, onToggleStar} = props
  const {id, title, date, isStarred} = eachApt
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onStar = () => {
    onToggleStar(id)
  }

  return (
    <li className="list-item">
      <div className="item-star">
        <p className="item-title">{title}</p>
        <button
          onClick={onStar}
          data-testid="star"
          className="star-btn"
          type="button"
        >
          <img alt="star" src={starImgUrl} className="star" />
        </button>
      </div>
      <p className="item-date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
