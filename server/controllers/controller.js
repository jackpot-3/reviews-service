const db = require('../../database/db.js');

const findReviews = (req, res) => {
  console.log('*** findReviews ***');
  const productId = req.params.productid;
  console.log('productId: ', productId);
  const thisQuery = 'SELECT * FROM reviews WHERE product_id = ?';
  db.query(thisQuery, [productId], (error, results) => {
    if (error) {
      console.log('Error: ', error);
      res.send(error);
    } else {
      res.send(results);
    }
  });
};

module.exports = {
  findReviews,
};
