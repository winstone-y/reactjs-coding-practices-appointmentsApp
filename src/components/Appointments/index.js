// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [
      {
        id: uuidv4(),
        title: 'Learn ReactJS',
        date: format(new Date(2023, 10, 7), 'dd MMMM yyyy, EEEE'),
        isStarred: false,
      },
      {
        id: uuidv4(),
        title: 'Learn AI / ML',
        date: format(new Date(2023, 10, 8), 'dd MMMM yyyy, EEEE'),
        isStarred: false,
      },
      {
        id: uuidv4(),
        title: 'Visit Doctor',
        date: format(new Date(2023, 15, 8), 'dd MMMM yyyy, EEEE'),
        isStarred: false,
      },
    ],
    title: '',
    date: '',
    displayStarred: false,
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentList: [
        ...prevState.appointmentList.map(eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, isStarred: !eachItem.isStarred}
          }
          return eachItem
        }),
      ],
    }))
  }

  onDisplayStarred = () => {
    this.setState(prevState => ({displayStarred: !prevState.displayStarred}))
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
    console.log(event.target.value)
  }

  onDateChange = event => {
    const dateString = event.target.value

    this.setState({date: dateString})
    console.log(event.target.value)
  }

  onAdd = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDateString = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDateString,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
    console.log('newAppointment')
  }

  render() {
    const {appointmentList, displayStarred, title, date} = this.state
    const starList = appointmentList.filter(
      eachApt => eachApt.isStarred === true,
    )
    const filterList = displayStarred ? starList : appointmentList

    return (
      <div className="bg">
        <div className="app">
          <div className="top-sect">
            <form onSubmit={this.onAdd} className="form">
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="Title" className="title">
                TITLE
              </label>
              <input
                value={title}
                id="Title"
                onChange={this.onTitleChange}
                className="input"
                type="text"
                placeholder="Title"
              />
              <label htmlFor="Date" className="title">
                DATE
              </label>
              <input
                value={date}
                id="Date"
                onChange={this.onDateChange}
                className="input"
                type="date"
                placeholder="Date"
              />
              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <img
              alt="appointments"
              className="appnt-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <div className="appointments">
            <div className="appnt-top">
              <h1 className="heading-2">Appointments</h1>
              <button
                onClick={this.onDisplayStarred}
                type="button"
                className="starred-btn"
              >
                Starred
              </button>
            </div>
            <div className="appnt-bottom">
              <ul className="unordered-list">
                {filterList.map(eachApt => (
                  <AppointmentItem
                    eachApt={eachApt}
                    key={eachApt.id}
                    isStarred={eachApt.isStarred}
                    onToggleStar={this.onToggleStar}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
