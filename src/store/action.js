// src/js/actions/index.js
import {
  ADD_SENTENCE, FEATURES_LOADED,
} from './constants/action-types';

const addSentence = (payload) => ({ type: ADD_SENTENCE, payload });

const getFeatures = () => (dispatch) => fetch('./mockData/features.json')
  .then((response) => response.json())
  .then((json) => {
    dispatch({ type: FEATURES_LOADED, payload: json });
  });


export {
  addSentence, getFeatures,
};
