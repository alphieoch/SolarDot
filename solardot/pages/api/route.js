import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('http://localhost:8090/api/collections/Info/records');//the api to retrieve data from the pocketbase databse 
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}