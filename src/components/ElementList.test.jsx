/* eslint-disable max-len */
import React from 'react';
import renderer from 'react-test-renderer';
import { ElementList } from './ElementList';
import speechTree from '../../public/mockData/features.json';

describe('component renders', () => {
  it('without elements', () => {
    const tree = renderer
      .create(<ElementList elements={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with elements with children', () => {
    const tree = renderer
      .create(<ElementList elements={speechTree} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with elements with children', () => {
    const tree = renderer
      .create(<ElementList elements={speechTree} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
