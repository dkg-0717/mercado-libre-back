const productdService = require("../services/productService");

const getProductsByName = async (req, res) => {

  const { query } = req;

  if (!query.q) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ': q' can not be empty" },
    });
    return;
  }

  try {
    const products = await productdService.getProductsByName(query.q);
    res.send({ status: "OK", data: products });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }

};

const getProductById = async (req, res) => {

  const { params: { id } } = req;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
    return;
  }

  try {
    const product = await productdService.getProductById(id);
    res.send({ status: "OK", product });
  } catch (error) {
    console.log(error)
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = { getProductsByName, getProductById };
