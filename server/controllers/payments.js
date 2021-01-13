import { Client, Environment, ApiError } from 'square';
import { v4 } from 'uuid';
import User from '../models/user';

const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SANDBOX_ACCESS_TOKEN
});

export const createPayment = async(req, res) =>{
    if(!req.user){
        res.status(500).json({
            'result': { msg: 'Not authenticated' }
        });
    } else {
        const { total, nonce, uuid } = req.body;
        const { paymentsApi } = client;

        let payload = {
            "sourceId": nonce,
            "amountMoney": { // amount_money = $1.00
            "amount": total,
            "currency": "CAD"
            },
            "autoComplete": true,
            "location_id": process.env.SANDBOX_LOCATION_ID,
            "idempotencyKey": uuid
        }
        
        try {
            const response = await paymentsApi.createPayment(payload);

            const user = await User.findOne({ _id: req.user._id });
            const { cart, history } = user;

            for(let i=0;i<cart.length;i++){
                history.push({
                    _id: v4(),
                    datePurchased: new Date(),
                    productId: cart[i]
                });
            }

            await User.updateOne({ _id: req.user._id }, { cart: [] , history });

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
}