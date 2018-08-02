#!/bin/bash

git add src
git add server
git add README.md
git commit -m "dapp update"
git pull -r
git push