#!/usr/bin/env python
from subprocess import check_output
import json
import sys

def gen():
    conf = check_output(['cjdroute --genconf | cjdroute --cleanconf'], shell=True)
    return json.loads(str(conf, 'ascii'))

if len(sys.argv) > 1:
    c = gen()

    print('---')
    print('cjdns_privateKey:   ' + c['privateKey'])
    print('cjdns_publicKey:    ' + c['publicKey'])
    print('cjdns_ipv6:         ' + c['ipv6'])
    print('')
    print('cjdns_admin_pw:     ' + c['admin']['password'])
    print('')
    print('cjdns_ingress_addr: ' + sys.argv[1])
    print('cjdns_ingress_port: ' + c['interfaces']['UDPInterface'][0]['bind'][8:])
    print('cjdns_ingress_pw:   ' + c['authorizedPasswords'][0]['password'])
