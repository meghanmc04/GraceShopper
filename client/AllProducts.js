import React from 'react'
import {connect} from 'react-redux'
//fetch thunk
import {fetchAllProducts} from './store/allProducts'
//not sure if we will need a link here
//import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  //getting our info as props from store?

  //need component did mount
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    return (
      <div>
        <h2>All The Awesome Jeans Are Here!</h2>

        {/* our map of jeans will go here  */}
        {this.props.products.map(product => (
          <div key={product.id}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{width: '200px'}}
            />
            <h5>{product.size}</h5>
            <h5>{product.color}</h5>
            <h5>{product.cut}</h5>
            <h5>{product.price}</h5>
            <h5>{product.quntity}</h5>
          </div>
          // do we need a link to take us to single pair of jeans
        ))}
      </div>
    )
  }
}
//map state and map dispatch
const mapState = state => {
  //console.log('maptostate', state)
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchAllProducts())
  }
}
//will need to add connection to store
export default connect(mapState, mapDispatch)(AllProducts)
