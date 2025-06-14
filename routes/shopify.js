const express = require("express");
const router = express.Router();

router.get("/products", async (req, res) => {
  const mockData = {
    products: [
      {
        id: 1,
        title: "Lipstick Matte Nude",
        status: "active",
        variants: [
          {
            price: "129000",
            currency: "IDR",
          },
        ],
      },
      {
        id: 2,
        title: "Vitamin C Serum 30ml",
        status: "active",
        variants: [
          {
            price: "159000",
            currency: "IDR",
          },
        ],
      },
      {
        id: 3,
        title: "Aloe Vera Moisturizer",
        status: "draft",
        variants: [
          {
            price: "99000",
            currency: "IDR",
          },
        ],
      },
    ],
  };

  res.json(mockData);
});

module.exports = router;
