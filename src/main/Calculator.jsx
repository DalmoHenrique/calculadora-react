import React, { useState } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';


const Calculator = () => {

    // Converter um JSON em uma cópia (para que não tenha a mesma referência do objeto)
    const jsonCopy = (src) => {
        return JSON.parse(JSON.stringify(src));
    }

    const initialState = {
        displayValue: '0',
        clearDisplay: false,
        operation: null,
        values: [0, 0],
        current: 0
    };

    const [state, setState] = useState(initialState);

    const clearMemory = () => {
        setState(initialState);
    }

    const setOperation = (operation) => {
        const statesObj = jsonCopy(state);
        if(state.current === 0){
            statesObj.operation = operation;
            statesObj.current = 1;
            statesObj.clearDisplay = true;
            setState(statesObj)
        } else {
            const equals = operation === '='
            const currentOperation = state.operation;
            const values = jsonCopy(state.values);
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch {
                values[0] = state.values[0];
            }
            values[1] = 0;
            statesObj.values = values;
            statesObj.displayValue = values[0];
            statesObj.operation = equals ? null : operation;
            statesObj.equals = equals ? 0 : 1;
            statesObj.clearDisplay = !equals;
            
            setState(statesObj);
        }
    }

    const addDigit = (n) => {
        if (n === '.' && state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = state.displayValue === '0' || state.clearDisplay;
        const currentValue = clearDisplay ? '' : state.displayValue;
        const displayValue = currentValue + n;
        const statesObj = jsonCopy(state);
        statesObj.displayValue = displayValue;
        statesObj.clearDisplay = false;
        setState(statesObj);

        if (n !== '.') {
            const i = state.current;
            const newValue = parseFloat(displayValue);
            const values = jsonCopy(state.values);
            statesObj.values = values;
            values[i] = newValue;
            setState(statesObj);
        }
    }

    return (
        <div className='calculator'>
            <Display value={state.displayValue} />
            <Button label="AC" click={clearMemory} triple />
            <Button label="/" click={setOperation} operation />
            <Button label="7" click={addDigit} />
            <Button label="8" click={addDigit} />
            <Button label="9" click={addDigit} />
            <Button label="*" click={setOperation} operation />
            <Button label="4" click={addDigit} />
            <Button label="5" click={addDigit} />
            <Button label="6" click={addDigit} />
            <Button label="-" click={setOperation} operation />
            <Button label="1" click={addDigit} />
            <Button label="2" click={addDigit} />
            <Button label="3" click={addDigit} />
            <Button label="+" click={setOperation} operation />
            <Button label="0" click={addDigit} double />
            <Button label="." click={addDigit} />
            <Button label="=" click={setOperation} operation />
        </div>
    );
};

export default Calculator;