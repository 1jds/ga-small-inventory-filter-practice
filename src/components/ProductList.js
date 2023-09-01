import { Component } from 'react'
import productsData from '../data/productsData'
import Product from '../components/Product'
import search from '../assets/search.svg'
import expand_more from '../assets/expand_more.svg'
import expand_less from '../assets/expand_less.svg'
import sentiment_sad from '../assets/sentiment_sad.svg'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productsList: [],
      sortHighLow: true,
      searchString: '',
    }
  }

  componentDidMount() {
    this.setState({
      productsList: [...productsData]
    })
  }

  handleFilter = (e) => {
    let { filterCategory } = e.target.dataset;
    let newArr = productsData.filter(item => {
      if(filterCategory === 'shirts') {
        return item.category === 'shirts'
      } else if(filterCategory === 'jackets') {
        return item.category === 'jackets'
      } else if(filterCategory === 'pants') {
        return item.category === 'pants' || item.category === "skirts"
      } else {
        return item
      }
    })
    this.setState({
      productsList: [...newArr]
    })
  }

  handleSort = () => {
    if(this.state.sortHighLow === true) {
      let newArr = this.state.productsList.sort(function(a, b){return b.price - a.price})
      this.setState({
        productsList: [...newArr]
      });
    } else {
      let newArr = this.state.productsList.sort(function(a, b){return a.price - b.price})
      this.setState({
        productsList: [...newArr]
      });
    };
    this.setState({
      sortHighLow: !this.state.sortHighLow
    });
  }

  handleSearch = (e) => {
    let { value: searchStr } = e.target;
    this.setState({
      searchString: searchStr
    });
    let newArr = productsData.filter(item => {
      if(item.name.toLowerCase().includes(searchStr.toLowerCase())) {
        return item
      } else if(item.category.toLowerCase().includes(searchStr.toLowerCase())) {
        return item
      }
    })
    this.setState({
      productsList: [...newArr]
    })
  }

  render() {
    return (
      <>
      <div className='filter-buttons-div'>
        <button className="button-53" data-filter-category="shirts" onClick={this.handleFilter}>Shirts</button>
        <button className="button-53" data-filter-category="pants" onClick={this.handleFilter}>Pants and skirts</button>
        <button className="button-53" data-filter-category="jackets" onClick={this.handleFilter}>Jackets</button>
        <button className="button-53" data-filter-category="all" onClick={this.handleFilter}>All products</button>
        <div className='sort-and-search'>
          <input type="text" placeholder="Search" value={this.state.searchString} onChange={this.handleSearch} />
          <img src={search} className="search-svg" alt="search" />
          <button onClick={this.handleSort} className='button-53'>Sort by $ <img src={this.state.sortHighLow ? expand_more : expand_less} alt="price-sort-icon"/></button>
        </div>
      </div>
      <div className='flex-box-list'>
        {this.state.productsList.length > 0 ? this.state.productsList.map(({ name, category, description, price, img }, index) => {
      return (
        <Product
          name={name}
          category={category}
          description={description}
          price={price}
          img={img}
          key={`${name}-${index}`}
        />
      )
    })
        : <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <p style={{'font-weight': 'bold', 'font-size': '1.5rem'}}>No matches found</p>
          <img src={sentiment_sad} alt="heart_broken" />
          </div>
        }
      </div>
      </>
    )
  }
}

export default ProductList

// SVG icons copied from https://fonts.google.com/icons
