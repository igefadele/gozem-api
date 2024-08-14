import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { router as indexRouter} from './routes/indexRouter';
import { router as errorRouter } from './routes/errorRouter';
import { router as successRouter} from './routes/successRouter';
import session from 'express-session';
import dotenv from 'dotenv'
import rateLimit from "express-rate-limit"
import morgan from "morgan"
import cors from "cors"
import fs from 'fs';
var hbs = require('hbs');
import { createProxyMiddleware } from 'http-proxy-middleware';
import { contactDetailsStrings, footerStrings } from './values/strings.values';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// LIVE RELOAD
if (process.env.NODE_ENV === "development") {
  var livereload = require("livereload");
  var connectLiveReload = require("connect-livereload")
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "public"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}


// Proxy requests to /blog to your WordPress site
app.use('/blog', createProxyMiddleware({
  target: 'https://mawidowsfoundation.org/blog', 
  changeOrigin: true, // Change the origin of the host header to the target URL
  pathRewrite: {
    '^/blog': '', // Remove /blog from the request path
  },
}));

//SESSION COOKIE
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.SECURE_COOKIE === 'true'} 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'hbs');
//app.engine('html', require('hbs').__express);
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials', function (err: any) { });

// Middleware to set the layout if not specified
app.use((req, res, next) => {
  res.locals.layout = '/layouts/main'; // Default layout
  res.locals.contactDetailsStrings = contactDetailsStrings;
  res.locals.footerStrings = footerStrings;
  next();
});

// Custom hbs helper
hbs.registerHelper('eq', function (a: string, b: string) {
  return a === b;
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the styles directory
app.use('/styles', express.static(path.join(__dirname, 'styles')));



// SET UP LOGS
const logsDir = path.join(process.cwd(), "logs")
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

const logStream = fs.createWriteStream(path.join(logsDir, "access.log"), {
  flags: "a",
})

app.use(morgan("combined", { stream: logStream }))

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

app.use(limiter)

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: () => void) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

// ROUTES
app.use('/', indexRouter);
app.use('/error', errorRouter);
app.use('/success', successRouter);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404 - Page Not Found' });
});

// START SERVER AND LISTEN ON SPECIFIED PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
