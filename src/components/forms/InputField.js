import React from "react";

/**
 * Props:
 * name: The name of the input field.
 * stateValue: The state for this particular value
 * * setStateFunc: The function that updates the state for this particular value
 * inputType: The input type for this particular value
 * onChange: The function to call when the input is changed
 */

function InputField({
  name,
  stateValue,
  setStateFunc,
  inputType,
  onChange = (e) => {
    setStateFunc(e.target.value);
  },
}) {
  const [isArray, setisArray] = React.useState(false);
  React.useEffect(() => {
    if (Array.isArray(stateValue)) {
      setisArray(true);
    }
  }, []);

  return (
    <>
      {isArray && isArray !== undefined && <label htmlFor={name}>{name}</label>}
      {isArray &&
        isArray !== undefined &&
        stateValue.map((resource, index) => {
          return (
            <>
              <input
                id={name}
                key={index}
                value={resource}
                name={name}
                type={inputType}
                className="form-multi-input"
                onChange={(event) => {
                  onChange(event, index);
                }}
                data-form-group="artists"
              />
            </>
          );
        })}

      {!isArray && isArray !== undefined && (
        <>
          <label htmlFor={name}>{name}</label>
          <input
            id={name}
            value={stateValue}
            name={name}
            type={inputType}
            onChange={onChange}
          />
        </>
      )}
    </>
  );
}

export default InputField;
