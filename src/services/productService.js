const axios = require('axios')

const url = 'https://api.mercadolibre.com/sites/MLA'

const getCategories = (filters) => {
  // return filters[0].path_from_root.map(cat => cat.name)
  return filters[0].values[0].name
}

const filterItems = (items, filters) => {
  const category = getCategories(filters)
  items = items.map(item => {

    const { id, title, currency_id, price, condition, shipping, seller_address } = item

    return {
      id,
      title,
      price: {
        currency: currency_id,
        amount: price,
        decimals: price
      },
      picture: `http://http2.mlstatic.com/D_${item.thumbnail_id}-V.jpg`,
      condition,
      free_shipping: shipping.free_shipping,
      seller_address: seller_address.state.name
    }
  })
  return {
    items,
    category
  }
}

const getProductsByName = async (param, limit) => {

  try {
    const { data } = await axios.get(`${url}/search?q=${param}&limit=${limit}`)
    const items = filterItems(data.results, data.filters)
    // const categoryUrl = `https://api.mercadolibre.com/categories/${productId}`
    // const category = await axios.get(categoryUrl)
    // console.log(category)
    return items
  } catch (err) {
    return err
  }

};

const filterItem = (item, description) => {

  const { plain_text } = description
  const { id, title, currency_id, price, condition, shipping, sold_quantity } = item

  return {
    id,
    title,
    price: {
      currency: currency_id,
      amount: price
    },
    picture: `http://http2.mlstatic.com/D_${item.thumbnail_id}-F.jpg`,
    condition,
    free_shipping: shipping.free_shipping,
    sold_quantity,
    description: plain_text
  }
}

const getProductById = async (productId) => {
  try {
    const itemsUrl = 'https://api.mercadolibre.com/items'
    const urlDescription = `https://api.mercadolibre.com/items/${productId}/description`
    const { data } = await axios.get(`${itemsUrl}/${productId}`)
    const { data: description } = await axios.get(urlDescription)
    const item = filterItem(data, description)
    return item
  } catch (err) {
    return err
  }
};

module.exports = {
  getProductById,
  getProductsByName
};
