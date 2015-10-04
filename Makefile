all: exit.d.tar.xz

exit.d.tar.xz: $(wildcard exit.d/*)
	tar cJf $@ $^
