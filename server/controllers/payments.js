const{ Client, Environment, ApiError } = require('square');

const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SANDBOX_ACCESS_TOKEN
});

export const createPayment = async(req, res) =>{
    const { paymentsApi } = client;

    let payload = {
        "sourceId": req.body.nonce,
        "amountMoney": { // amount_money = $1.00
          "amount": 100,
          "currency": "CAD"
        },
        "autoComplete": true,
        "location_id": process.env.SANDBOX_LOCATION_ID,
        "idempotencyKey": req.body.uuid
    }
      
      console.log("Calling Square Servers...");
      try {
          const response = await paymentsApi.createPayment(payload);

          res.status(200).json({
              'title': 'Payment Successful',
              'result': response.result
          });

      } catch (error) {
          let errorResult = null;

          if( error instanceof ApiError){
              errorResult = error.errors;
          } else{
              errorResult = error;
          }

          res.status(500).json({
              'title': 'Payment Failure',
              'result': errorResult
          });
      }
}