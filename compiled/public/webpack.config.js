'use strict';

var path = require('path');

module.exports = {
  entry: path.join(__dirname, './index.js'),
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: { presets: ['es2015', 'react'] }
    }]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3B1YmxpYy93ZWJwYWNrLmNvbmZpZy5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJlbnRyeSIsImpvaW4iLCJfX2Rpcm5hbWUiLCJsb2FkZXJzIiwidGVzdCIsImV4Y2x1ZGUiLCJsb2FkZXIiLCJvcHRpb25zIiwicHJlc2V0cyIsIm91dHB1dCIsImZpbGVuYW1lIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLE9BQU9DLFFBQVEsTUFBUixDQUFiOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFNBQU9KLEtBQUtLLElBQUwsQ0FBVUMsU0FBVixFQUFxQixZQUFyQixDQURRO0FBRWZKLFVBQVE7QUFDTkssYUFBUyxDQUNQO0FBQ0VDLFlBQU0sYUFEUjtBQUVFQyxlQUFTLGNBRlg7QUFHRUMsY0FBUSxjQUhWO0FBSUVDLGVBQVMsRUFBRUMsU0FBUyxDQUFFLFFBQUYsRUFBWSxPQUFaLENBQVg7QUFKWCxLQURPO0FBREgsR0FGTztBQVlmQyxVQUFRO0FBQ05iLFVBQU1NLFNBREE7QUFFTlEsY0FBVTtBQUZKO0FBWk8sQ0FBakIiLCJmaWxlIjoid2VicGFjay5jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL2luZGV4LmpzJyksXG4gIG1vZHVsZToge1xuICAgIGxvYWRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgdGVzdDogL1xcLihqc3xqc3gpJC8sXG4gICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvLFxuICAgICAgICBsb2FkZXI6ICdiYWJlbC1sb2FkZXInLFxuICAgICAgICBvcHRpb25zOiB7IHByZXNldHM6IFsgJ2VzMjAxNScsICdyZWFjdCcgXSB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuICBvdXRwdXQ6IHtcbiAgICBwYXRoOiBfX2Rpcm5hbWUsXG4gICAgZmlsZW5hbWU6ICdidW5kbGUuanMnXG4gIH0sXG59O1xuIl19