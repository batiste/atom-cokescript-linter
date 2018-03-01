var coke, linter;
coke = require('cokescript');

// Error: Parser error at line 7 char 10:
function computeRange(msg) {
  var reg, m, line, col;
  reg = /at line ([0-9]+) char ([0-9]+)\:/;
  m = msg.match(msg);
  line = parseInt(m[1], 10);
  col = parseInt(m[2], 10);
  
  return [[line, col], [line, col + 1]];
}

linter = {
  grammarScopes: ['source.coke'], scope: 'file', lintOnFly: true, lint: function (textEditor) {
    var filePath, source;
    filePath = textEditor.getPath();
    source = textEditor.getText();
    console.log('BLOPBLOP');
    try {
      coke.generateModule(source);
    } catch(err) {
      return [{
        type: 'error', filePath: filePath, text: err.message, range: computeRange(err.message)
      }];
    }
    
    return [];
  }
};

module.exports = {
  config: {}, provideLinter: function () { return linter; }
};
