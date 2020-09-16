const stripe = require('stripe')('sk_test_51HRaroIVkTQz2SNYPFAIFyzfjavaKDJhydaqOBQGfoxbZtoXSeXO6rQYZ48ipy86H4Msg3zrA5fuhn08TuTiJZDf004983uB1B');
const DOMAIN = 'https://head-start-app.herokuapp.com/';

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
      success_url: `${DOMAIN}?success=true`,
      cancel_url: `${DOMAIN}?canceled=true`,
    });

    response.json({ id: session.id });
  }
}