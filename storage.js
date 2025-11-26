const fs = require('fs');
const path = require('path');
const FILE = path.join(process.cwd(), 'data', 'transactions.json');
function ensure(){ if(!fs.existsSync(path.dirname(FILE))) fs.mkdirSync(path.dirname(FILE), { recursive:true }); if(!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify([])); }
function read(){ ensure(); return JSON.parse(fs.readFileSync(FILE)); }
function write(data){ ensure(); fs.writeFileSync(FILE, JSON.stringify(data, null, 2)); }
module.exports = { read, write };
