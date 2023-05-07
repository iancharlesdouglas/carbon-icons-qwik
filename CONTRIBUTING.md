# Contributing

## Getting Started

### Prerequisites
- `node`
- `pnpm`

### Fork
Fork the repo and clone your fork to get the artefacts locally.

### Set Upstream Repo
Set the upstream repo so you can raise a PR against that repo:

```bash
git remote add upstream git@github.com:iancharlesdouglas/carbon-icons-qwik.git
```

### Install Dependencies
```bash
pnpm i
```

## Workflow

### Building the Icons

#### Generating
To generate the icons, run the tests - e.g. `pnpm test`.  Icons will be output to the `src/icons` folder and the `index.ts` file will be regenerated.  

#### Building
Run `pnpm build`.

## Submitting a Pull Request

### Sync Your Fork

Before submitting a pull request, make sure your fork is up to date with the latest upstream changes.

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### Submit a PR

After you've pushed your changes to remote, submit your PR. Make sure you are comparing `<YOUR_USER_ID>/feature` to `origin/main`.
