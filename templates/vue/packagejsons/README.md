packagejsons???
===============

Yes! Better name suggestions welcome, but here are the design constraints that
resulted in this directory:

* we need a different package.json for each contract language available in
  common/contracts
* we need to keep the filename `package.json` so that dependabot.com can
  recognize it and help us keep dependencies up-to-date
