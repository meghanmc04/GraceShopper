import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import addUserInfo from '../store/user'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.user.id,
      name: '',
      address: '',
      phone: ''
    }
    this.changeName = this.changeName.bind(this)
    this.changeAddress = this.changeAddress.bind(this)
    this.changePhone = this.changePhone.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  changeName(evt) {
    this.setState({name: evt.target.value})
  }
  changeAddress(evt) {
    this.setState({address: evt.target.value})
  }
  changePhone(evt) {
    this.setState({phone: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    // addUserInfo(this.state)
    console.log(this.state)
    console.log('submitted')
  }

  render() {
    console.log('check-THIS-out', this)
    console.log('this.id', this.state.id)
    return (
      <div>
        <h1>Checkout</h1>
        <p>
          <i>have an account?</i> <Link to="/login">Login</Link>
        </p>
        <h3>Shipping Info</h3>
        <form name="checkoutShipping" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <input
                name="name"
                type="text"
                required={true}
                onChange={this.changeName}
                placeholder="Full Name"
              />
            </label>
            <label htmlFor="address">
              <input
                name="address"
                type="text"
                onChange={this.changeAddress}
                required={true}
                placeholder="Street Address"
              />
            </label>
            <label htmlFor="phone">
              <input
                name="phone"
                type="text"
                onChange={this.changePhone}
                required={true}
                placeholder="Phone Number"
              />
            </label>
            <label htmlFor="email">
              <input
                name="phone"
                type="text"
                onChange={this.changeEmail}
                require={true}
                placeholder="Email"
              />
            </label>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  addNewInfo: userInfo => dispatch(addUserInfo(userInfo))
})

export default connect(mapState, mapDispatch)(Checkout)
