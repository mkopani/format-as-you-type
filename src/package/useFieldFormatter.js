import React from "react";
import findIndexAfterMovement from "./_lib/findIndexAfterMovement";

const useFieldFormatter = (formatter, onChange, refProp = 'ref') => {
  const [position, setPosition] = React.useState(null);
  const inputRef = React.useRef();
  
  if (typeof onChange !== 'function') {
    throw new TypeError(
      'Argument must be passed for onChange and must be a function that accepts a new value.'
    );
  }

  React.useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input?.setSelectionRange(position, position);
    }
  }, [inputRef, position]);

  const handleChange = (event) => {
    const options = {};

    const target = event.target;
    const thisValue = formatter(target.value);

    const diff = thisValue.length - target.value.length;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    const inputType = event.nativeEvent.inputType;
    const isMidText = selectionEnd < thisValue.length - 1;
    
    let backspaceType = '';
    if ( inputType.includes('deleteContent') ) {
      backspaceType += inputType.includes('Backward') ? 'backspace' : 'delete';
    }

    const backspaceDetected = backspaceType !== '' && selectionStart === selectionEnd;

    if (backspaceDetected) {
      const optionKey = `${backspaceType}At`;
      options[optionKey] = selectionEnd;
    }

    onChange( formatter(thisValue, options) );

    // Set caret position
    if (backspaceDetected) {
      const newCaretPosition = findIndexAfterMovement(
        thisValue,
        selectionStart,
        backspaceType === 'delete'
      );

      setPosition(newCaretPosition);
    } else if ( inputType === 'insertText' ) {
      const endTextPos = selectionEnd + diff;
      const adjustedMidTextPos = findIndexAfterMovement(thisValue, selectionEnd, true);
      
      setPosition(isMidText ? adjustedMidTextPos : endTextPos);
    }
  };

  return { onChange: handleChange, [refProp]: inputRef };
};

export default useFieldFormatter;
