import auth from './config';
import Feeds from './feedController';

const { getFeeds } = Feeds;

export const getFeedsC = (req, res) => {
    const twit = getFeeds(req, res);
    console.log( getFeeds(req, res));
}