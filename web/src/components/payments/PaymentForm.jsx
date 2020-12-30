import React, { Component } from 'react';
import env from 'react-dotenv';
import {v4 as uuidv4} from 'uuid';
import {sendNonce} from '../../api/payments';
import 'react-square-payment-form/lib/default.css';

import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton
} from 'react-square-payment-form';

class PaymentForm extends Component{
    constructor(){
        super();

        this.state = {
            errorMessages: [],
        }

        this.createPayment = this.createPayment.bind(this);
        this.cardNonceResponseReceived = this.cardNonceResponseReceived.bind(this);
    }

    createPayment = async(n, b) =>{
      const data = {
          nonce: n,
          buyerVerificationToken: b,
          uuid: uuidv4()
      };

      const response = await sendNonce(data);

      console.log(response);
      console.log(response.result.payment.receiptUrl);
    }

    cardNonceResponseReceived(errors, nonce, cardData, buyerVerificationToken)  {
        if (errors) {
          this.setState({ errorMessages: errors.map(error => error.message) })
          return
        }

        this.setState({ errorMessages: [] })
        alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken);
        this.createPayment(nonce, buyerVerificationToken);
      }

      createVerificationDetails() {
        return {
          amount: '100.00',
          currencyCode: "USD",
          intent: "CHARGE",
          billingContact: {
            familyName: "Smith",
            givenName: "John",
            email: "jsmith@example.com",
            country: "GB",
            city: "London",
            addressLines: ["1235 Emperor's Gate"],
            postalCode: "SW7 4JA",
            phone: "020 7946 0532"
          }
        }
      }


    render(){
        return(
            <div>
            <h1>Payment Page</h1>
    
            <SquarePaymentForm
              sandbox={true}
              applicationId={env.SANDBOX_APPLICATION_ID}
              locationId={env.SANDBOX_LOCATION_ID}
              cardNonceResponseReceived={this.cardNonceResponseReceived}
              createVerificationDetails={this.createVerificationDetails}
            >
                <fieldset className="sq-fieldset">
                    <CreditCardNumberInput />
                    <div className="sq-form-third">
                    <CreditCardExpirationDateInput />
                    </div>

                    <div className="sq-form-third">
                    <CreditCardPostalCodeInput />
                    </div>

                    <div className="sq-form-third">
                    <CreditCardCVVInput />
                    </div>
                </fieldset>

                <CreditCardSubmitButton>
                    Pay $1.00
                </CreditCardSubmitButton>
            </SquarePaymentForm>
    
            <div className="sq-error-message">
              {this.state.errorMessages.map(errorMessage =>
                <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
              )}
            </div>
          </div>
        )
    }
}
export default PaymentForm;