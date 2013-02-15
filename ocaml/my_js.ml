(* let v = Js.Unsafe.variable "window.document" ;; *)

external ( @@ ) : ('a -> 'b) -> 'a -> 'b = "%apply" ;;

let f x = x ;;

let (print : string -> unit) s =
	let s = Js.string s in
	Js.Unsafe.fun_call (Js.Unsafe.variable "print") [|Js.Unsafe.inject s|] ;;

let _ = print "hello javascript" ;;
