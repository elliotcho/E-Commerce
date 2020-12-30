import {Component, React} from 'react';
import 'react-square-payment-form/lib/default.css'
import {v4 as uuidv4} from 'uuid';
import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton
  } from 'react-square-payment-form';
  import {sendNonce} from '../../api/payments';
const SANDBOX_APPLICATION_ID = 'sandbox-sq0idb-xKEG_DFV8O6gmAwGa0Gz6g';
const SANDBOX_LOCATION_ID = 'L78Q8327J64EM';

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
        console.log(data.uuid);
       const response = await sendNonce(data);
       console.log(response);
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
              applicationId={SANDBOX_APPLICATION_ID}
              locationId={SANDBOX_LOCATION_ID}
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