---
layout: post
publishDate: May 12, 2025
title: Dasturchi evolyutsiyasi
tags: js, career
isListed: true
---

![dunning-kruger effekti](/public/images/dunning-kruger.jpg)

## 1-yil

```js
console.log('Hello World!');
```

## 2-yil

```js
function printMessage(message) {
  console.log(message);
}

printMessage('Hello World!');
```

## 3-yil

```js
class Logger {
  constructor(config) {
    this.prefix = config.prefix || '';
    this.suffix = config.suffix || '';
  }

  log(message) {
    console.log(`${this.prefix}${message}${this.suffix}`);
  }
}

const config = {
  prefix: '[INFO] ',
  suffix: ' ✅',
};

const logger = new Logger(config);
logger.log('Hello World!');
```

## 5-yil

```js
// Event bus abstraction
class EventBus {
  constructor() {
    this.listeners = {};
  }

  subscribe(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  publish(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(data));
    }
  }
}

// Middleware pipeline
class MiddlewarePipeline {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  execute(context) {
    const executeMiddleware = (index) => {
      if (index < this.middlewares.length) {
        this.middlewares[index](context, () => executeMiddleware(index + 1));
      }
    };
    executeMiddleware(0);
  }
}

// Formatter (reused)
class Formatter {
  format(message) {
    return `[INFO] ${new Date().toISOString()} - ${message} ✅`;
  }
}

// Logger Service (decoupled from transport)
class LoggerService {
  constructor(pipeline) {
    this.pipeline = pipeline;
  }

  log(message) {
    const context = { message };
    this.pipeline.execute(context);
  }
}

// Concrete transport (could be extended for remote logging)
class ConsoleTransport {
  handle(context) {
    console.log(context.message);
  }
}

// Bootstrap microservice-like app
class AppService {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  start() {
    this.eventBus.publish('app.started', { timestamp: Date.now() });
  }
}

// Setup everything
const eventBus = new EventBus();
const pipeline = new MiddlewarePipeline();

// Middleware to format
pipeline.use((ctx, next) => {
  const formatter = new Formatter();
  ctx.message = formatter.format(ctx.message);
  next();
});

// Middleware to transport
pipeline.use((ctx, next) => {
  const transport = new ConsoleTransport();
  transport.handle(ctx);
  next();
});

// Create logger and subscribe to events
const logger = new LoggerService(pipeline);
eventBus.subscribe('app.started', () => {
  logger.log('Hello World!');
});

// Start the app
const app = new AppService(eventBus);
app.start();
```

## 10-yil

```js
console.log('Hello World!');
```

## Xulosa

o‘zingizdan!

---

"[The Evolution of a Software Engineer](https://medium.com/@webseanhickey/the-evolution-of-a-software-engineer-db854689243)" maqolasidan ilhomlanib yozildi.
