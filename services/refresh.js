const axios = require('axios');

const refresh = async (id) => {
  try {
    if (id) {
      await axios({
        method: 'post',
        url: `/sockets/updateInfo/${id}`,
      });
    } else {
      await axios({
        method: 'post',
        url: `/sockets/updateInfo`,
      });
    }
  } catch (error) {
    // next
  }
};

module.exports = refresh;
