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
    console.log("USE EFFECT!");
    console.log("STATE VALUE:");
    console.log(stateValue);
    console.dir(stateValue);
    console.log("IS ARRAY");
    console.log(Array.isArray(stateValue));

    if (Array.isArray(stateValue)) {
      setisArray(true);
    }
  }, []);

  return (
    <div>
      {isArray &&
        isArray !== undefined &&
        stateValue.map((resource, index) => {
          console.log("DOING STUFF");
          console.log("RESOURCE");
          console.log(resource);
          console.log("END RESOURCE");

          return (
            <input
              id={name}
              key={index}
              value={resource}
              name={name}
              type={inputType}
              onChange={(event) => {
                onChange(event, index);
              }}
              data-form-group="artists"
            />
          );
        })}

      {/* {!isArray && isArray !== undefined && (
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
      )} */}
    </div>
  );
}

export default InputField;
