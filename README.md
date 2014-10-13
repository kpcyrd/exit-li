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

	exit.li												all servers below
	seed.exit.li				kpcyrd		DE, debian	fc00:0000:0000:0000
	carnivore.exit.li			kpcyrd		NL, openbsd	fc00:0000:0000:0000
	breathingmanually.exit.li	kpcyrd		NL, debian	fc00:0000:0000:0000

Firefox
-------

Set Advanced > Network > Connection > Settings > Manual Proxy configuration

	HTTP Proxy:	exit.li	8080

Chromium
--------

	Todo (contributions welcome)

Tor
---

	HTTPProxy	exit.li:8080
	HTTPSProxy	exit.li:8080

