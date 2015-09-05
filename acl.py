#!/usr/bin/env python
from redis import StrictRedis as Redis
import sys

HOUR = 3600
DAY = 24 * HOUR

def allow(r, dest, ttl):
    r.set(dest, 1)
    r.expire(dest, ttl)

def main():
    r = Redis()
    for dest in sys.stdin:
        dest = dest.strip()
        print('allowing %r' % dest)
        allow(r, dest, 2 * DAY)

if __name__ == '__main__':
    main()
