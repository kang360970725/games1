//return the start block of a event of category

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

const _startBlocks = require('../../src/lib/deployed').fp3dM_deploy

function startBlock(event, category) {
  return _startBlocks[category]
}

function curBlock(event, catetory) {
  return 0;
}

function storeEvent(event, category, block, data) {
  
}

module.exports = {
  startBlock,
  curBlock,
  storeEvent
}