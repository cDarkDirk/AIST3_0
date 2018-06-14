import {
  FORM_BUILDER_CHAINS_FETCH_SUCCEED,
  UPDATE_CHAIN_FORM_SUCCEED,
  NEW_FIELD_ADDED,
  ON_FIELDS_VALUES_UPDATE,
  FIELD_WAS_REMOVED,
  GET_VALIDATION_RESULTS,
} from '../constants'
import {isObjectEmpty} from "../globalFunc";

const initialState = {
  formBuilderChains: []
};

const formBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_BUILDER_CHAINS_FETCH_SUCCEED: {
      const formattedChains = action.payload.map( chain => {
        if ((chain.fields.length === 1) &&(isObjectEmpty(chain.fields[0]))){
          chain.fields[0] = {type: 'NoForm'};
          return chain;
        } else {
          return chain;
        }
      });
      return {
        ...state,
        formBuilderChains: formattedChains,
      }
    }
    case UPDATE_CHAIN_FORM_SUCCEED: {
      const formBuilderChains = [...state.formBuilderChains];
      formBuilderChains[action.payload].modified = false;
      if (formBuilderChains[action.payload].fields.length === 1 && isObjectEmpty(formBuilderChains[action.payload].fields[0])) {
        formBuilderChains[action.payload].fields[0] = {type: 'NoForm'};
      }
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
    case GET_VALIDATION_RESULTS: {
      const formBuilderChains = [...state.formBuilderChains];
      formBuilderChains[action.index] = action.chain;
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
