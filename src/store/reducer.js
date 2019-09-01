import uuidv4 from 'uuid/v4';
import { ADD_SENTENCE, FEATURES_LOADED } from './constants/action-types';

const initialState = {
  features: [],
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_SENTENCE) {
    const {
      selectedFeatureId, selectedContextId, selectedEventId, title,
    } = action.payload;
    const featuresCopy = [...state.features];
    const features = featuresCopy.find((feature) => feature.id === selectedFeatureId);
    const contexts = features.contexts.find((context) => context.id === selectedContextId);
    const selectedEvent = contexts.events.find((event) => event.id === selectedEventId);
    const id = uuidv4();
    selectedEvent.sentences.push({
      title,
      id,
    });
    return {
      ...state,
      features: featuresCopy,
    };
  }

  if (action.type === FEATURES_LOADED) {
    return { ...state, features: state.features.concat(action.payload) };
  }
  return state;
}
export default rootReducer;
