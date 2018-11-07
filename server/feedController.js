import auth from './config';

  /**
   * This method fetches all tweets
   *
   * @param {Object} req
   * @param {Object} res
   *
   */
export const getFeeds = (req, res) => {
  auth.get('statuses/user_timeline',
    { screen_name: 'MTNNG', count: 10 },
    (err, tweets, response) => {
      if (!err) {
        return auth.get('search/tweets',
          { q: "MTNNG", count: 10 },
          (error, replies, response) => {
            if (!error) {
              return res.send({
                replies: replies.statuses,
                tweets,
              });
            }
            return res.send({
              message: err[0].message,
            });
          });
      }
      return res.send({
        message: err[0].message,
      });
    });
  }