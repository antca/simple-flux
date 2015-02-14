import {ActionSet} from './fluxounet';

/*
Create an ActionSet, this will be the 'remote controller' to send data to stores
which subscribed to it.
*/

const mainActions = new ActionSet('updateText');

export default mainActions;
