#!/bin/sh
run-parts /etc/exit.d/ | /opt/exit/allow.py > /dev/null
