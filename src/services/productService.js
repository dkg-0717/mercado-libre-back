const axios = require('axios')

const url = 'https://api.mercadolibre.com/sites/MLA'

const getCategories = (filters) => {
  return filters[0].path_from_root.map(cat => cat.name)
}

const filterItems = (items, filters) => {
  const categories = getCategories(filters[0].values)
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
      condition: condition,
      free_shipping: shipping.free_shipping,
      seller_address: seller_address.state.name
    }
  })
  return {
    items,
    categories
  }
}

const getProductsByName = async (param) => {

  try {
    const { data } = await axios.get(`${url}/search?q=${param}&limit=4`)
    const items = filterItems(data.results, data.filters)
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
