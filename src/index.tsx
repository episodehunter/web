import React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';

ReactDOM.render(<App />, document.getElementById('root'))

// import SearchWorker from 'worker-loader!./web-worker/search';

// (window as any).SearchWorker = SearchWorker;

// var SearchWorker = require("worker-loader?name=hash.worker.js!./web-worker/search");
// var worker = new SearchWorker();
// worker.onmessage = function(event) {
// 	console.log(event.data);
// };

// (window as any).searchShow = s => worker.postMessage(s);

// (window as any).searchShow('D'); (window as any).searchShow('De'); (window as any).searchShow('Dex'); (window as any).searchShow('Dext'); (window as any).searchShow('Dextr');
