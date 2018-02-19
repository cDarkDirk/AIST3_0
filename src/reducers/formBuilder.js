import {
  FORM_BUILDER_CHAINS_FETCH_SUCCEED,
  UPDATE_CHAIN_FORM_SUCCEED,
  NEW_FIELD_ADDED,
  ON_FIELDS_VALUES_UPDATE,
  FIELD_WAS_REMOVED,
} from '../constants'

const initialState = {
  formBuilderChains: []
};

const formBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_BUILDER_CHAINS_FETCH_SUCCEED: {
      return {
        ...state,
        formBuilderChains: action.payload
      }
    }
    case UPDATE_CHAIN_FORM_SUCCEED: {
      const formBuilderChains = [...state.formBuilderChains];
      formBuilderChains[action.payload].modified = false;
      return{
        ...state,
        formBuilderChains,
      }
    }
    case NEW_FIELD_ADDED: {
      const formBuilderChains = [...state.formBuilderChains];
      formBuilderChains[action.payload.idx].fields.push(action.payload.field);
      formBuilderChains[action.payload.idx].modified = true;
      return {
        ...state,
        formBuilderChains
      }
    }
    case ON_FIELDS_VALUES_UPDATE: {
      const formBuilderChains = [...state.formBuilderChains];
      const updatedChain = {...state.formBuilderChains[action.payload.idx]};
      updatedChain.fields = action.payload.fields;
      updatedChain.modified = true;
      formBuilderChains[action.payload.idx] = updatedChain;
      return {
        ...state,
        formBuilderChains
      }
    }
    case FIELD_WAS_REMOVED: {
      const formBuilderChains = [...state.formBuilderChains];
      formBuilderChains[action.payload.chainIdx].fields.splice(action.payload.fieldIdx,1);
      formBuilderChains[action.payload.chainIdx].modified = true;
      return{
        ...state,
        formBuilderChains,
      }
    }
    default:
      return state
  }

};

export default formBuilderReducer
