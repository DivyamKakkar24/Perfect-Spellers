import axios from 'axios';

export default axios.create({
	baseURL:'https://ui-interaction-l2ow2oubla-nn.a.run.app',
  headers: {"ngrok-skip-browser-warning": "true","Access-Control-Allow-Origin": "*"}
});
