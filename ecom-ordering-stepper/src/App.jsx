import CheckoutStepper from "../components/CheckoutStepper";
import "./App.css";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];

function App() {
  return (
    <div>
      <h1 className="app-header">Welcome to the E-commerce Ordering Stepper</h1>
      <p className="stepper-header">
        This is a simple application to demonstrate a checkout process.
      </p>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </div>
  );
}

export default App;
