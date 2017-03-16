const winston = require('winston');
winston.configure({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ name: 'my-logs', filename: `./logs/log.${Date.now()}.log` })
  ]
});

console.log = console.error = console.warn = (...args) => {
  return winston.log.call(this, 'info', ...args);
};
