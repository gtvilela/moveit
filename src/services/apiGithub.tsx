import axios from 'axios';

const getUsername = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response;
  } catch (err){
    console.error(err);
  }
}

export default getUsername;