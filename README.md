# bf-calc

## Prerequisites

* [Node.js](https://nodejs.org/) version 6 or newer
* [`git`](https://www.atlassian.com/git/tutorials/install-git/) for your platform
  * Note for Windows users:
    * Edit `$HOME\.gitconfig`:<br/>
      Add these lines to avoid checking in files with CRLF newlines<br><pre>
      [core]
          autocrlf = input</pre>
* [Firebase CLI](https://www.npmjs.com/package/firebase-tools) install the latest

## Installation / Building Node Calc

1. `cd` into the newly cloned project folder
2. `cd` into `functions` folder
3. Run `npm install`
3. Run `firebase serve` to start local develop server 
4. Open `http://localhost:5000/info` in a web browser
5. [Deploy to FireBase](https://firebase.google.com/docs/hosting/deploying)
