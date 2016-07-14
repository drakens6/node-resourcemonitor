# node-resourcemon
A server profiler for NodeJS to assist in monitoring NodeJS server application performance. 

![screenshot](https://raw.githubusercontent.com/drakens6/node-resourcemonitor/master/screenshot.png)

Monitors:
- CPU performance across all cores
- Scheduling Policy and related settings
- Memory Usage
- Heap Size

Easy to use:

- Pull the code, navigate to directory.
- Run the server by typing "node server.js" into a separate terminal window. This can run concurrently with other node instances.
- Defaults to port 3010. Navigate to localhost:3010.
- Press the 'Start' button to begin profiling.
- Press the 'Stop' button to pause/halt profiling.

Components utilized:

- Chart.js http://www.chartjs.org/
- Bootstrap http://getbootstrap.com/
- AngularJS https://angularjs.org/
- Debug https://github.com/visionmedia/debug
- Express http://expressjs.com/
- Express Body Parser https://github.com/expressjs/body-parser
- Swig http://paularmstrong.github.io/swig/
