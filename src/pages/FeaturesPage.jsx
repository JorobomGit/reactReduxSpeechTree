import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getFeatures, addSentence,
} from '../store/action';
import { ElementList as List } from '../components/ElementList';

function mapStateToProps(state) {
  return {
    features: [...state.features],
  };
}

export class FeaturesPage extends Component {
  constructor() {
    super();
    this.state = {
      contexts: [],
      events: [],
      sentences: [],
      selectedFeatureId: '',
      selectedContextId: '',
      selectedEventId: '',
    };
    this.getContexts = this.getContexts.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.getSentences = this.getSentences.bind(this);
    this.addSentence = this.addSentence.bind(this);
  }

  componentDidMount() {
    this.props.getFeatures();
  }

  getContexts(selectedFeatureId) {
    const { contexts } = this.props.features.find((feature) => feature.id === selectedFeatureId);
    this.setState({
      contexts: contexts || [], events: [], sentences: [], selectedFeatureId, selectedContextId: '', selectedEventId: '',
    });
  }

  getEvents(selectedContextId) {
    const { events } = this.state.contexts.find((context) => context.id === selectedContextId);
    this.setState({
      events: events || [], sentences: [], selectedContextId, selectedEventId: '',
    });
  }

  getSentences(selectedEventId) {
    const { sentences } = this.state.events.find((event) => event.id === selectedEventId);
    this.setState({ sentences: sentences || [], selectedEventId });
  }

  addSentence(title) {
    const {
      selectedFeatureId, selectedContextId, selectedEventId,
    } = this.state;

    this.props.addSentence({
      selectedFeatureId,
      selectedContextId,
      selectedEventId,
      title,
    });
  }

  render() {
    const {
      contexts, events, sentences,
      selectedEventId, selectedFeatureId, selectedContextId,
    } = this.state;
    return (
      <div>
        <List
          elements={this.props.features}
          clickCallback={this.getContexts}
          selectedItem={selectedFeatureId}
        />
        {selectedFeatureId
        && (
        <List
          elements={contexts}
          clickCallback={this.getEvents}
          selectedItem={selectedContextId}
        />
        ) }
        {selectedContextId
        && (
        <List
          elements={events}
          clickCallback={this.getSentences}
          selectedItem={selectedEventId}
        />
        ) }
        {selectedEventId
        && (
        <List
          elements={sentences}
          addButton={selectedEventId}
          showAddButton={!!selectedEventId}
          addCallback={this.addSentence}
          unselectable
        />
        )}
      </div>
    );
  }
}


FeaturesPage.defaultProps = {
  getFeatures: PropTypes.func,
  addSentence: PropTypes.func,
};

FeaturesPage.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFeatures: PropTypes.func,
  addSentence: PropTypes.func,
};

const ConnectedFeaturesPage = connect(mapStateToProps, { getFeatures, addSentence })(FeaturesPage);
export default ConnectedFeaturesPage;
