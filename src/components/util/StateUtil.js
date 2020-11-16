// ** METHODS FOR ARRAY STATE **

exports.addItemToStateArray = function addItemToStateArray(
  stateArray,
  setStateArray,
  item
) {
  if (
    !handleArrayShouldNotContainTargetItemValidation(
      stateArray,
      item,
      getFunctionName()
    )
  ) {
    return;
  }

  const updatedArray = [...stateArray];
  updatedArray.push(item);

  setStateArray(updatedArray);

  console.log(`Successfully executed ${getFunctionName()}`);
};

exports.deleteItemFromStateArray = function deleteItemFromStateArray(
  stateArray,
  setStateArray,
  item
) {
  if (
    !handleArrayShouldContainTargetItemValidation(stateArray, getFunctionName())
  ) {
    return;
  }

  const updatedArray = stateArray.filter((value) => value === item); // Ensures this list doesn't include the item to be deleted.

  setStateArray(updatedArray);

  console.log(`Successfully executed ${getFunctionName()}`);
};

exports.deleteItemFromStateArrayByMongdoId = function deleteItemFromStateArrayByMongdoId(
  stateArray,
  setStateArray,
  id
) {
  if (
    !handleObjectShouldContainTargetPropertyValidation(
      stateArray,
      "_id",
      getFunctionName()
    )
  ) {
    return;
  }

  const updatedArray = stateArray.filter((value) => value._id !== id); // Ensures this list doesn't include the item to be deleted.

  setStateArray(updatedArray);

  console.log(`Successfully executed ${getFunctionName()}`);
};

// ** METHODS FOR OBJECT STATE **

exports.setObjectProperty = function setObjectProperty(
  stateObject,
  setStateObject,
  key,
  value
) {
  if (!handleObjectValidation(stateObject, getFunctionName())) {
    return;
  }

  /* 
  Using shallow copy for simplicity. Don't want to use a library
  Perhaps will change this in the future if necessary.
  */

  const stateObjectCopy = { ...stateObject };
  stateObjectCopy[key] = value;

  setStateObject(stateObjectCopy);

  console.log(`Successfully executed ${getFunctionName()}`);
};

exports.incrementDecrementObjectProperty = function incrementObjectProperty(
  stateObject,
  setStateObject,
  key,
  amount = 1
) {
  if (
    !handleObjectShouldContainTargetPropertyWithNumberValueValidation(
      stateObject,
      key,
      getFunctionName
    )
  ) {
    return;
  }

  /* 
  Using shallow copy for simplicity. Don't want to use a library
  Perhaps will change this in the future if necessary.
  */

  const previousNumberValue = stateObject[key];
  const stateObjectClone = { ...stateObject };
  stateObjectClone[key] = previousNumberValue + amount;

  setStateObject(stateObjectClone);

  console.log(`Successfully executed ${getFunctionName()}`);
};

// ** ARRAY VALIDATION METHODS **

// Returns true is validation was successful, false otherwise.
const handleArrayValidation = (inputArray, functionName) => {
  if (!Array.isArray(inputArray)) {
    // Given state variable is a not an array variable. Return here and log error.
    console.error(
      `Call to ${functionName} provides a non-array state variable! State Variable: ${inputArray}`
    );
    return false;
  }

  return true;
};

// Returns true is validation was successful, false otherwise.
const handleArrayShouldContainTargetItemValidation = (
  inputArray,
  item,
  functionName
) => {
  if (!handleArrayValidation(inputArray, functionName)) {
    return false;
  }

  if (!inputArray.includes(item)) {
    // Target item is not in the array. Return here and log error.
    console.error(
      `Call to ${functionName} provides an array without target item! Target item: ${item}`
    );
    return false;
  }

  return true;
};

// Returns true is validation was successful, false otherwise.
const handleArrayShouldNotContainTargetItemValidation = (
  inputArray,
  item,
  functionName
) => {
  if (!handleArrayValidation(inputArray, functionName)) {
    return false;
  }

  if (inputArray.includes(item)) {
    // Target item is in the array. Return here and log error.
    console.error(
      `Call to ${functionName} provides an array with target item already! Target item: ${item}`
    );
    return false;
  }

  return true;
};

// ** ARRAY VALIDATION METHODS **

const handleObjectValidation = (inputObject, functionName) => {
  if (typeof inputObject !== "object" || inputObject === null) {
    // Given state variable is a not an object variable. Return here and log error.
    console.error(
      `Call to ${functionName} provides a non-object state variable! State Variable: ${inputObject}`
    );
    return false;
  }

  return true;
};

const handleObjectShouldContainTargetPropertyValidation = (
  inputObject,
  key,
  functionName
) => {
  if (!handleObjectValidation(inputObject, functionName)) {
    return;
  }

  if (inputObject.hasOwnProperty(key)) {
    `Call to ${functionName} provides an object without target property! Target property: ${key}`;
    return false;
  }

  return true;
};

const handleObjectShouldContainTargetPropertyWithNumberValueValidation = (
  inputObject,
  key,
  functionName
) => {
  if (
    !handleObjectShouldContainTargetPropertyValidation(
      inputObject,
      key,
      functionName
    )
  ) {
    return false;
  }

  console.log(`key: ${key}`);

  const targetValue = inputObject[key];
  console.log(`targetValue: ${targetValue}`);

  if (isNaN(targetValue)) {
    console.error(
      `Call to ${functionName} provides an object with target property containing a non-number value! Target property value: ${targetValue}`
    );
    return false;
  }

  return true;
};

// ** VALIDATION HELPER METHODS **

function getFunctionName() {
  return getFunctionName.caller.name;
}
