#!/bin/sh
run-parts /etc/exit.d/ | /opt/exit/acl.py > /dev/null
