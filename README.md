# About
![image](https://user-images.githubusercontent.com/55328925/211334625-3d46cd38-44d4-4a58-bbfd-4d15fc375c2a.png)
Web client for ShTP REST API. </br>![Build](https://github.com/ITClassDev/FrontEnd/actions/workflows/build.js.yml/badge.svg)
## Stack
- **ReactJS** - base framework
- **axios** - http requests to API
- **react-router-dom** - Routing on frontend
- **Ant Design** - Main UI Kit
- **react-syntax-highlighter** - highlight users code and code in docs
- **GitHub actions** - auto build on GitHub servers and auto-deploy to our server
## Run
First of all, install all dependencies via npm
```
npm i
```
You can run development version to view your changes in real-time. This is not an optimzied build.
```
npm run start
```
For production deployment you have to build
```
npm run build
```
And then serve it via http server. For example **serve**, but we recomend to use **nginx**:
```
serve -s build
```
## CheckList
- [x] Setup CI process on GitHub Actions
- [ ] Fix all issues (created before LTS release)
- [ ] Implement all UI (static, no fetch from api)
- [ ] Bind calls to API to static front (fetch data from api)
- [ ] Refractor code
- [x] Fix dependency security problems
