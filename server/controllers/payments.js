import {Client, Environment, ApiError} from 'square';
const SANDBOX_LOCATION_ID = 'L78Q8327J64EM';
const SANDBOX_ACCESS_TOKEN = 'EAAAEJ40FMpGncUYM03i4q7BmfKCGPyskcfAhYSgGuzOFtJtC9MqwzfYyZv8FqF6';

const client = new Client({
    environment: Environment.Sandbox,
    accessToken: SANDBOX_ACCESS_TOKEN
});

export const createPayment = async(req, res) =>{
    const paymentsApi = client.paymentsApi;
    console.log(req.body.uuid);
    console.log(req.body.nonce);
    let payload = {
        "source_id": req.body.nonce,
        "amount_money": { // amount_money = $1.00
          "amount": 100,
          "currency": "USD"
        },
        "location_id": SANDBOX_LOCATION_ID,
        "idempotency_key": req.body.uuid,
        autocomplete: true
      }
      
      console.log("Calling Square Servers...");
      try {
          console.log("Inside try-catch");
          const {response} = await paymentsApi.createPayment(payload);
          console.log("Done calling Square Servers....");
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