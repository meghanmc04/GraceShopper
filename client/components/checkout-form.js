import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import addUserInfo from '../store/user'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.userInfo.user.id,
      name: '',
      address: '',
      phone: '',
      email: ''
    }
    this.addName = this.addName.bind(this)
    this.addAddress = this.addAddress.bind(this)
    this.addPhone = this.addPhone.bind(this)
    this.addEmail = this.addEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  addName(evt) {
    this.setState({name: evt.target.value})
  }
  addAddress(evt) {
    this.setState({address: evt.target.value})
  }
  addPhone(evt) {
    this.setState({phone: evt.target.value})
  }
  addEmail(evt) {
    this.setState({email: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // isLoggedIn ?     : console.log('order submitted!')
  }

  render() {
    const user = this.props.userInfo.user
    const isLoggedIn = this.props.userInfo.isLoggedIn

    console.log('checkout user', user)
    console.log('checkout isLoggedIn', isLoggedIn)
    return (
      <div>
        <h1>Checkout</h1>
        {!isLoggedIn ? (
          <p>
            <i>have an account?</i> <Link to="/login">Login</Link>
          </p>
        ) : null}
        <h3>Shipping Info</h3>
        <form name="checkoutShipping" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <input
                name="name"
                type="text"
                required={true}
                onChange={this.addName}
                placeholder="Full Name"
              />
            </label>
            <label htmlFor="address">
              <input
                name="address"
                type="text"
                onChange={this.addAddress}
                required={true}
                placeholder="Street Address"
              />
            </label>
            <label htmlFor="phone">
              <input
                name="phone"
                type="text"
                onChange={this.addPhone}
                required={true}
                placeholder="Phone Number"
              />
            </label>
            <label htmlFor="email">
              <input
                name="phone"
                type="text"
                onChange={this.addEmail}
                required={true}
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
