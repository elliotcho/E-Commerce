import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import env from 'react-dotenv';
import {v4 as uuidv4} from 'uuid';
import {sendNonce} from '../../api/payments';
import 'react-square-payment-form/lib/default.css';
import './css/PaymentForm.css';

import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton
} from 'react-square-payment-form';

const lightStyle = { backgroundColor: '#becbd8' };
const darkStyle = { backgroundColor: '#34626c' };

class PaymentForm extends Component{
    static contextType = ThemeContext;

    constructor(){
        super();

        this.state = {
            errorMessages: [],
            total: 0
        }
        //this.setState({total: this.props.match.params.total});
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

        this.setState({ errorMessages: [] });
        alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken);
        this.createPayment(nonce, buyerVerificationToken);
      }

      createVerificationDetails(total) {
        return {
          amount: total,
          currencyCode: "CAD",
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
        const { total } = this.props.match.params;
        const { isDark } = this.context;

        const style = isDark? darkStyle: lightStyle;

        console.log(env);

        return(
          <div className='payment-bg' style={style}> 
              {env && (
                <div className='payment'>
                  <header className='text-center'>
                    <h1>Payment Page</h1>
                    <h2>Total Amount: ${total}</h2>
                  </header>
              
                    <div className='payment-form'>
                      <SquarePaymentForm
                        sandbox={true}
                        applicationId={env.SANDBOX_APPLICATION_ID}
                        locationId={env.SANDBOX_LOCATION_ID}
                        cardNonceResponseReceived={this.cardNonceResponseReceived}
                        createVerificationDetails={this.createVerificationDetails(total)}
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
                              Pay $ {total}
                          </CreditCardSubmitButton>
                        </SquarePaymentForm>
                    </div>
                    
                  <div className="sq-error-message">
                    {this.state.errorMessages.map(errorMessage =>
                      <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                    )}
                  </div>
              </div>)}
          </div>
        )
    }
}
export default PaymentForm;