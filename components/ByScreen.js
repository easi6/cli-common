// @flow

import React from 'react';
import Responsive from 'react-responsive';

export const Desktop = (props: {}) => <Responsive {...props} minWidth={1025} />;
export const Mobile = (props: {}) => <Responsive {...props} maxWidth={1024} />;
