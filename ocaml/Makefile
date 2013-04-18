
JSMAIN=my_js
JSDIR=../js-gen
JSOPTS=-pretty -noinline -noruntime
#PACKAGES=deriving-ocsigen.base,deriving-ocsigen.syntax,js_of_ocaml,js_of_ocaml.syntax,js_of_ocaml.deriving.syntax,js_of_ocaml.deriving
PACKAGES=js_of_ocaml,js_of_ocaml.syntax,js_of_ocaml.deriving,js_of_ocaml.deriving.syntax

default: $(JSMAIN).js

%.js: %.byte
	js_of_ocaml $(JSOPTS) $^

%.cmo: %.ml
	ocamlfind ocamlc -c -package $(PACKAGES) -syntax camlp4o $^

$(JSMAIN).byte: *.cmo
	ocamlfind ocamlc -g -o $@ -linkpkg -package $(PACKAGES) $^

clean:
	rm -f *.cmo *.cmi *.byte *.js
	rm -f $(JSDIR)/*.js
	obuild clean

run: $(JSMAIN).js
	rhino $^

install: $(JSMAIN).js
	mkdir -p $(JSDIR)
	cp $^ $(JSDIR)

.PHONY: obuild-config obuild-build

obuild-config:
	obuild --verbose configure --enable-executable-bytecode --disable-executable-native

obuild-build: obuild-config
	obuild --debug+ build
