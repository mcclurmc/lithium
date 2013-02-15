
JSMAIN=my_js
JSDIR=../js-gen
PACKAGES=js_of_ocaml,js_of_ocaml.syntax

default: $(JSMAIN).js

%.js: %.byte
	js_of_ocaml $^

%.cmo: %.ml
	ocamlfind ocamlc -c -package $(PACKAGES) -syntax camlp4o $^

$(JSMAIN).byte: *.cmo
	ocamlfind ocamlc -o $@ -linkpkg -package $(PACKAGES) $^

clean:
	rm -f *.cmo *.cmi *.byte *.js
	rm -f $(JSDIR)/*.js

run: $(JSMAIN).js
	rhino $^

install: $(JSMAIN).js
	mkdir -p $(JSDIR)
	cp $^ $(JSDIR)
