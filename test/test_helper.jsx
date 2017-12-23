import _$ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { window } from './setup';
import reducers from '../src/reducers';

const $ = _$(window);

chaiJquery(chai, chai.util, _$);

const renderComponent = (ComponentClass, props = {}, state = {}) => {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  return _$(ReactDOM.findDOMNode(componentInstance));
};

_$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, expect };
