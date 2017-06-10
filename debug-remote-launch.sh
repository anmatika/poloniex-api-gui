#!/bin/bash
chromium --remote-debugging-port=9222 --user-data-dir=remote-profile  -incognito --new-window http://localhost:3000 