// tslint:disable-next-line:variable-name
import PubSub from '@google-cloud/pubsub';
import secrets from '../util/secrets';

abstract class PubSubController {
  pubsub: PubSub.PubSub;
  constructor() {
    this.pubsub = PubSub({
      projectId: secrets.GOOGLE_PROJECT_ID,
      keyFilename: 'gc-credentials.json',
    });
  }
}

export default PubSubController;
