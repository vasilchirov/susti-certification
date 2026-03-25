const fs = require('fs');

exports.readJson = (path) => {
    const data = fs.readFileSync(path, 'utf8');
    
    return JSON.parse(data);
}

exports.writeJson = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};