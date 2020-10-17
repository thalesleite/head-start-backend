const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);
const local = require('../utils/getDomain');

module.exports = {
  async create(request, response){
    const { total } = request.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Head Start Courses',
            },
            unit_amount_decimal: total,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${local.DOMAIN}/success`,
      cancel_url: `${local.DOMAIN}/cancel`,
    });

    response.json({ id: session.id });
  }
}