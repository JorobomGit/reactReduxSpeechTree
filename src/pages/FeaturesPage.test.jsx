/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FeaturesPage } from './FeaturesPage';
import store from '../store/store';
import speechTree from '../../public/mockData/features.json';

configure({ adapter: new Adapter() });
describe('component renders', () => {
  it('without features', () => {
    const getFeatures = jest.fn();
    const addSentence = jest.fn();
    const tree = renderer
      .create(<FeaturesPage store={store} features={[]} getFeatures={getFeatures} addSentence={addSentence} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with features', () => {
    const getFeatures = jest.fn();
    const addSentence = jest.fn();
    const tree = renderer
      .create(<FeaturesPage store={store} features={speechTree} getFeatures={getFeatures} addSentence={addSentence} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with features and children', () => {
    const getFeatures = jest.fn();
    const addSentence = jest.fn();
    const wrapper = shallow(<FeaturesPage store={store} features={speechTree} getFeatures={getFeatures} addSentence={addSentence} />);
    const instance = wrapper.instance();

    const featureId = instance.props.features[0].id;
    instance.getContexts(featureId);
    expect(instance.state.contexts).toMatchSnapshot();

    const contextId = instance.state.contexts[0].id;
    instance.getEvents(contextId);
    expect(instance.state.events).toMatchSnapshot();

    const eventId = instance.state.events[0].id;
    instance.getSentences(eventId);
    expect(instance.state.sentences).toMatchSnapshot();

    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('component behaviour', () => {
  it('addSentence calls redux action', () => {
    const getFeatures = jest.fn();
    const addSentence = jest.fn();
    const wrapper = shallow(
      <FeaturesPage store={store} features={speechTree} getFeatures={getFeatures} addSentence={addSentence} />,
    );
    const instance = wrapper.instance();

    const featureId = instance.props.features[0].id;
    instance.getContexts(featureId);

    const contextId = instance.state.contexts[0].id;
    instance.getEvents(contextId);

    const eventId = instance.state.events[0].id;
    instance.getSentences(eventId);

    instance.addSentence('New sentence');

    expect(addSentence).toHaveBeenCalled();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
