/**
 * Copyright 2019, Sebastião Maya, All rights reserved.
 */

import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from './logger';

export default applyMiddleware(thunk, logger);
