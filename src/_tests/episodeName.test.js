import React from 'react';
import EpisodeName from '../components/EpisodeName';
import renderer from 'react-test-renderer';

test('<EpisodeName /> test passed', () => {
    const tree = renderer.create(
      <EpisodeName/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });