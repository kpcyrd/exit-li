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
    anything.exit.li            kpcyrd      FR, debian  fc08:fa0c:d028:6e88:c682:78a4:1f8a:e01b
    decay.exit.li               kpcyrd      FR, debian  fce5:b02f:2e14:66b5:f7c8:3228:8a2b:ba55
    rainbow.exit.li             kpcyrd      FR, debian  fc46:d480:61bb:658e:8936:4547:70ea:f628

Tor
---

    HTTPProxy           exit.li:8080
    HTTPSProxy          exit.li:8080

XMPP
----

Configure `exit.li:8080` as http proxy. Your xmpp server needs to listen on `:5222`. Make sure you force tls.

