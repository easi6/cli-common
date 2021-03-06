import React from 'react';
import Responsive from 'react-responsive';

export const Desktop = (props) => <Responsive {...props} minWidth={769} />;
export const Mobile = (props) => <Responsive {...props} maxWidth={768} />;
