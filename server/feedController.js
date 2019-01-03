import auth from './config';

Array.prototype.diff = function(arr2) {
  var ret = [];
  for(var i in this) {   
      if(arr2.indexOf(this[i]) > -1){
          ret.push(this[i]);
      }
  }
  return ret;
};
const arr = [];
const matchTweetsToReplies = (tweets, replies) => {
  tweets.forEach(entry => {
    replies.find(data => {
      if (data.in_reply_to_status_id_str == entry.id_str) {
        console.log(data, '&&&&&&&&&')
      }
    });
  });
  console.log(arr)
}
  /**
   * This method fetches all tweets
   *
   * @param {Object} req
   * @param {Object} res
   *
   */
export const getFeeds = (req, res) => {
  auth.get('statuses/user_timeline',
    { screen_name: 'MTN180', count: 10, include_entities: false, trim_user: true },
    (err, tweets, response) => {
      if (!err) {
        return auth.get('search/tweets',
          { q: "MTN180", count: 30, include_entities: false, },
          (error, replies, response) => {
            if (!error) {
              //matchTweetsToReplies(replies.statuses, tweets);
              return res.send({
                //tweets: replies.statuses,
                replies: replies.statuses,
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

export const getFbPosts = () => {
   axios.get('https://graph.facebook.com/v2.9/LADbible/posts?access_token={ACCESS_TOKEN}')
   .then(data => console.log(data))
}