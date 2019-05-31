import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
};

export default class Calculator extends Component {
  state = { ...initialState };
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
      return;
    }

    let current = 1;
    const values = [...this.state.values];
    if (operation === "=") {
      current = 0;
      operation = null;
      values[0] = this.calculate(this.state.operation, values[0], values[1]);
    }

    this.setState({
      displayValue: values[0],
      operation,
      current,
      values
    });
  }

  addDigit(d) {
    if (d === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay;
    const displayValue = clearDisplay ? d : this.state.displayValue + d;
    this.setState({ displayValue, clearDisplay: false });

    if (d !== ".") {
      const i = this.state.current;
      const values = [...this.state.values];
      values[i] = parseFloat(displayValue);
      this.setState({ values });
    }
  }

  calculate(operation, value1, value2) {
    let result = 0;
    switch (operation) {
      case "+":
        result = value1 + value2;
        break;

      case "-":
        result = value1 - value2;
        break;

      case "/":
        result = value1 / value2;
        break;

      case "*":
        result = value1 * value2;
        break;

      default:
        result = 0;
    }

    return result;
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} class="triple" />
        <Button label="/" class="operation" click={this.setOperation} />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" class="operation" click={this.setOperation} />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" class="operation" click={this.setOperation} />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" class="operation" click={this.setOperation} />
        <Button label="0" click={this.addDigit} class="double" />
        <Button label="." click={this.addDigit} />
        <Button label="=" class="operation" click={this.setOperation} />
      </div>
    );
  }
}
