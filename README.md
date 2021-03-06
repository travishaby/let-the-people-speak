[![Stories in Ready](https://badge.waffle.io/travishaby/realtime-polling.png?label=ready&title=Ready)](https://waffle.io/travishaby/realtime-polling)
# RealTime project for Module 4 at the Turing School

This is a polling app utilizing web sockets for real-time interactions. Project spec can be found [here](https://github.com/turingschool/curriculum/blob/master/source/projects/real_time.markdown).

## 0. Production Link

[Let The People Speak](http://let-the-people-speak.herokuapp.com)

## 1. Up and Running

Clone the repo:

```
$ git clone git@github.com:travishaby/realtime-polling.git
```

Install the dependencies:

```
$ npm install
```

Run the tests:

```
$ npm test
```

Start the server:

```
$ npm start
```

## 2. Feature Testing

The feature test for this app uses Nightwatch, which requires selenium. Run the command below:
```
$ brew install selenium-server-standalone
```
Before you run the feature tests, you must have the selenium server running:
```
$ selenium-server -port 4444
```
In order to run `nightwatch` from the command line, run:
```
$ npm install -g nightwatch
```
Finally, run the feature tests using
```
$ nightwatch feature_tests.js
```
