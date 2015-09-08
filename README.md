exit.li
=======

![exit.li](/exit.png)

This is a free proxy service for the hyperboria community.

It allows to access clearnet services over hyperboria. [cjdns][1] is required for this.

[1]: https://github.com/cjdelisle/cjdns

Servers
-------

	exit.li                                             all servers below
    yeti.exit.li                kpcyrd      FR, debian  fcbd:5668:fe09:043a:d838:0181:6b51:ba5e

Tor
---

    HTTPProxy           exit.li:8080 # this doesn't tested yet
    HTTPSProxy          exit.li:8080

XMPP
----

Configure `exit.li:8080` as http proxy. Your xmpp server needs to listen on `:5222`. Make sure you force tls.

