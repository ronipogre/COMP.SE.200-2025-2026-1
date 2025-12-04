# COMP.SE.200-2025-2026-1 Software Testing

[![Coverage Status](https://coveralls.io/repos/github/ronipogre/COMP.SE.200-2024-2025-1/badge.svg?branch=main&kill_cache=1)](https://coveralls.io/github/ronipogre/COMP.SE.200-2024-2025-1?branch=main)

Project repository for the COMP.SE.200-2025-2026-1 Software Testing -course.

## Description

In the project, 10 functions from a utility function library used in an e-commerce application were unit tested. The utility library was forked from the [provided GitHub repository](https://github.com/otula/COMP.SE.200-2024-2025-1). The library's functions are under `/src`, while the unit tests are under `/tests`.

## Tech Stack

<img src="https://skillicons.dev/icons?i=js" width="20"/> **JavaScript** - Programming language of the utility library and tests <br><br>
<img src="https://skillicons.dev/icons?i=nodejs" width="20"/> **Node.js** - JavaScript runtime environment <br><br>
<img src="https://skillicons.dev/icons?i=npm" width="20"/> **npm** - Dependency installer <br><br>
<img src="https://skillicons.dev/icons?i=jest" width="20"/> **Jest** - Testing framework <br><br>
<img src="https://skillicons.dev/icons?i=githubactions" width="20"/> **GitHub Actions** - CI/CD platform used for automated testing <br><br>
<img src="https://avatars.githubusercontent.com/u/16691566?s=200&v=4" width="20"/> **Coveralls** - Coverage tracker <br>

## Prerequisites

- [Node.js](https://nodejs.org/en)

## Installation

Clone the repository and navigate to it:
```bash
git clone https://github.com/ronipogre/COMP.SE.200-2025-2026-1.git
cd COMP.SE.200-2025-2026-1
```
Install the project dependencies:
```bash
npm install
```

## Running Tests & Generating Coverage

Run the tests and create coverage:
```bash
npm test
```

After running the tests, the coverage report can be found locally at:
```bash
coverage/lcov-report/index.html
```
