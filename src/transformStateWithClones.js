'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {
    ...state,
  };
  const resultedObject = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        resultedObject.push({ ...stateCopy });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }
        resultedObject.push({ ...stateCopy });
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        resultedObject.push({ ...stateCopy });
        break;
    }
  }

  return resultedObject;
}

module.exports = transformStateWithClones;
