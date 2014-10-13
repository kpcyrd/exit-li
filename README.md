exit.li
=======

This is a free proxy service for the hyperboria community.

It allows to access clearnet services over hyperboria. [cjdns](1) is required for this.

[1]: https://github.com/cjdelisle/cjdns

Setup
-----

All servers are connected to an anonymous vpn to exit the traffic. We don't monitor anything, but you need to trust us and trust the vpn provider not to monitor your traffic. Use [HTTPS-everywhere](1) to encrypt your web traffic.


	[Your computer] -> cjdns nodes -> [exit.li] -> [anonymous vpn] -> internet


[1]: https://www.eff.org/Https-everywhere

Servers
-------

	exit.li                                             all servers below
	seed.exit.li                kpcyrd      DE, debian  fc1f:ab0e:6eb8:780c:68af:4eb7:d8aa:b0fd
	carnivore.exit.li           kpcyrd      NL, openbsd fc07:90e1:a1d4:498a:6d55:8348:34f9:bdcb
	breathingmanually.exit.li   kpcyrd      NL, ubuntu  fc9d:c635:e53a:6c41:3916:de8a:94e2:b435

Firefox
-------

Preferences -> Advanced > Network > Connection > Settings > Manual Proxy configuration

	HTTP Proxy:	exit.li	8080

Chromium
--------

By default, Chrome/Chromium uses the system/OS proxy configuration. This can be changed with an extension such as [FoxyProxy](https://chrome.google.com/webstore/detail/foxyproxy-standard/gcknhkkoolaabfmlnjonogaaifnjlfnp?hl=en) or via the commandline, documented [here](http://www.chromium.org/developers/design-documents/network-settings).

Tor
---

    HTTPProxy           exit.li:8080
    HTTPSProxy          exit.li:8080
    ReachableAddresses  accept *:443

SSH
---

    aptitude install connect-proxy

    ProxyCommand connect-proxy -H exit.li:8080 %h %p

