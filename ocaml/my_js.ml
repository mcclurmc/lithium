(* let v = Js.Unsafe.variable "window.document" ;; *)

external ( @@ ) : ('a -> 'b) -> 'a -> 'b = "%apply" ;;

let f x = x ;;

let (print : string -> unit) s =
	let s = Js.string s in
	Js.Unsafe.fun_call (Js.Unsafe.variable "console.log") [|Js.Unsafe.inject s|] ;;

let (print_js : Js.js_string Js.t -> unit) s =
	Js.Unsafe.fun_call (Js.Unsafe.variable "console.log") [|Js.Unsafe.inject s|] ;;

(* type item_ty = UseCase | Requirement deriving (Json) *)
(* type uuid = string deriving (Json) *)
(* type item = { id : uuid *)
(* 						; title : string *)
(* 						; parent : uuid option *)
(* 						; ty : item_ty } deriving (Json) *)
(* type link = { source : uuid *)
(* 						; target : uuid *)
(* 						; value : int } deriving (Json) *)
(* type graph = { nodes : item list *)
(* 						 ; links : link list } deriving (Json) *)

type item_ty = UseCase | Requirement
type uuid = string
type item = { id : uuid
						; title : string
						; parent : uuid option
						; ty : item_ty }
type link = { source : uuid
						; target : uuid
						; value : int }
type graph = { nodes : item list
						 ; links : link list }

let build_graph items = () ;;

let graph = { nodes = [ { id = "u1"
												; title = "Bikeshed is pretty"
												; parent = Some "u1"
												; ty = Requirement } ]
						; links = [ ] } ;;

let o = object method foo = "bar" end ;;

let g = { nodes = [] ; links = [] }

(* let doit () = *)
let _ =
	print "hello javascript";
	print (Js.to_string (Json.output graph));
	print_js (Json.output graph);
	print_js (Json.output o);
	(* print (Deriving_Json.(to_string Json.t<graph> g)); *)
	print (Deriving_Json.(to_string Json.t<int> 42));
	Js.string "foo"
;;

(* let _ = (Js.Unsafe.coerce Dom_html.window)##foo <- Js.wrap_callback doit ;; *)

(* let _ = (Js.Unsafe.coerce Dom_html.document)##title (Js.Unsafe.inject "Hello world") ;; *)

(* let _ = (Js.Unsafe.coerce Dom_html.window)##alert (Js.Unsafe.inject "Hello world") ;; *)

(* let _ = Js.Unsafe.(coerce (variable "Array")##foo <- *)
(* 										 Js.wrap_callback doit) ;; *)
