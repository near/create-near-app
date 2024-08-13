# Contributing to NEAR

NEAR welcomes help in many forms including development, code review, documentation improvements, and outreach.
Please visit [the contribution overview](https://docs.near.org/docs/community/contribute/contribute-overview) for more information.

## Using Github issues and pull requests

Some repositories have specific issue templates that will be helpful for maintainers and community contributors. Please use the templates whenever available.

Please include steps to reproduction, if reporting an error. Information on all applicable versions is quite helpful. Some versions can be found using the command line. (For example: `node --version` or `rustc --version`.) Other version information may be packaged as dependencies. (For example: in `package.json` or `Cargo.toml`.)

If there are verbosity flags available, please include those to offer as much information as possible.

When opening a pull request, please use the typical open-source flow of forking the desired repository and opening a pull request from your forked repository. (More information on [how to contribute](https://docs.near.org/docs/community/contribute/how-to-contribute).)

To make changes to `create-near-app` itself:

* clone the repository (Windows users, [use `git clone -c core.symlinks=true`](https://stackoverflow.com/a/42137273/249801))
* in your terminal, enter one of the folders inside `templates`, such as `templates/frontend/next-app`
* now you can run `pnpm install` to install dependencies and `pnpm run dev` to run the local development server, just like you can in a new app created with `create-near-app`


## About commit messages

`create-near-app` uses semantic versioning and auto-generates nice release notes & a changelog all based off of the commits. We do this by enforcing [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). In general the pattern mostly looks like this:

    type(scope?): subject  #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")

Real world examples can look like this:

    chore: run tests with GitHub Actions

    fix(server): send cors headers

    feat(blog): add comment section

If your change should show up in release notes as a feature, use `feat:`. If it should show up as a fix, use `fix:`. Otherwise, you probably want `refactor:` or `chore:`. [More info](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

## Testing

Please note that for technical contributions, NEAR runs a battery of continuous integration tools and tests for each pull request.

It's encouraged to write unit tests on new features. Many NEAR repositories have built-in scripts that run tests locally. Tests may check linting and must be addressed.

For example, a repository might have `npm test` available. It's a good idea to run tests locally before submitting a pull request, as these will be caught during the CI process.

## Deploy `create-near-app`

If you want to deploy a new version, you will need two prerequisites:

1. Get publish-access to [the NPM package](https://www.npmjs.com/package/near-api-js)
2. Get write-access to [the GitHub repository](https://github.com/near/near-api-js)
3. Obtain a [personal access token](https://gitlab.com/profile/personal_access_tokens) (it only needs the "repo" scope).
4. Make sure the token is [available as an environment variable](https://github.com/release-it/release-it/blob/master/docs/environment-variables.md) called `GITHUB_TOKEN`

Then run one script:

    npm run release

Or just `release-it`

## Thank you

NEAR values all contributors to the projects in the ecosystem and invites public discussion on the tech and vision. Please feel free to join the conversation using the links offered at [near.help](https://near.help).
