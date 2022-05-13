import React, { useState } from 'react';

function Home() {
  const [apiResponse, setApiResponse] = useState(null);

  async function fetchApi(slug) {
    try {
      const res = await fetch(`/api/${slug}`);
      const json = await res.json();
      if (json.data) {
        setApiResponse(json.data);
      }
    } catch (e) {
      if (window.location.hostname === 'localhost') {
        console.warn(
          "Can't access the auth endpoint. For local development, please use the Static Web Apps CLI to emulate authentication: https://github.com/azure/static-web-apps-cli"
        );
      } else {
        console.error(`Failed to unpack JSON.`, e);
      }
    }
  }

  return (
    <main align="center">
      <img src="/images/pwa-on-swa.png" alt="PWA on SWA" width="200" />
      <p>
        Minimalistic starter of a{' '}
        <a href="https://aka.ms/learn-pwa">Progressive Web Application</a>{' '}
        scaffolded by Create React App with a service worker automated by{' '}
        <a href="https://workboxjs.org">Workbox</a> and configured to run on{' '}
        <a href="https://aka.ms/swa-learn">Azure Static Web Apps</a>
      </p>
      <h1>Demo areas</h1>

      <div className="grid">
        <div className="card">
          <h3>Single-page-app routing</h3>
          <ul>
            <li>
              <a href="/about">A route within SPA</a> - open this URL in a new
              tab both in online and offline mode to make sure that HTML5
              navigation is working
            </li>
            <li>
              <a href="/privacy.html">A route excluded from SPA</a>
            </li>
          </ul>
          <hr />
          <p>To set up SPA routing:</p>
          <ol>
            <li>
              Set up <span className="code">navigationFallback</span> in{' '}
              <a href="https://github.com/webmaxru/pwa-on-swa/blob/main/staticwebapp.config.json">
                SWA Config
              </a>
            </li>
            <li>
              Set up <span className="code">createHandlerBoundToURL</span> in{' '}
              <a href="https://github.com/webmaxru/pwa-on-swa/blob/main/src/sw/service-worker.js">
                Service Worker
              </a>
            </li>
            <li>
              To exclude a route from Service Worker's redirection, add it to{' '}
              <span className="code">denylist</span> of{' '}
              <span className="code">NavigationRoute</span> in{' '}
              <a href="https://github.com/webmaxru/pwa-on-swa/blob/main/src/sw/service-worker.js">
                Service Worker
              </a>
            </li>
          </ol>
        </div>

        <div className="card">
          <h3>API caching</h3>
          <p>
            You can apply various caching strategies for the runtime https
            calls.
          </p>
          <br />

          <button className="button" onClick={() => fetchApi('news')}>
            Call /api/news (Network First)
          </button>
          <br />
          <br />
          <button className="button" onClick={() => fetchApi('archives')}>
            Call /api/archives (Cache First)
          </button>
          <br />
          <br />
          {apiResponse ? (
            <>{apiResponse}</>
          ) : (
            <p>
              <i>
                Open browser's console and click a button to trigger API
                endpoint
              </i>
            </p>
          )}
          <hr />
          <p>To set up runtime caching:</p>
          <ol>
            <li>
              Add <span className="code">registerRoute</span> with a relevant
              caching strategy for SWA'a API endpoints in{' '}
              <a href="https://github.com/webmaxru/pwa-on-swa/blob/main/src/sw/service-worker.js">
                Service Worker
              </a>
            </li>
          </ol>
        </div>

        <div className="card">
          <h3>Error handling</h3>
          <ul>
            <li>
              <a href="/static/non-existing-url">Non existing page</a>
            </li>
            <li>
              <a href="/account">Authentication error</a>. Instead of showing
              this error you can automatically redirect to login page by
              changing to{' '}
              <span className="code">
                "401": &#123; "redirect": "/login", "statusCode": 302 &#125;
              </span>{' '}
              in{' '}
              <a href="https://github.com/webmaxru/pwa-on-swa/blob/main/staticwebapp.config.json">
                SWA Config
              </a>
            </li>
          </ul>
          <hr />
          <p>To have custom error pages:</p>
          <ol>
            <li>
              Set up <span className="code">responseOverrides</span> in{' '}
              <a href="https://github.com/webmaxru/pwa-on-swa/blob/main/staticwebapp.config.json">
                SWA Config
              </a>
            </li>
            <li>
              Add these pages to <span className="code">denylist</span> of{' '}
              <span className="code">NavigationRoute</span> in{' '}
              <a href="https://github.com/webmaxru/pwa-on-swa/blob/main/src/sw/service-worker.js">
                Service Worker
              </a>
            </li>
          </ol>
        </div>

        <div className="card">
          <h3>Authentication</h3>
          <ul>
            <li>
              <a href="/login">Log in</a> page
            </li>
            <li>
              <a href="/account">Account</a> page - you have to have{' '}
              <span className="code">authenticated</span> built-in role to
              access it
            </li>
            <li>
              <a href="/admin">Admin</a> page - you have to have{' '}
              <span className="code">administrator</span> custom role to access
              it
            </li>
          </ul>
          <hr />
          <p>Rules of thumb for authentication in PWA on SWA:</p>
          <ol>
            <li>
              Exclude all restricted pages from Service Worker's redirection by
              adding them <span className="code">denylist</span> of{' '}
              <span className="code">NavigationRoute</span> in{' '}
              <a href="https://github.com/webmaxru/pwa-on-swa/blob/main/src/sw/service-worker.js">
                Service Worker
              </a>
            </li>
            <li>
              Add "system folder" <span className="code">/.auth</span> to the
              same <span className="code">denylist</span>
            </li>
            <li>
              Never set up runtime caching (
              <span className="code">registerRoute</span>) for the restricted
              API endpoints
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}

export default Home;
