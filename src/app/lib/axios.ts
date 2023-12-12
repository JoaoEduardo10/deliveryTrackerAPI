import axios from 'axios';
import 'dotenv/config';

const IXC_API = axios.create({
  baseURL: process.env.IXC_URL,
});

export { IXC_API };
