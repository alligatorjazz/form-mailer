# form mailer demo


## Tech Stack
### Frontend
- [Astro](https://astro.build/) for frontend UI and static site generation.
- [Vue.js](https://vuejs.org/) for interactive components. (Used as an Astro integration.)

### Backend
- [Fastify](https://fastify.dev/) for the backend's web server.
- [lowdb](https://github.com/typicode/lowdb) for the database.

### Other
- [Zod](https://zod.dev/) for data validation.
- [esrun](https://www.npmjs.com/package/esrun) to run Typescript directly in Node.js.

<!-- Sign into web panel with SSO
Enable the form, providing your site URL and email address
a. Possibly manage blocking addresses / words?
Get code snippet or web component to add to your site
a. Form makes POST to something like api.32bit.cafe/contact/v1/example.com
From a tech perspective, my initial thought is to use the following tech stack. It is what I’m most comfortable with but I’m open to other languages/frameworks/etc. as well.

Backend (web panel + email sending service)
Written in Go, emails sent using net/smtp in the standard library
Sqlite3 for database
Users sign in with SSO
Web panel can be used for user configuration of future projects as well, the one we were discussing next is a guestbook
Frontend
Web panel in htmx
Code snippet / web component in HTML/JS (as needed) -->