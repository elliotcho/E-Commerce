import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '../../contexts/ThemeContext';
import { sendNonce } from '../../api/payments';
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
     
        this.createPayment = this.createPayment.bind(this);
        this.cardNonceResponseReceived = this.cardNonceResponseReceived.bind(this);
        this.createVerificationDetails = this.createVerificationDetails.bind(this);
    }

    async createPayment(n, b){
      const { total } = this.props.match.params;

      await sendNonce({
          nonce: n,
          buyerVerificationToken: b,
          uuid: uuidv4(),
          total
      });
    }

    async cardNonceResponseReceived(errors, nonce, _, buyerVerificationToken)  {
        if (errors) {
          this.setState({ errorMessages: errors.map(error => error.message) });
          return;
        }

        await this.createPayment(nonce, buyerVerificationToken);
        this.setState({ errorMessages: [] });
    }

    createVerificationDetails() {
      const { total } = this.props.match.params;

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

        return(
          <div className='payment-bg' style={style}> 
              <div className='payment'>
                <header className='text-center mb-5'>
                  <h1>Payment Page</h1>
                  <h2>Total Amount: ${total}</h2>
                </header>
              
                <div className='payment-form'>
                    <SquarePaymentForm
                      sandbox={true}
                      locationId={process.env.REACT_APP_SANDBOX_LOCATION_ID}
                      applicationId={process.env.REACT_APP_SANDBOX_APPLICATION_ID}
                      createVerificationDetails={this.createVerificationDetails}
                      cardNonceResponseReceived={this.cardNonceResponseReceived}
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

                      <div className="sq-error-message">
                        {this.state.errorMessages.map(errorMessage =>
                          <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                        )}
                      </div>
                    </SquarePaymentForm>
                  </div>
              </div>
          </div>
        )
    }
}
export default PaymentForm;