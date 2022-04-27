const http = require('http');
const app = require('./app');
const { updateProduct } = require('./services/updateDataFavorites');
const server = http.createServer(app);

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

function updateStamp() {
    updateProduct()
}

updateStamp();

setInterval(() => {
    updateStamp();
}, 216000000);


// Server Listen
server.listen(port, () => {
    console.log('Server run on port', port)
})