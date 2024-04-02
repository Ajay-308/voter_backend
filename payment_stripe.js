// for another where use this code

const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51P1AqkSJM8i0xWhNczUqwXyD10iooQbRpIMPreIBvQQqPkvYaQjcdUHiUORpLYI5YpbQagg49ozH9ct0uJCdiYCu00We13riYq"
);
app.use(express.json());

app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;
  const line_items = product.map((product) => ({
    price_data: {
      currancy: "inr",
      product_data: {
        name: "T-shirt",
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  const session = await stripe.checkout.session.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    sucess_url: "http://localhost:3000/success", // fontend pr bana lunga
    cancel_url: "http://localhost:3000/cancel", //frontend pr bana lunga
  });
  res.json({ id: session.id });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

/// this is the code for payment gateway
const makePayment = async (product) => {
  const stripe = await loadStripe(
    "pk_test_51P1AqkSJM8i0xWhNAE9QXRWbV3HWZh7pGUSD2CY3m1OsY1HC0OwydTTBwZVtIzUD1VnFQaZCG84gGL6NdHDVcUIh00KvAwA4q0"
  );
  const body = {
    products: carts,
  };
  const header = {
    "content-type": "application/json",
  };
  const response = await fetch(
    "http://localhost:5000/create-checkout-session",
    {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    }
  );
  const session = await response.json();
};
