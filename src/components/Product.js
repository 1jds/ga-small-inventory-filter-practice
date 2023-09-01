import { Component } from 'react'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className='item-card'>
        <p className='item-name'>{this.props.name}</p>
        <p className='item-category'>Category: {this.props.category}</p>
        <div className='flex-box-card'>
          <div>
            <p className='item-description'>{this.props.description}</p>
            <p className='item-price'>${this.props.price}</p>
          </div>
          <div>
              <img className='item-img' src={this.props.img} alt={this.props.name} />
          </div>
        </div>
      </div>
    )
  }
}

export default Product
