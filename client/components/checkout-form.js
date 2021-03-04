import React from 'react'
import {connect} from 'react-redux'
import addUserInfo from '../store/user'

export class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      phone: ''
    }
    this.changeName = this.changeName.bind(this)
    this.changeAddress = this.changeAddress.bind(this)
    this.changePhone = this.changePhone.bind(this)
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
    this.props.addCheckoutInfo(this.state)
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <h3>Shipping Info</h3>
        <form name="checkoutShipping" onSubmit={console.log('submitted form!')}>
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
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  name: state.name,
  address: state.address,
  phone: state.phone
})

const mapDispatch = dispatch => ({
  addCheckoutInfo: user => dispatch(addUserInfo(user))
})

export default connect(mapState, mapDispatch)(Checkout)
