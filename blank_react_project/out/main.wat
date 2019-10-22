(module
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$ii (func (param i32) (result i32)))
 (type $FUNCSIG$v (func))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$viii (func (param i32 i32 i32)))
 (type $FUNCSIG$iiiiii (func (param i32 i32 i32 i32 i32) (result i32)))
 (type $FUNCSIG$viiii (func (param i32 i32 i32 i32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$viij (func (param i32 i32 i64)))
 (type $FUNCSIG$ij (func (param i64) (result i32)))
 (type $FUNCSIG$viji (func (param i32 i64 i32)))
 (type $FUNCSIG$vj (func (param i64)))
 (type $FUNCSIG$jj (func (param i64) (result i64)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (type $FUNCSIG$vjj (func (param i64 i64)))
 (type $FUNCSIG$iiiii (func (param i32 i32 i32 i32) (result i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "env" "input" (func $~lib/nearEntry/input (param i64)))
 (import "env" "register_len" (func $~lib/nearEntry/register_len (param i64) (result i64)))
 (import "env" "panic" (func $~lib/nearEntry/panic))
 (import "env" "read_register" (func $~lib/nearEntry/read_register (param i64 i64)))
 (import "env" "log_utf8" (func $~lib/near-runtime-ts/runtime_api/runtime_api.log_utf8 (param i64 i64)))
 (import "env" "value_return" (func $~lib/nearEntry/value_return (param i64 i64)))
 (memory $0 1)
 (data (i32.const 8) "\08\00\00\00\01\00\00\00\01\00\00\00\08\00\00\00:\00l\00e\00n")
 (data (i32.const 32) "\0c\00\00\00\01\00\00\00\01\00\00\00\0c\00\00\00:\00f\00r\00o\00n\00t")
 (data (i32.const 64) "\n\00\00\00\01\00\00\00\01\00\00\00\n\00\00\00:\00b\00a\00c\00k")
 (data (i32.const 96) "\04\00\00\00\01\00\00\00\01\00\00\00\04\00\00\00:\00:")
 (data (i32.const 120) "\04\00\00\00\01\00\00\00\01\00\00\00\04\00\00\00:\00r")
 (data (i32.const 144) " \00\00\00\01\00\00\00\01\00\00\00 \00\00\000\001\002\003\004\005\006\007\008\009\00a\00b\00c\00d\00e\00f")
 (data (i32.const 192) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00=")
 (data (i32.const 216) "\80\00\00\00\01\00\00\00\01\00\00\00\80\00\00\00A\00B\00C\00D\00E\00F\00G\00H\00I\00J\00K\00L\00M\00N\00O\00P\00Q\00R\00S\00T\00U\00V\00W\00X\00Y\00Z\00a\00b\00c\00d\00e\00f\00g\00h\00i\00j\00k\00l\00m\00n\00o\00p\00q\00r\00s\00t\00u\00v\00w\00x\00y\00z\000\001\002\003\004\005\006\007\008\009\00+\00/")
 (data (i32.const 360) "\08\00\00\00\01\00\00\00\01\00\00\00\08\00\00\00t\00r\00u\00e")
 (data (i32.const 384) "\n\00\00\00\01\00\00\00\01\00\00\00\n\00\00\00f\00a\00l\00s\00e")
 (data (i32.const 416) "\08\00\00\00\01\00\00\00\01\00\00\00\08\00\00\00n\00u\00l\00l")
 (data (i32.const 440) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\000")
 (data (i32.const 464) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\009")
 (data (i32.const 488) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00A")
 (data (i32.const 512) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00a")
 (data (i32.const 536) "@\00\00\00\01\00\00\00\01\00\00\00@\00\00\00.\00 \00W\00e\00l\00c\00o\00m\00e\00 \00t\00o\00 \00N\00E\00A\00R\00 \00P\00r\00o\00t\00o\00c\00o\00l\00 \00c\00h\00a\00i\00n")
 (data (i32.const 616) "\08\00\00\00\01\00\00\00\01\00\00\00\08\00\00\00n\00a\00m\00e")
 (data (i32.const 640) "0\00\00\00\01\00\00\00\01\00\00\000\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00s\00t\00r\00i\00n\00g\00 \00f\00i\00e\00l\00d\00 ")
 (data (i32.const 708) "\01\00\00\00\01")
 (data (i32.const 720) "\08\00\00\00\01\00\00\00\01\00\00\00\08\00\00\00 \00:\00 \00\"")
 (data (i32.const 744) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00\"")
 (data (i32.const 768) "F\00\00\00\01\00\00\00\01\00\00\00F\00\00\00~\00l\00i\00b\00/\00a\00s\00s\00e\00m\00b\00l\00y\00s\00c\00r\00i\00p\00t\00-\00j\00s\00o\00n\00/\00d\00e\00c\00o\00d\00e\00r\00.\00t\00s")
 (data (i32.const 856) ",\00\00\00\01\00\00\00\01\00\00\00,\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00b\00o\00o\00l\00 \00f\00i\00e\00l\00d\00 ")
 (data (i32.const 920) "\06\00\00\00\01\00\00\00\01\00\00\00\06\00\00\00 \00:\00 ")
 (data (i32.const 944) ",\00\00\00\01\00\00\00\01\00\00\00,\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00n\00u\00l\00l\00 \00f\00i\00e\00l\00d\00 ")
 (data (i32.const 1008) "2\00\00\00\01\00\00\00\01\00\00\002\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00i\00n\00t\00e\00g\00e\00r\00 \00f\00i\00e\00l\00d\00 ")
 (data (i32.const 1080) "\90\01\00\00\01\00\00\00\00\00\00\00\90\01\00\000\000\000\001\000\002\000\003\000\004\000\005\000\006\000\007\000\008\000\009\001\000\001\001\001\002\001\003\001\004\001\005\001\006\001\007\001\008\001\009\002\000\002\001\002\002\002\003\002\004\002\005\002\006\002\007\002\008\002\009\003\000\003\001\003\002\003\003\003\004\003\005\003\006\003\007\003\008\003\009\004\000\004\001\004\002\004\003\004\004\004\005\004\006\004\007\004\008\004\009\005\000\005\001\005\002\005\003\005\004\005\005\005\006\005\007\005\008\005\009\006\000\006\001\006\002\006\003\006\004\006\005\006\006\006\007\006\008\006\009\007\000\007\001\007\002\007\003\007\004\007\005\007\006\007\007\007\008\007\009\008\000\008\001\008\002\008\003\008\004\008\005\008\006\008\007\008\008\008\009\009\000\009\001\009\002\009\003\009\004\009\005\009\006\009\007\009\008\009\009")
 (data (i32.const 1496) "\10\00\00\00\01\00\00\00\0c\00\00\00\10\00\00\00H\04\00\00H\04\00\00\90\01\00\00d")
 (data (i32.const 1528) ".\00\00\00\01\00\00\00\01\00\00\00.\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00a\00r\00r\00a\00y\00 \00f\00i\00e\00l\00d\00 ")
 (data (i32.const 1592) " \00\00\00\01\00\00\00\01\00\00\00 \00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00m\00a\00i\00n\00.\00t\00s")
 (data (i32.const 1640) "0\00\00\00\01\00\00\00\01\00\00\000\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00o\00b\00j\00e\00c\00t\00 \00f\00i\00e\00l\00d\00 ")
 (data (i32.const 1704) "\1c\00\00\00\01\00\00\00\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data (i32.const 1752) "&\00\00\00\01\00\00\00\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data (i32.const 1808) "$\00\00\00\01\00\00\00\01\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data (i32.const 1864) "$\00\00\00\01\00\00\00\01\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 1920) "(\00\00\00\01\00\00\00\01\00\00\00(\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00i\00n\00p\00u\00t\00 \00e\00n\00d")
 (data (i32.const 1976) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00{")
 (data (i32.const 2000) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00}")
 (data (i32.const 2024) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00,")
 (data (i32.const 2048) "\18\00\00\00\01\00\00\00\01\00\00\00\18\00\00\00E\00x\00p\00e\00c\00t\00e\00d\00 \00\'\00,\00\'")
 (data (i32.const 2088) ":\00\00\00\01\00\00\00\01\00\00\00:\00\00\00E\00x\00p\00e\00c\00t\00e\00d\00 \00d\00o\00u\00b\00l\00e\00-\00q\00u\00o\00t\00e\00d\00 \00s\00t\00r\00i\00n\00g")
 (data (i32.const 2168) "^\00\00\00\01\00\00\00\01\00\00\00^\00\00\00E\00l\00e\00m\00e\00n\00t\00 \00t\00y\00p\00e\00 \00m\00u\00s\00t\00 \00b\00e\00 \00n\00u\00l\00l\00a\00b\00l\00e\00 \00i\00f\00 \00a\00r\00r\00a\00y\00 \00i\00s\00 \00h\00o\00l\00e\00y")
 (data (i32.const 2280) "\1a\00\00\00\01\00\00\00\01\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 2328) "8\00\00\00\01\00\00\00\01\00\00\008\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00c\00o\00n\00t\00r\00o\00l\00 \00c\00h\00a\00r\00a\00c\00t\00e\00r")
 (data (i32.const 2400) "\1c\00\00\00\01\00\00\00\01\00\00\00\1c\00\00\00~\00l\00i\00b\00/\00s\00t\00r\00i\00n\00g\00.\00t\00s")
 (data (i32.const 2448) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00\\")
 (data (i32.const 2472) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00/")
 (data (i32.const 2496) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00b")
 (data (i32.const 2520) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00\08")
 (data (i32.const 2544) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00n")
 (data (i32.const 2568) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00\n")
 (data (i32.const 2592) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00r")
 (data (i32.const 2616) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00\0d")
 (data (i32.const 2640) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00t")
 (data (i32.const 2664) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00\t")
 (data (i32.const 2688) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00u")
 (data (i32.const 2712) "&\00\00\00\01\00\00\00\01\00\00\00&\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00\\\00u\00 \00d\00i\00g\00i\00t")
 (data (i32.const 2768) "<\00\00\00\01\00\00\00\01\00\00\00<\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00e\00s\00c\00a\00p\00e\00d\00 \00c\00h\00a\00r\00a\00c\00t\00e\00r\00:\00 ")
 (data (i32.const 2848) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00:")
 (data (i32.const 2872) "\18\00\00\00\01\00\00\00\01\00\00\00\18\00\00\00E\00x\00p\00e\00c\00t\00e\00d\00 \00\'\00:\00\'")
 (data (i32.const 2912) "0\00\00\00\01\00\00\00\01\00\00\000\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00e\00n\00d\00 \00o\00f\00 \00o\00b\00j\00e\00c\00t")
 (data (i32.const 2976) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00[")
 (data (i32.const 3000) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00]")
 (data (i32.const 3024) ".\00\00\00\01\00\00\00\01\00\00\00.\00\00\00U\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00e\00n\00d\00 \00o\00f\00 \00a\00r\00r\00a\00y")
 (data (i32.const 3088) "\14\00\00\00\01\00\00\00\01\00\00\00\14\00\00\00E\00x\00p\00e\00c\00t\00e\00d\00 \00\'")
 (data (i32.const 3128) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00\'")
 (data (i32.const 3152) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00-")
 (data (i32.const 3176) "\"\00\00\00\01\00\00\00\01\00\00\00\"\00\00\00C\00a\00n\00n\00o\00t\00 \00p\00a\00r\00s\00e\00 \00J\00S\00O\00N")
 (data (i32.const 3232) "\14\00\00\00\01\00\00\00\01\00\00\00\14\00\00\00h\00e\00l\00l\00o\00 \00t\00e\00s\00t")
 (data (i32.const 3272) "\0e\00\00\00\01\00\00\00\01\00\00\00\0e\00\00\00H\00e\00l\00l\00o\00,\00 ")
 (data (i32.const 3304) "\04\00\00\00\01\00\00\00\01\00\00\00\04\00\00\00\\\00\"")
 (data (i32.const 3328) "\04\00\00\00\01\00\00\00\01\00\00\00\04\00\00\00\\\00\\")
 (data (i32.const 3352) "\04\00\00\00\01\00\00\00\01\00\00\00\04\00\00\00\\\00b")
 (data (i32.const 3376) "\04\00\00\00\01\00\00\00\01\00\00\00\04\00\00\00\\\00n")
 (data (i32.const 3400) "\04\00\00\00\01\00\00\00\01\00\00\00\04\00\00\00\\\00r")
 (data (i32.const 3424) "\04\00\00\00\01\00\00\00\01\00\00\00\04\00\00\00\\\00t")
 (data (i32.const 3448) "H\00\00\00\01\00\00\00\01\00\00\00H\00\00\00U\00n\00s\00u\00p\00p\00o\00r\00t\00e\00d\00 \00c\00o\00n\00t\00r\00o\00l\00 \00c\00h\00a\00r\00a\00c\00t\00e\00r\00 \00c\00o\00d\00e\00:\00 ")
 (data (i32.const 3536) "F\00\00\00\01\00\00\00\01\00\00\00F\00\00\00~\00l\00i\00b\00/\00a\00s\00s\00e\00m\00b\00l\00y\00s\00c\00r\00i\00p\00t\00-\00j\00s\00o\00n\00/\00e\00n\00c\00o\00d\00e\00r\00.\00t\00s")
 (data (i32.const 3624) "\02\00\00\00\01\00\00\00\01\00\00\00\02\00\00\00s")
 (data (i32.const 3648) "\1e\00\00\00\10\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\10\00\00\00\06\00\00\00\00\00\00\00\07\00\00\001\00\00\00\02")
 (data (i32.const 3740) "\10\00\00\00\00\00\00\00\93\00\00\00\02\00\00\00\93 \00\00\02\00\00\00\93\04\00\00\02\00\00\00\10")
 (data (i32.const 3784) "\07")
 (data (i32.const 3800) "\07")
 (data (i32.const 3816) "\07")
 (data (i32.const 3832) "\07")
 (data (i32.const 3848) "\07")
 (data (i32.const 3864) "\07")
 (data (i32.const 3880) "\07")
 (global $~lib/rt/stub/startOffset (mut i32) (i32.const 0))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $~lib/near-runtime-ts/storage/storage (mut i32) (i32.const 0))
 (global $~lib/near-runtime-ts/contract/context (mut i32) (i32.const 0))
 (global $~lib/assemblyscript-json/decoder/CHAR_0 (mut i32) (i32.const 0))
 (global $~lib/assemblyscript-json/decoder/CHAR_9 (mut i32) (i32.const 0))
 (global $~lib/assemblyscript-json/decoder/CHAR_A (mut i32) (i32.const 0))
 (global $~lib/assemblyscript-json/decoder/CHAR_A_LOWER (mut i32) (i32.const 0))
 (global $~lib/argc (mut i32) (i32.const 0))
 (global $~lib/nearEntry/PrimitiveHandler.String (mut i32) (i32.const 0))
 (global $~lib/nearEntry/PrimitiveHandler.Boolean (mut i32) (i32.const 0))
 (global $~lib/nearEntry/PrimitiveHandler.U64 (mut i32) (i32.const 0))
 (global $~lib/nearEntry/PrimitiveHandler.I64 (mut i32) (i32.const 0))
 (global $~lib/nearEntry/PrimitiveHandler.U32 (mut i32) (i32.const 0))
 (global $~lib/nearEntry/PrimitiveHandler.I32 (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 3648))
 (global $assembly/main/__near_ArgsParser_hello i32 (i32.const 8))
 (global $assembly/main/__near_ArgsParser_printString i32 (i32.const 28))
 (export "memory" (memory $0))
 (export "__alloc" (func $~lib/rt/stub/__alloc))
 (export "__retain" (func $~lib/rt/stub/__retain))
 (export "__release" (func $~lib/rt/stub/__release))
 (export "__collect" (func $~lib/rt/stub/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "__near_ArgsParser_hello" (global $assembly/main/__near_ArgsParser_hello))
 (export "__near_ArgsParser_hello#setString" (func $assembly/main/__near_ArgsParser_hello#setString))
 (export "__near_ArgsParser_hello#setBoolean" (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setBoolean))
 (export "__near_ArgsParser_hello#setNull" (func $assembly/main/__near_ArgsParser_hello#setNull))
 (export "__near_ArgsParser_hello#setInteger" (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setInteger))
 (export "__near_ArgsParser_hello#pushArray" (func $assembly/main/__near_ArgsParser_hello#pushArray))
 (export "__near_ArgsParser_hello#popArray" (func $~lib/rt/stub/__release))
 (export "__near_ArgsParser_hello#pushObject" (func $assembly/main/__near_ArgsParser_hello#pushObject))
 (export "__near_ArgsParser_hello#popObject" (func $~lib/rt/stub/__release))
 (export "__near_ArgsParser_hello#get:buffer" (func $~lib/typedarray/Uint8Array#get:buffer))
 (export "__near_ArgsParser_hello#set:buffer" (func $__near_ArgsParser_hello#set:buffer))
 (export "__near_ArgsParser_hello#get:decoder" (func $__near_ArgsParser_hello#get:decoder))
 (export "__near_ArgsParser_hello#set:decoder" (func $__near_ArgsParser_hello#set:decoder))
 (export "__near_ArgsParser_hello#get:handledRoot" (func $__near_ArgsParser_hello#get:handledRoot))
 (export "__near_ArgsParser_hello#set:handledRoot" (func $__near_ArgsParser_hello#set:handledRoot))
 (export "__near_ArgsParser_hello#get:__near_param_name" (func $__near_ArgsParser_hello#get:__near_param_name))
 (export "__near_ArgsParser_hello#set:__near_param_name" (func $__near_ArgsParser_hello#set:__near_param_name))
 (export "hello" (func $assembly/main/__wrapper_hello))
 (export "__near_ArgsParser_printString" (global $assembly/main/__near_ArgsParser_printString))
 (export "__near_ArgsParser_printString#setString" (func $assembly/main/__near_ArgsParser_printString#setString))
 (export "__near_ArgsParser_printString#setBoolean" (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setBoolean))
 (export "__near_ArgsParser_printString#setNull" (func $assembly/main/__near_ArgsParser_printString#setNull))
 (export "__near_ArgsParser_printString#setInteger" (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setInteger))
 (export "__near_ArgsParser_printString#pushArray" (func $assembly/main/__near_ArgsParser_hello#pushArray))
 (export "__near_ArgsParser_printString#popArray" (func $~lib/rt/stub/__release))
 (export "__near_ArgsParser_printString#pushObject" (func $assembly/main/__near_ArgsParser_printString#pushObject))
 (export "__near_ArgsParser_printString#popObject" (func $~lib/rt/stub/__release))
 (export "__near_ArgsParser_printString#get:buffer" (func $~lib/typedarray/Uint8Array#get:buffer))
 (export "__near_ArgsParser_printString#set:buffer" (func $__near_ArgsParser_printString#set:buffer))
 (export "__near_ArgsParser_printString#get:decoder" (func $__near_ArgsParser_hello#get:decoder))
 (export "__near_ArgsParser_printString#set:decoder" (func $__near_ArgsParser_hello#set:decoder))
 (export "__near_ArgsParser_printString#get:handledRoot" (func $__near_ArgsParser_hello#get:handledRoot))
 (export "__near_ArgsParser_printString#set:handledRoot" (func $__near_ArgsParser_hello#set:handledRoot))
 (export "__near_ArgsParser_printString#get:__near_param_s" (func $__near_ArgsParser_hello#get:__near_param_name))
 (export "__near_ArgsParser_printString#set:__near_param_s" (func $__near_ArgsParser_hello#set:__near_param_name))
 (export "printString" (func $assembly/main/__wrapper_printString))
 (start $start)
 (func $~lib/rt/stub/__alloc (; 7 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.const 1073741808
  i32.gt_u
  if
   unreachable
  end
  global.get $~lib/rt/stub/offset
  i32.const 16
  i32.add
  local.tee $3
  local.get $0
  i32.const 1
  local.tee $2
  local.get $0
  local.get $2
  i32.gt_u
  select
  i32.add
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $4
  memory.size
  local.tee $2
  i32.const 16
  i32.shl
  i32.gt_u
  if
   local.get $2
   local.get $4
   local.get $3
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $5
   local.tee $6
   local.get $2
   local.get $6
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $5
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $4
  global.set $~lib/rt/stub/offset
  local.get $3
  i32.const 16
  i32.sub
  local.tee $2
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store offset=12
  local.get $3
 )
 (func $~lib/rt/stub/__retain (; 8 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
 )
 (func $~lib/near-runtime-ts/storage/Storage#constructor (; 9 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 0
   i32.const 3
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
 )
 (func $start:~lib/near-runtime-ts/storage (; 10 ;) (type $FUNCSIG$v)
  i32.const 3904
  global.set $~lib/rt/stub/startOffset
  global.get $~lib/rt/stub/startOffset
  global.set $~lib/rt/stub/offset
  i32.const 0
  call $~lib/near-runtime-ts/storage/Storage#constructor
  global.set $~lib/near-runtime-ts/storage/storage
 )
 (func $~lib/near-runtime-ts/contract/Context#constructor (; 11 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 0
   i32.const 4
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
 )
 (func $start:~lib/near-runtime-ts/contract (; 12 ;) (type $FUNCSIG$v)
  i32.const 0
  call $~lib/near-runtime-ts/contract/Context#constructor
  global.set $~lib/near-runtime-ts/contract/context
 )
 (func $start:~lib/near-runtime-ts/index (; 13 ;) (type $FUNCSIG$v)
  call $start:~lib/near-runtime-ts/storage
  call $start:~lib/near-runtime-ts/contract
 )
 (func $~lib/string/String#get:length (; 14 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.const 16
  i32.sub
  i32.load offset=12
  i32.const 1
  i32.shr_u
 )
 (func $~lib/string/String#charCodeAt (; 15 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  local.get $0
  call $~lib/string/String#get:length
  i32.ge_u
  if
   i32.const -1
   return
  end
  local.get $0
  local.get $1
  i32.const 1
  i32.shl
  i32.add
  i32.load16_u
 )
 (func $start:~lib/assemblyscript-json/decoder (; 16 ;) (type $FUNCSIG$v)
  i32.const 456
  i32.const 0
  call $~lib/string/String#charCodeAt
  global.set $~lib/assemblyscript-json/decoder/CHAR_0
  i32.const 480
  i32.const 0
  call $~lib/string/String#charCodeAt
  global.set $~lib/assemblyscript-json/decoder/CHAR_9
  i32.const 504
  i32.const 0
  call $~lib/string/String#charCodeAt
  global.set $~lib/assemblyscript-json/decoder/CHAR_A
  i32.const 528
  i32.const 0
  call $~lib/string/String#charCodeAt
  global.set $~lib/assemblyscript-json/decoder/CHAR_A_LOWER
 )
 (func $start:~lib/assemblyscript-json/index (; 17 ;) (type $FUNCSIG$v)
  call $start:~lib/assemblyscript-json/decoder
 )
 (func $start:~lib/rt/index-stub (; 18 ;) (type $FUNCSIG$v)
  call $start:~lib/near-runtime-ts/index
  call $start:~lib/assemblyscript-json/index
 )
 (func $~lib/rt/stub/__release (; 19 ;) (type $FUNCSIG$vi) (param $0 i32)
  nop
 )
 (func $~lib/rt/stub/__collect (; 20 ;) (type $FUNCSIG$v)
  nop
 )
 (func $~lib/util/string/compareImpl (; 21 ;) (type $FUNCSIG$iiiiii) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (result i32)
  (local $5 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  call $~lib/rt/stub/__retain
  drop
  i32.const 0
  local.set $5
  local.get $0
  local.get $1
  i32.const 1
  i32.shl
  i32.add
  local.set $1
  local.get $2
  local.get $3
  i32.const 1
  i32.shl
  i32.add
  local.set $3
  loop $continue|0
   local.get $4
   if (result i32)
    local.get $1
    i32.load16_u
    local.get $3
    i32.load16_u
    i32.sub
    local.tee $5
    i32.eqz
   else    
    i32.const 0
   end
   if
    local.get $4
    i32.const 1
    i32.sub
    local.set $4
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    local.get $3
    i32.const 2
    i32.add
    local.set $3
    br $continue|0
   end
  end
  local.get $0
  call $~lib/rt/stub/__release
  local.get $2
  call $~lib/rt/stub/__release
  local.get $5
 )
 (func $~lib/string/String.__eq (; 22 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.get $1
  i32.eq
  if
   local.get $0
   call $~lib/rt/stub/__release
   local.get $1
   call $~lib/rt/stub/__release
   i32.const 1
   return
  end
  local.get $1
  i32.eqz
  i32.const 1
  local.get $0
  select
  if
   local.get $0
   call $~lib/rt/stub/__release
   local.get $1
   call $~lib/rt/stub/__release
   i32.const 0
   return
  end
  local.get $0
  call $~lib/string/String#get:length
  local.set $2
  local.get $1
  call $~lib/string/String#get:length
  local.get $2
  i32.ne
  if
   local.get $0
   call $~lib/rt/stub/__release
   local.get $1
   call $~lib/rt/stub/__release
   i32.const 0
   return
  end
  local.get $0
  i32.const 0
  local.get $1
  i32.const 0
  local.get $2
  call $~lib/util/string/compareImpl
  i32.eqz
  local.set $2
  local.get $0
  call $~lib/rt/stub/__release
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
 )
 (func $~lib/util/memory/memcpy (; 23 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  loop $continue|0
   local.get $1
   i32.const 3
   i32.and
   i32.const 0
   local.get $2
   select
   if
    local.get $0
    local.tee $3
    i32.const 1
    i32.add
    local.set $0
    local.get $3
    local.get $1
    local.tee $3
    i32.const 1
    i32.add
    local.set $1
    local.get $3
    i32.load8_u
    i32.store8
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    br $continue|0
   end
  end
  local.get $0
  i32.const 3
  i32.and
  i32.eqz
  if
   loop $continue|1
    local.get $2
    i32.const 16
    i32.lt_u
    i32.eqz
    if
     local.get $0
     local.get $1
     i32.load
     i32.store
     local.get $0
     i32.const 4
     i32.add
     local.get $1
     i32.const 4
     i32.add
     i32.load
     i32.store
     local.get $0
     i32.const 8
     i32.add
     local.get $1
     i32.const 8
     i32.add
     i32.load
     i32.store
     local.get $0
     i32.const 12
     i32.add
     local.get $1
     i32.const 12
     i32.add
     i32.load
     i32.store
     local.get $1
     i32.const 16
     i32.add
     local.set $1
     local.get $0
     i32.const 16
     i32.add
     local.set $0
     local.get $2
     i32.const 16
     i32.sub
     local.set $2
     br $continue|1
    end
   end
   local.get $2
   i32.const 8
   i32.and
   if
    local.get $0
    local.get $1
    i32.load
    i32.store
    local.get $0
    i32.const 4
    i32.add
    local.get $1
    i32.const 4
    i32.add
    i32.load
    i32.store
    local.get $1
    i32.const 8
    i32.add
    local.set $1
    local.get $0
    i32.const 8
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 4
   i32.and
   if
    local.get $0
    local.get $1
    i32.load
    i32.store
    local.get $1
    i32.const 4
    i32.add
    local.set $1
    local.get $0
    i32.const 4
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 2
   i32.and
   if
    local.get $0
    local.get $1
    i32.load16_u
    i32.store16
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    local.get $0
    i32.const 2
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 1
   i32.and
   if
    local.get $0
    local.set $3
    local.get $3
    local.get $1
    local.set $3
    local.get $3
    i32.load8_u
    i32.store8
   end
   return
  end
  local.get $2
  i32.const 32
  i32.ge_u
  if
   block $break|2
    block $case2|2
     block $case1|2
      block $case0|2
       local.get $0
       i32.const 3
       i32.and
       i32.const 1
       i32.sub
       br_table $case0|2 $case1|2 $case2|2 $break|2
      end
      local.get $1
      i32.load
      local.set $4
      local.get $0
      local.tee $3
      i32.const 1
      i32.add
      local.set $0
      local.get $3
      local.get $1
      local.tee $3
      i32.const 1
      i32.add
      local.set $1
      local.get $3
      i32.load8_u
      i32.store8
      local.get $0
      local.tee $3
      i32.const 1
      i32.add
      local.set $0
      local.get $3
      local.get $1
      local.tee $3
      i32.const 1
      i32.add
      local.set $1
      local.get $3
      i32.load8_u
      i32.store8
      local.get $0
      local.tee $3
      i32.const 1
      i32.add
      local.set $0
      local.get $3
      local.get $1
      local.tee $3
      i32.const 1
      i32.add
      local.set $1
      local.get $3
      i32.load8_u
      i32.store8
      local.get $2
      i32.const 3
      i32.sub
      local.set $2
      loop $continue|3
       local.get $2
       i32.const 17
       i32.lt_u
       i32.eqz
       if
        local.get $0
        local.get $1
        i32.const 1
        i32.add
        i32.load
        local.tee $3
        i32.const 8
        i32.shl
        local.get $4
        i32.const 24
        i32.shr_u
        i32.or
        i32.store
        local.get $0
        i32.const 4
        i32.add
        local.get $1
        i32.const 5
        i32.add
        i32.load
        local.tee $4
        i32.const 8
        i32.shl
        local.get $3
        i32.const 24
        i32.shr_u
        i32.or
        i32.store
        local.get $0
        i32.const 8
        i32.add
        local.get $1
        i32.const 9
        i32.add
        i32.load
        local.tee $3
        i32.const 8
        i32.shl
        local.get $4
        i32.const 24
        i32.shr_u
        i32.or
        i32.store
        local.get $0
        i32.const 12
        i32.add
        local.get $1
        i32.const 13
        i32.add
        i32.load
        local.tee $4
        i32.const 8
        i32.shl
        local.get $3
        i32.const 24
        i32.shr_u
        i32.or
        i32.store
        local.get $1
        i32.const 16
        i32.add
        local.set $1
        local.get $0
        i32.const 16
        i32.add
        local.set $0
        local.get $2
        i32.const 16
        i32.sub
        local.set $2
        br $continue|3
       end
      end
      br $break|2
     end
     local.get $1
     i32.load
     local.set $4
     local.get $0
     local.tee $3
     i32.const 1
     i32.add
     local.set $0
     local.get $3
     local.get $1
     local.tee $3
     i32.const 1
     i32.add
     local.set $1
     local.get $3
     i32.load8_u
     i32.store8
     local.get $0
     local.tee $3
     i32.const 1
     i32.add
     local.set $0
     local.get $3
     local.get $1
     local.tee $3
     i32.const 1
     i32.add
     local.set $1
     local.get $3
     i32.load8_u
     i32.store8
     local.get $2
     i32.const 2
     i32.sub
     local.set $2
     loop $continue|4
      local.get $2
      i32.const 18
      i32.lt_u
      i32.eqz
      if
       local.get $0
       local.get $1
       i32.const 2
       i32.add
       i32.load
       local.tee $3
       i32.const 16
       i32.shl
       local.get $4
       i32.const 16
       i32.shr_u
       i32.or
       i32.store
       local.get $0
       i32.const 4
       i32.add
       local.get $1
       i32.const 6
       i32.add
       i32.load
       local.tee $4
       i32.const 16
       i32.shl
       local.get $3
       i32.const 16
       i32.shr_u
       i32.or
       i32.store
       local.get $0
       i32.const 8
       i32.add
       local.get $1
       i32.const 10
       i32.add
       i32.load
       local.tee $3
       i32.const 16
       i32.shl
       local.get $4
       i32.const 16
       i32.shr_u
       i32.or
       i32.store
       local.get $0
       i32.const 12
       i32.add
       local.get $1
       i32.const 14
       i32.add
       i32.load
       local.tee $4
       i32.const 16
       i32.shl
       local.get $3
       i32.const 16
       i32.shr_u
       i32.or
       i32.store
       local.get $1
       i32.const 16
       i32.add
       local.set $1
       local.get $0
       i32.const 16
       i32.add
       local.set $0
       local.get $2
       i32.const 16
       i32.sub
       local.set $2
       br $continue|4
      end
     end
     br $break|2
    end
    local.get $1
    i32.load
    local.set $4
    local.get $0
    local.tee $3
    i32.const 1
    i32.add
    local.set $0
    local.get $3
    local.get $1
    local.tee $3
    i32.const 1
    i32.add
    local.set $1
    local.get $3
    i32.load8_u
    i32.store8
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    loop $continue|5
     local.get $2
     i32.const 19
     i32.lt_u
     i32.eqz
     if
      local.get $0
      local.get $1
      i32.const 3
      i32.add
      i32.load
      local.tee $3
      i32.const 24
      i32.shl
      local.get $4
      i32.const 8
      i32.shr_u
      i32.or
      i32.store
      local.get $0
      i32.const 4
      i32.add
      local.get $1
      i32.const 7
      i32.add
      i32.load
      local.tee $4
      i32.const 24
      i32.shl
      local.get $3
      i32.const 8
      i32.shr_u
      i32.or
      i32.store
      local.get $0
      i32.const 8
      i32.add
      local.get $1
      i32.const 11
      i32.add
      i32.load
      local.tee $3
      i32.const 24
      i32.shl
      local.get $4
      i32.const 8
      i32.shr_u
      i32.or
      i32.store
      local.get $0
      i32.const 12
      i32.add
      local.get $1
      i32.const 15
      i32.add
      i32.load
      local.tee $4
      i32.const 24
      i32.shl
      local.get $3
      i32.const 8
      i32.shr_u
      i32.or
      i32.store
      local.get $1
      i32.const 16
      i32.add
      local.set $1
      local.get $0
      i32.const 16
      i32.add
      local.set $0
      local.get $2
      i32.const 16
      i32.sub
      local.set $2
      br $continue|5
     end
    end
   end
  end
  local.get $2
  i32.const 16
  i32.and
  if
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
  end
  local.get $2
  i32.const 8
  i32.and
  if
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
  end
  local.get $2
  i32.const 4
  i32.and
  if
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
  end
  local.get $2
  i32.const 2
  i32.and
  if
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 1
   i32.add
   local.set $0
   local.get $3
   local.get $1
   local.tee $3
   i32.const 1
   i32.add
   local.set $1
   local.get $3
   i32.load8_u
   i32.store8
  end
  local.get $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.set $3
   local.get $3
   local.get $1
   local.set $3
   local.get $3
   i32.load8_u
   i32.store8
  end
 )
 (func $~lib/memory/memory.copy (; 24 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  block $~lib/util/memory/memmove|inlined.0
   local.get $2
   local.set $3
   local.get $0
   local.tee $2
   local.get $1
   i32.eq
   br_if $~lib/util/memory/memmove|inlined.0
   i32.const 1
   local.get $2
   local.get $3
   i32.add
   local.get $1
   i32.le_u
   local.get $1
   local.get $3
   i32.add
   local.get $2
   i32.le_u
   select
   if
    local.get $2
    local.get $1
    local.get $3
    call $~lib/util/memory/memcpy
    br $~lib/util/memory/memmove|inlined.0
   end
   local.get $2
   local.get $1
   i32.lt_u
   if
    local.get $1
    i32.const 7
    i32.and
    local.get $2
    i32.const 7
    i32.and
    i32.eq
    if
     loop $continue|0
      local.get $2
      i32.const 7
      i32.and
      if
       local.get $3
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $3
       i32.const 1
       i32.sub
       local.set $3
       local.get $2
       local.tee $0
       i32.const 1
       i32.add
       local.set $2
       local.get $0
       local.get $1
       local.tee $0
       i32.const 1
       i32.add
       local.set $1
       local.get $0
       i32.load8_u
       i32.store8
       br $continue|0
      end
     end
     loop $continue|1
      local.get $3
      i32.const 8
      i32.lt_u
      i32.eqz
      if
       local.get $2
       local.get $1
       i64.load
       i64.store
       local.get $3
       i32.const 8
       i32.sub
       local.set $3
       local.get $2
       i32.const 8
       i32.add
       local.set $2
       local.get $1
       i32.const 8
       i32.add
       local.set $1
       br $continue|1
      end
     end
    end
    loop $continue|2
     local.get $3
     if
      local.get $2
      local.tee $0
      i32.const 1
      i32.add
      local.set $2
      local.get $0
      local.get $1
      local.tee $0
      i32.const 1
      i32.add
      local.set $1
      local.get $0
      i32.load8_u
      i32.store8
      local.get $3
      i32.const 1
      i32.sub
      local.set $3
      br $continue|2
     end
    end
   else    
    local.get $1
    i32.const 7
    i32.and
    local.get $2
    i32.const 7
    i32.and
    i32.eq
    if
     loop $continue|3
      local.get $2
      local.get $3
      i32.add
      i32.const 7
      i32.and
      if
       local.get $3
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $2
       local.get $3
       i32.const 1
       i32.sub
       local.tee $3
       i32.add
       local.get $1
       local.get $3
       i32.add
       i32.load8_u
       i32.store8
       br $continue|3
      end
     end
     loop $continue|4
      local.get $3
      i32.const 8
      i32.lt_u
      i32.eqz
      if
       local.get $2
       local.get $3
       i32.const 8
       i32.sub
       local.tee $3
       i32.add
       local.get $1
       local.get $3
       i32.add
       i64.load
       i64.store
       br $continue|4
      end
     end
    end
    loop $continue|5
     local.get $3
     if
      local.get $2
      local.get $3
      i32.const 1
      i32.sub
      local.tee $3
      i32.add
      local.get $1
      local.get $3
      i32.add
      i32.load8_u
      i32.store8
      br $continue|5
     end
    end
   end
  end
 )
 (func $~lib/string/String#concat (; 25 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  i32.eqz
  if
   local.get $1
   i32.const 432
   local.tee $2
   i32.ne
   if
    local.get $2
    call $~lib/rt/stub/__retain
    drop
    local.get $1
    call $~lib/rt/stub/__release
   end
   local.get $2
   local.set $1
  end
  local.get $0
  call $~lib/string/String#get:length
  i32.const 1
  i32.shl
  local.tee $3
  local.get $1
  call $~lib/string/String#get:length
  i32.const 1
  i32.shl
  local.tee $4
  i32.add
  local.tee $2
  i32.eqz
  if
   i32.const 720
   call $~lib/rt/stub/__retain
   local.set $2
   local.get $1
   call $~lib/rt/stub/__release
   local.get $2
   return
  end
  local.get $2
  i32.const 1
  call $~lib/rt/stub/__alloc
  call $~lib/rt/stub/__retain
  local.tee $2
  local.get $0
  local.get $3
  call $~lib/memory/memory.copy
  local.get $2
  local.get $3
  i32.add
  local.get $1
  local.get $4
  call $~lib/memory/memory.copy
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
 )
 (func $~lib/string/String.__concat (; 26 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.const 432
  local.get $0
  select
  local.get $1
  call $~lib/string/String#concat
  local.set $2
  local.get $0
  call $~lib/rt/stub/__release
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
 )
 (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setString (; 27 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  call $~lib/rt/stub/__retain
  drop
  i32.const 656
  local.get $1
  call $~lib/string/String.__concat
  i32.const 736
  call $~lib/string/String.__concat
  local.get $2
  call $~lib/string/String.__concat
  i32.const 760
  call $~lib/string/String.__concat
  i32.const 784
  i32.const 36
  i32.const 7
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/main/__near_ArgsParser_hello#setString (; 28 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  i32.const 632
  call $~lib/string/String.__eq
  if
   local.get $0
   local.get $2
   local.tee $3
   local.get $0
   i32.load offset=12
   local.tee $0
   i32.ne
   if
    local.get $3
    call $~lib/rt/stub/__retain
    drop
    local.get $0
    call $~lib/rt/stub/__release
   end
   local.get $3
   i32.store offset=12
   local.get $1
   call $~lib/rt/stub/__release
   local.get $2
   call $~lib/rt/stub/__release
   return
  end
  local.get $0
  local.get $1
  local.get $2
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setString
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
  call $~lib/rt/stub/__release
 )
 (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setBoolean (; 29 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  i32.const 872
  local.get $1
  call $~lib/string/String.__concat
  i32.const 936
  call $~lib/string/String.__concat
  local.get $2
  if (result i32)
   i32.const 376
   call $~lib/rt/stub/__retain
  else   
   i32.const 400
   call $~lib/rt/stub/__retain
  end
  call $~lib/string/String.__concat
  i32.const 784
  i32.const 40
  i32.const 7
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setNull (; 30 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  i32.const 960
  local.get $1
  call $~lib/string/String.__concat
  i32.const 784
  i32.const 44
  i32.const 7
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/main/__near_ArgsParser_hello#setNull (; 31 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  (local $2 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  i32.const 632
  call $~lib/string/String.__eq
  if
   local.get $0
   i32.const 0
   local.tee $2
   local.get $0
   i32.load offset=12
   local.tee $0
   i32.ne
   if
    local.get $2
    call $~lib/rt/stub/__retain
    drop
    local.get $0
    call $~lib/rt/stub/__release
   end
   local.get $2
   i32.store offset=12
   local.get $1
   call $~lib/rt/stub/__release
   return
  end
  local.get $0
  local.get $1
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setNull
  local.get $1
  call $~lib/rt/stub/__release
 )
 (func $~lib/util/number/decimalCount32 (; 32 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.const 100000
  i32.lt_u
  if (result i32)
   local.get $0
   i32.const 100
   i32.lt_u
   if (result i32)
    i32.const 1
    i32.const 2
    local.get $0
    i32.const 10
    i32.lt_u
    select
   else    
    i32.const 3
    i32.const 4
    i32.const 5
    local.get $0
    i32.const 10000
    i32.lt_u
    select
    local.get $0
    i32.const 1000
    i32.lt_u
    select
   end
  else   
   local.get $0
   i32.const 10000000
   i32.lt_u
   if (result i32)
    i32.const 6
    i32.const 7
    local.get $0
    i32.const 1000000
    i32.lt_u
    select
   else    
    i32.const 8
    i32.const 9
    i32.const 10
    local.get $0
    i32.const 1000000000
    i32.lt_u
    select
    local.get $0
    i32.const 100000000
    i32.lt_u
    select
   end
  end
 )
 (func $~lib/util/number/utoa32_lut (; 33 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  i32.const 1516
  i32.load
  local.set $3
  loop $continue|0
   local.get $1
   i32.const 10000
   i32.lt_u
   i32.eqz
   if
    local.get $1
    i32.const 10000
    i32.rem_u
    local.set $4
    local.get $1
    i32.const 10000
    i32.div_u
    local.set $1
    local.get $0
    local.get $2
    i32.const 4
    i32.sub
    local.tee $2
    i32.const 1
    i32.shl
    i32.add
    local.get $3
    local.get $4
    i32.const 100
    i32.div_u
    i32.const 2
    i32.shl
    i32.add
    i64.load32_u
    local.get $3
    local.get $4
    i32.const 100
    i32.rem_u
    i32.const 2
    i32.shl
    i32.add
    i64.load32_u
    i64.const 32
    i64.shl
    i64.or
    i64.store
    br $continue|0
   end
  end
  local.get $1
  i32.const 100
  i32.ge_u
  if
   local.get $1
   i32.const 100
   i32.rem_u
   local.set $4
   local.get $1
   i32.const 100
   i32.div_u
   local.set $1
   local.get $0
   local.get $2
   i32.const 2
   i32.sub
   local.tee $2
   i32.const 1
   i32.shl
   i32.add
   local.get $3
   local.get $4
   i32.const 2
   i32.shl
   i32.add
   i32.load
   i32.store
  end
  local.get $1
  i32.const 10
  i32.ge_u
  if
   local.get $0
   local.get $2
   i32.const 2
   i32.sub
   i32.const 1
   i32.shl
   i32.add
   local.get $3
   local.get $1
   i32.const 2
   i32.shl
   i32.add
   i32.load
   i32.store
  else   
   local.get $0
   local.get $2
   i32.const 1
   i32.sub
   i32.const 1
   i32.shl
   i32.add
   local.get $1
   i32.const 48
   i32.add
   i32.store16
  end
 )
 (func $~lib/util/number/decimalCount64 (; 34 ;) (type $FUNCSIG$ij) (param $0 i64) (result i32)
  local.get $0
  i64.const 1000000000000000
  i64.lt_u
  if (result i32)
   local.get $0
   i64.const 1000000000000
   i64.lt_u
   if (result i32)
    i32.const 10
    i32.const 11
    i32.const 12
    local.get $0
    i64.const 100000000000
    i64.lt_u
    select
    local.get $0
    i64.const 10000000000
    i64.lt_u
    select
   else    
    i32.const 13
    i32.const 14
    i32.const 15
    local.get $0
    i64.const 100000000000000
    i64.lt_u
    select
    local.get $0
    i64.const 10000000000000
    i64.lt_u
    select
   end
  else   
   local.get $0
   i64.const 100000000000000000
   i64.lt_u
   if (result i32)
    i32.const 16
    i32.const 17
    local.get $0
    i64.const 10000000000000000
    i64.lt_u
    select
   else    
    i32.const 18
    i32.const 19
    i32.const 20
    local.get $0
    i64.const -8446744073709551616
    i64.lt_u
    select
    local.get $0
    i64.const 1000000000000000000
    i64.lt_u
    select
   end
  end
 )
 (func $~lib/util/number/utoa64_lut (; 35 ;) (type $FUNCSIG$viji) (param $0 i32) (param $1 i64) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i64)
  i32.const 1516
  i32.load
  local.set $3
  loop $continue|0
   local.get $1
   i64.const 100000000
   i64.lt_u
   i32.eqz
   if
    local.get $1
    local.get $1
    i64.const 100000000
    i64.div_u
    local.tee $1
    i64.const 100000000
    i64.mul
    i64.sub
    i32.wrap_i64
    local.tee $4
    i32.const 10000
    i32.div_u
    local.tee $5
    i32.const 100
    i32.div_u
    local.set $6
    local.get $5
    i32.const 100
    i32.rem_u
    local.set $5
    local.get $3
    local.get $4
    i32.const 10000
    i32.rem_u
    local.tee $4
    i32.const 100
    i32.div_u
    i32.const 2
    i32.shl
    i32.add
    i64.load32_u
    local.set $7
    local.get $0
    local.get $2
    i32.const 4
    i32.sub
    local.tee $2
    i32.const 1
    i32.shl
    i32.add
    local.get $7
    local.get $3
    local.get $4
    i32.const 100
    i32.rem_u
    i32.const 2
    i32.shl
    i32.add
    i64.load32_u
    i64.const 32
    i64.shl
    i64.or
    i64.store
    local.get $0
    local.get $2
    i32.const 4
    i32.sub
    local.tee $2
    i32.const 1
    i32.shl
    i32.add
    local.get $3
    local.get $6
    i32.const 2
    i32.shl
    i32.add
    i64.load32_u
    local.get $3
    local.get $5
    i32.const 2
    i32.shl
    i32.add
    i64.load32_u
    i64.const 32
    i64.shl
    i64.or
    i64.store
    br $continue|0
   end
  end
  local.get $0
  local.get $1
  i32.wrap_i64
  local.get $2
  call $~lib/util/number/utoa32_lut
 )
 (func $~lib/util/number/itoa64 (; 36 ;) (type $FUNCSIG$ij) (param $0 i64) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  i64.eqz
  if
   i32.const 456
   call $~lib/rt/stub/__retain
   return
  end
  local.get $0
  i64.const 0
  i64.lt_s
  local.tee $1
  if
   i64.const 0
   local.get $0
   i64.sub
   local.set $0
  end
  local.get $0
  i64.const 4294967295
  i64.le_u
  if
   local.get $0
   i32.wrap_i64
   local.tee $4
   call $~lib/util/number/decimalCount32
   local.get $1
   i32.add
   local.tee $2
   i32.const 1
   i32.shl
   i32.const 1
   call $~lib/rt/stub/__alloc
   local.tee $3
   local.get $4
   local.get $2
   call $~lib/util/number/utoa32_lut
  else   
   local.get $0
   call $~lib/util/number/decimalCount64
   local.get $1
   i32.add
   local.tee $2
   i32.const 1
   i32.shl
   i32.const 1
   call $~lib/rt/stub/__alloc
   local.tee $3
   local.get $0
   local.get $2
   call $~lib/util/number/utoa64_lut
  end
  local.get $1
  if
   local.get $3
   i32.const 45
   i32.store16
  end
  local.get $3
  call $~lib/rt/stub/__retain
 )
 (func $~lib/util/number/itoa<i64> (; 37 ;) (type $FUNCSIG$ij) (param $0 i64) (result i32)
  local.get $0
  call $~lib/util/number/itoa64
 )
 (func $~lib/number/I64#toString (; 38 ;) (type $FUNCSIG$ij) (param $0 i64) (result i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  call $~lib/util/number/itoa<i64>
  local.tee $1
  call $~lib/rt/stub/__retain
  local.set $2
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
 )
 (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setInteger (; 39 ;) (type $FUNCSIG$viij) (param $0 i32) (param $1 i32) (param $2 i64)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  i32.const 1024
  local.get $1
  call $~lib/string/String.__concat
  i32.const 936
  call $~lib/string/String.__concat
  local.get $2
  call $~lib/number/I64#toString
  call $~lib/string/String.__concat
  i32.const 784
  i32.const 49
  i32.const 7
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#pushArray (; 40 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  i32.const 1544
  local.get $1
  call $~lib/string/String.__concat
  i32.const 784
  i32.const 53
  i32.const 8
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/main/__near_ArgsParser_hello#pushArray (; 41 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.get $1
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#pushArray
  local.set $0
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/string/String.__ne (; 42 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.get $1
  call $~lib/string/String.__eq
  i32.eqz
  local.set $2
  local.get $0
  call $~lib/rt/stub/__release
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
 )
 (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#pushObject (; 43 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  i32.const 1656
  local.get $1
  call $~lib/string/String.__concat
  i32.const 784
  i32.const 58
  i32.const 8
  call $~lib/builtins/abort
  unreachable
 )
 (func $assembly/main/__near_ArgsParser_hello#pushObject (; 44 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.load8_u offset=8
  if
   local.get $1
   i32.const 0
   call $~lib/string/String.__ne
   if (result i32)
    i32.const 1
   else    
    local.get $1
    call $~lib/string/String#get:length
    i32.const 0
    i32.ne
   end
   i32.eqz
   if
    i32.const 0
    i32.const 1608
    i32.const 33
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
  else   
   local.get $1
   i32.const 0
   call $~lib/string/String.__eq
   if (result i32)
    i32.const 1
   else    
    local.get $1
    call $~lib/string/String#get:length
    i32.eqz
   end
   i32.eqz
   if
    i32.const 0
    i32.const 1608
    i32.const 29
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.const 1
   i32.store8 offset=8
   local.get $1
   call $~lib/rt/stub/__release
   i32.const 1
   return
  end
  local.get $0
  local.get $1
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#pushObject
  local.set $0
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/memory/memory.fill (; 45 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i64)
  (local $4 i32)
  block $~lib/util/memory/memset|inlined.0
   local.get $2
   i32.eqz
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   local.get $1
   i32.store8
   local.get $0
   local.get $2
   i32.add
   i32.const 1
   i32.sub
   local.get $1
   i32.store8
   local.get $2
   i32.const 2
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 1
   i32.add
   local.get $1
   i32.store8
   local.get $0
   i32.const 2
   i32.add
   local.get $1
   i32.store8
   local.get $0
   local.get $2
   i32.add
   i32.const 2
   i32.sub
   local.get $1
   i32.store8
   local.get $0
   local.get $2
   i32.add
   i32.const 3
   i32.sub
   local.get $1
   i32.store8
   local.get $2
   i32.const 6
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 3
   i32.add
   local.get $1
   i32.store8
   local.get $0
   local.get $2
   i32.add
   i32.const 4
   i32.sub
   local.get $1
   i32.store8
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   i32.const 0
   local.get $0
   i32.sub
   i32.const 3
   i32.and
   local.tee $4
   local.get $0
   i32.add
   local.tee $0
   local.get $1
   i32.const 255
   i32.and
   i32.const 16843009
   i32.mul
   local.tee $1
   i32.store
   local.get $0
   local.get $2
   local.get $4
   i32.sub
   i32.const -4
   i32.and
   local.tee $2
   i32.add
   i32.const 4
   i32.sub
   local.get $1
   i32.store
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 4
   i32.add
   local.get $1
   i32.store
   local.get $0
   i32.const 8
   i32.add
   local.get $1
   i32.store
   local.get $0
   local.get $2
   i32.add
   i32.const 12
   i32.sub
   local.get $1
   i32.store
   local.get $0
   local.get $2
   i32.add
   i32.const 8
   i32.sub
   local.get $1
   i32.store
   local.get $2
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 12
   i32.add
   local.get $1
   i32.store
   local.get $0
   i32.const 16
   i32.add
   local.get $1
   i32.store
   local.get $0
   i32.const 20
   i32.add
   local.get $1
   i32.store
   local.get $0
   i32.const 24
   i32.add
   local.get $1
   i32.store
   local.get $0
   local.get $2
   i32.add
   i32.const 28
   i32.sub
   local.get $1
   i32.store
   local.get $0
   local.get $2
   i32.add
   i32.const 24
   i32.sub
   local.get $1
   i32.store
   local.get $0
   local.get $2
   i32.add
   i32.const 20
   i32.sub
   local.get $1
   i32.store
   local.get $0
   local.get $2
   i32.add
   i32.const 16
   i32.sub
   local.get $1
   i32.store
   local.get $0
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $4
   local.get $0
   i32.add
   local.set $0
   local.get $2
   local.get $4
   i32.sub
   local.set $2
   local.get $1
   i64.extend_i32_u
   local.get $1
   i64.extend_i32_u
   i64.const 32
   i64.shl
   i64.or
   local.set $3
   loop $continue|0
    local.get $2
    i32.const 32
    i32.lt_u
    i32.eqz
    if
     local.get $0
     local.get $3
     i64.store
     local.get $0
     i32.const 8
     i32.add
     local.get $3
     i64.store
     local.get $0
     i32.const 16
     i32.add
     local.get $3
     i64.store
     local.get $0
     i32.const 24
     i32.add
     local.get $3
     i64.store
     local.get $2
     i32.const 32
     i32.sub
     local.set $2
     local.get $0
     i32.const 32
     i32.add
     local.set $0
     br $continue|0
    end
   end
  end
 )
 (func $~lib/arraybuffer/ArrayBufferView#constructor (; 46 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 1073741808
  local.get $2
  i32.shr_u
  i32.gt_u
  if
   i32.const 1720
   i32.const 1768
   i32.const 14
   i32.const 56
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $2
  i32.shl
  local.tee $1
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $2
  i32.const 0
  local.get $1
  call $~lib/memory/memory.fill
  local.get $0
  i32.eqz
  if
   i32.const 12
   i32.const 2
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  local.tee $3
  local.get $2
  local.tee $4
  local.get $3
  i32.load
  local.tee $3
  i32.ne
  if
   local.get $4
   call $~lib/rt/stub/__retain
   drop
   local.get $3
   call $~lib/rt/stub/__release
  end
  local.get $4
  i32.store
  local.get $0
  local.get $2
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $0
 )
 (func $~lib/typedarray/Uint8Array#constructor (; 47 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 12
   i32.const 9
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  local.get $1
  i32.const 0
  call $~lib/arraybuffer/ArrayBufferView#constructor
 )
 (func $~lib/typedarray/Uint8Array#get:buffer (; 48 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load
  call $~lib/rt/stub/__retain
 )
 (func $~lib/assemblyscript-json/decoder/JSONHandler#constructor (; 49 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 0
   i32.const 6
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
 )
 (func $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor (; 50 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 0
   i32.const 7
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/JSONHandler#constructor
 )
 (func $assembly/main/__near_ArgsParser_hello#constructor (; 51 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 16
   i32.const 8
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store8 offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#constructor (; 52 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 10
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $2
  local.get $1
  local.tee $3
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $3
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $3
  i32.store
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/DecoderState#constructor (; 53 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 12
   i32.const 11
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 720
  call $~lib/rt/stub/__retain
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.get $1
  call $~lib/rt/stub/__retain
  i32.store offset=8
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/arraybuffer/ArrayBufferView#get:byteLength (; 54 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=8
 )
 (func $~lib/typedarray/Uint8Array#get:length (; 55 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/arraybuffer/ArrayBufferView#get:byteLength
 )
 (func $~lib/typedarray/Uint8Array#__get (; 56 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.ge_u
  if
   i32.const 1824
   i32.const 1880
   i32.const 135
   i32.const 44
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.add
  i32.load8_u
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar (; 57 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  i32.load offset=4
  local.get $0
  i32.load offset=4
  i32.load offset=8
  call $~lib/typedarray/Uint8Array#get:length
  i32.ge_s
  if
   i32.const -1
   return
  end
  local.get $0
  i32.load offset=4
  i32.load offset=8
  local.get $0
  i32.load offset=4
  i32.load offset=4
  call $~lib/typedarray/Uint8Array#__get
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#isWhitespace (; 58 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  i32.const 1
  local.get $1
  i32.const 32
  i32.eq
  i32.const 1
  local.get $1
  i32.const 13
  i32.eq
  i32.const 1
  local.get $1
  i32.const 10
  i32.eq
  local.get $1
  i32.const 9
  i32.eq
  select
  select
  select
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar (; 59 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  i32.load offset=4
  local.get $0
  i32.load offset=4
  i32.load offset=8
  call $~lib/typedarray/Uint8Array#get:length
  i32.ge_s
  if
   i32.const 1936
   i32.const 784
   i32.const 112
   i32.const 8
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  i32.load offset=8
  local.get $0
  i32.load offset=4
  local.get $0
  i32.load offset=4
  i32.load offset=4
  local.tee $0
  i32.const 1
  i32.add
  i32.store offset=4
  local.get $0
  call $~lib/typedarray/Uint8Array#__get
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace (; 60 ;) (type $FUNCSIG$vi) (param $0 i32)
  loop $continue|0
   local.get $0
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#isWhitespace
   if
    local.get $0
    call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
    drop
    br $continue|0
   end
  end
 )
 (func $~lib/array/Array<~lib/string/String>#constructor (; 61 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 16
   i32.const 13
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  local.get $1
  i32.const 2
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.tee $0
  i32.const 0
  i32.store offset=12
  local.get $1
  if
   i32.const 2184
   i32.const 2296
   i32.const 56
   i32.const 20
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  i32.store offset=12
  local.get $0
 )
 (func $~lib/assemblyscript-json/util/index/Buffer.getPtr (; 62 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.load offset=4
  local.set $1
  local.get $0
  call $~lib/rt/stub/__release
  local.get $1
 )
 (func $~lib/rt/stub/__realloc (; 63 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  local.get $0
  i32.const 16
  i32.sub
  local.tee $2
  i32.load offset=12
  local.tee $3
  i32.gt_u
  if
   local.get $1
   local.get $2
   i32.load offset=8
   call $~lib/rt/stub/__alloc
   local.tee $1
   local.get $0
   local.get $3
   call $~lib/memory/memory.copy
   local.get $1
   local.set $0
  else   
   local.get $2
   local.get $1
   i32.store offset=12
  end
  local.get $0
 )
 (func $~lib/string/String.UTF8.decodeUnsafe (; 64 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  local.get $1
  i32.add
  local.tee $4
  local.get $0
  i32.lt_u
  if
   i32.const 0
   i32.const 2416
   i32.const 585
   i32.const 6
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 1
  i32.shl
  i32.const 1
  call $~lib/rt/stub/__alloc
  local.tee $5
  local.set $3
  loop $continue|0
   block $break|0
    local.get $0
    local.get $4
    i32.ge_u
    br_if $break|0
    local.get $0
    local.tee $1
    i32.const 1
    i32.add
    local.set $0
    local.get $1
    i32.load8_u
    local.tee $1
    i32.const 128
    i32.lt_u
    if
     local.get $1
     i32.eqz
     i32.const 0
     local.get $2
     select
     br_if $break|0
     local.get $3
     local.get $1
     i32.store16
     local.get $3
     i32.const 2
     i32.add
     local.set $3
    else     
     local.get $1
     i32.const 224
     i32.lt_u
     i32.const 0
     local.get $1
     i32.const 191
     i32.gt_u
     select
     if
      local.get $4
      local.get $0
      i32.sub
      i32.const 1
      i32.lt_u
      br_if $break|0
      local.get $0
      local.tee $6
      i32.const 1
      i32.add
      local.set $0
      local.get $3
      local.get $6
      i32.load8_u
      i32.const 63
      i32.and
      local.get $1
      i32.const 31
      i32.and
      i32.const 6
      i32.shl
      i32.or
      i32.store16
      local.get $3
      i32.const 2
      i32.add
      local.set $3
     else      
      local.get $1
      i32.const 365
      i32.lt_u
      i32.const 0
      local.get $1
      i32.const 239
      i32.gt_u
      select
      if (result i32)
       local.get $4
       local.get $0
       i32.sub
       i32.const 3
       i32.lt_u
       br_if $break|0
       local.get $3
       local.get $0
       i32.load8_u offset=2
       i32.const 63
       i32.and
       local.get $1
       i32.const 7
       i32.and
       i32.const 18
       i32.shl
       local.get $0
       i32.load8_u
       i32.const 63
       i32.and
       i32.const 12
       i32.shl
       i32.or
       local.get $0
       i32.load8_u offset=1
       i32.const 63
       i32.and
       i32.const 6
       i32.shl
       i32.or
       i32.or
       i32.const 65536
       i32.sub
       local.tee $1
       i32.const 10
       i32.shr_u
       i32.const 55296
       i32.add
       i32.store16
       local.get $3
       local.get $1
       i32.const 1023
       i32.and
       i32.const 56320
       i32.add
       i32.store16 offset=2
       local.get $3
       i32.const 4
       i32.add
       local.set $3
       local.get $0
       i32.const 3
       i32.add
      else       
       local.get $4
       local.get $0
       i32.sub
       i32.const 2
       i32.lt_u
       br_if $break|0
       local.get $3
       local.get $0
       i32.load8_u offset=1
       i32.const 63
       i32.and
       local.get $1
       i32.const 15
       i32.and
       i32.const 12
       i32.shl
       local.get $0
       i32.load8_u
       i32.const 63
       i32.and
       i32.const 6
       i32.shl
       i32.or
       i32.or
       i32.store16
       local.get $3
       i32.const 2
       i32.add
       local.set $3
       local.get $0
       i32.const 2
       i32.add
      end
      local.set $0
     end
    end
    br $continue|0
   end
  end
  local.get $5
  local.get $3
  local.get $5
  i32.sub
  call $~lib/rt/stub/__realloc
  call $~lib/rt/stub/__retain
 )
 (func $~lib/assemblyscript-json/util/index/Buffer.readString (; 65 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  call $~lib/assemblyscript-json/util/index/Buffer.getPtr
  local.get $1
  i32.add
  local.get $2
  local.get $1
  i32.sub
  i32.const 0
  call $~lib/string/String.UTF8.decodeUnsafe
  local.set $1
  local.get $0
  call $~lib/rt/stub/__release
  local.get $1
 )
 (func $~lib/assemblyscript-json/decoder/DecoderState#readString (; 66 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  i32.load offset=8
  local.get $1
  local.get $2
  i32.const 1
  i32.sub
  call $~lib/assemblyscript-json/util/index/Buffer.readString
 )
 (func $~lib/assemblyscript-json/decoder/DecoderState#readString|trampoline (; 67 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~lib/argc
     i32.const 1
     i32.sub
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   local.get $0
   i32.load offset=4
   local.set $2
  end
  local.get $0
  local.get $1
  local.get $2
  call $~lib/assemblyscript-json/decoder/DecoderState#readString
 )
 (func $~lib/array/Array<~lib/string/String>#get:length (; 68 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=12
 )
 (func $~lib/array/ensureSize (; 69 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $3
  local.get $2
  i32.shr_u
  i32.gt_u
  if
   local.get $1
   i32.const 1073741808
   local.get $2
   i32.shr_u
   i32.gt_u
   if
    i32.const 1720
    i32.const 2296
    i32.const 14
    i32.const 47
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.load
   local.tee $4
   local.get $1
   local.get $2
   i32.shl
   local.tee $2
   call $~lib/rt/stub/__realloc
   local.tee $1
   local.get $3
   i32.add
   i32.const 0
   local.get $2
   local.get $3
   i32.sub
   call $~lib/memory/memory.fill
   local.get $1
   local.get $4
   i32.ne
   if
    local.get $0
    local.get $1
    call $~lib/rt/stub/__retain
    i32.store
    local.get $0
    local.get $1
    i32.store offset=4
   end
   local.get $0
   local.get $2
   i32.store offset=8
  end
 )
 (func $~lib/array/Array<~lib/string/String>#push (; 70 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $3
  i32.const 1
  i32.add
  local.tee $2
  i32.const 2
  call $~lib/array/ensureSize
  local.get $0
  i32.load offset=4
  local.get $3
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  call $~lib/rt/stub/__retain
  i32.store
  local.get $0
  local.get $2
  i32.store offset=12
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
 )
 (func $~lib/array/Array<~lib/string/String>#join_str (; 71 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.load offset=12
  i32.const 1
  i32.sub
  local.tee $7
  i32.const 0
  i32.lt_s
  if
   i32.const 720
   call $~lib/rt/stub/__retain
   local.set $2
   local.get $1
   call $~lib/rt/stub/__release
   local.get $2
   return
  end
  local.get $0
  i32.load offset=4
  local.set $9
  local.get $7
  i32.eqz
  if
   local.get $9
   i32.load
   call $~lib/rt/stub/__retain
   local.set $2
   local.get $1
   call $~lib/rt/stub/__release
   local.get $2
   return
  end
  local.get $1
  call $~lib/string/String#get:length
  local.set $10
  i32.const 0
  local.set $3
  i32.const 0
  local.set $0
  i32.const 0
  local.set $2
  local.get $7
  i32.const 1
  i32.add
  local.set $5
  loop $loop|0
   block $break|0
    local.get $2
    local.get $5
    i32.ge_s
    br_if $break|0
    local.get $9
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $8
    local.get $0
    local.tee $6
    i32.ne
    if
     local.get $8
     call $~lib/rt/stub/__retain
     drop
     local.get $6
     call $~lib/rt/stub/__release
    end
    local.get $8
    local.tee $0
    if
     local.get $0
     call $~lib/string/String#get:length
     local.get $3
     i32.add
     local.set $3
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $loop|0
   end
  end
  i32.const 0
  local.set $4
  local.get $3
  local.get $7
  local.get $10
  i32.mul
  i32.add
  i32.const 1
  i32.shl
  i32.const 1
  call $~lib/rt/stub/__alloc
  call $~lib/rt/stub/__retain
  local.set $3
  i32.const 0
  local.set $5
  loop $loop|1
   block $break|1
    local.get $5
    local.get $7
    i32.ge_s
    br_if $break|1
    local.get $9
    local.get $5
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $6
    local.get $0
    local.tee $2
    i32.ne
    if
     local.get $6
     call $~lib/rt/stub/__retain
     drop
     local.get $2
     call $~lib/rt/stub/__release
    end
    local.get $6
    local.tee $0
    if
     local.get $3
     local.get $4
     i32.const 1
     i32.shl
     i32.add
     local.get $0
     local.get $0
     call $~lib/string/String#get:length
     local.tee $6
     i32.const 1
     i32.shl
     call $~lib/memory/memory.copy
     local.get $4
     local.get $6
     i32.add
     local.set $4
    end
    local.get $10
    if
     local.get $3
     local.get $4
     i32.const 1
     i32.shl
     i32.add
     local.get $1
     local.get $10
     i32.const 1
     i32.shl
     call $~lib/memory/memory.copy
     local.get $4
     local.get $10
     i32.add
     local.set $4
    end
    local.get $5
    i32.const 1
    i32.add
    local.set $5
    br $loop|1
   end
  end
  local.get $9
  local.get $7
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $8
  local.get $0
  local.tee $5
  i32.ne
  if
   local.get $8
   call $~lib/rt/stub/__retain
   drop
   local.get $5
   call $~lib/rt/stub/__release
  end
  local.get $8
  local.tee $0
  if
   local.get $3
   local.get $4
   i32.const 1
   i32.shl
   i32.add
   local.get $0
   local.get $0
   call $~lib/string/String#get:length
   i32.const 1
   i32.shl
   call $~lib/memory/memory.copy
  end
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
  call $~lib/rt/stub/__release
  local.get $3
 )
 (func $~lib/array/Array<~lib/string/String>#join (; 72 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.get $1
  call $~lib/array/Array<~lib/string/String>#join_str
  local.set $0
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/rt/__allocArray (; 73 ;) (type $FUNCSIG$iiiii) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  i32.const 16
  local.get $2
  call $~lib/rt/stub/__alloc
  local.tee $2
  local.get $0
  local.get $1
  i32.shl
  local.tee $1
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $4
  call $~lib/rt/stub/__retain
  i32.store
  local.get $2
  local.get $4
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store offset=12
  local.get $3
  if
   local.get $4
   local.get $3
   local.get $1
   call $~lib/memory/memory.copy
  end
  local.get $2
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit (; 74 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
  local.tee $1
  global.get $~lib/assemblyscript-json/decoder/CHAR_0
  i32.sub
  local.tee $0
  i32.const 9
  i32.gt_s
  if
   i32.const 1
   local.get $1
   global.get $~lib/assemblyscript-json/decoder/CHAR_A
   i32.sub
   i32.const 10
   i32.add
   local.tee $0
   i32.const 15
   i32.gt_s
   local.get $0
   i32.const 10
   i32.lt_s
   select
   if
    local.get $1
    global.get $~lib/assemblyscript-json/decoder/CHAR_A_LOWER
    i32.sub
    i32.const 10
    i32.add
    local.set $0
   end
  end
  i32.const 2
  i32.const 2
  i32.const 14
  i32.const 0
  call $~lib/rt/__allocArray
  local.tee $3
  i32.load offset=4
  local.tee $2
  local.get $1
  i32.store
  local.get $2
  local.get $0
  i32.store offset=4
  local.get $3
  call $~lib/rt/stub/__retain
  local.set $2
  local.get $0
  i32.const 16
  i32.lt_s
  i32.const 0
  local.get $0
  i32.const 0
  i32.ge_s
  select
  i32.eqz
  if
   i32.const 2728
   i32.const 784
   i32.const 269
   i32.const 4
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/string/String.fromCodePoint (; 75 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 1114111
  i32.gt_u
  if
   i32.const 0
   i32.const 2416
   i32.const 22
   i32.const 4
   call $~lib/builtins/abort
   unreachable
  end
  i32.const 2
  local.get $0
  i32.const 65535
  i32.gt_s
  local.tee $2
  i32.shl
  i32.const 1
  call $~lib/rt/stub/__alloc
  local.set $1
  local.get $2
  if
   local.get $1
   local.get $0
   i32.const 65536
   i32.sub
   local.tee $0
   i32.const 1023
   i32.and
   i32.const 56320
   i32.add
   local.get $0
   i32.const 10
   i32.shr_u
   i32.const 55296
   i32.add
   i32.const 16
   i32.shl
   i32.or
   i32.store
  else   
   local.get $1
   local.get $0
   i32.store16
  end
  local.get $1
  call $~lib/rt/stub/__retain
 )
 (func $~lib/string/String.fromCharCode (; 76 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  i32.const 2
  local.get $1
  i32.const 0
  i32.gt_s
  local.tee $3
  i32.shl
  i32.const 1
  call $~lib/rt/stub/__alloc
  local.tee $2
  local.get $0
  i32.store16
  local.get $3
  if
   local.get $2
   local.get $1
   i32.store16 offset=2
  end
  local.get $2
  call $~lib/rt/stub/__retain
 )
 (func $~lib/string/String.fromCharCode|trampoline (; 77 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  block $1of1
   block $0of1
    block $outOfRange
     global.get $~lib/argc
     i32.const 1
     i32.sub
     br_table $0of1 $1of1 $outOfRange
    end
    unreachable
   end
   i32.const -1
   local.set $1
  end
  local.get $0
  local.get $1
  call $~lib/string/String.fromCharCode
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readEscapedChar (; 78 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
  local.set $1
  i32.const 760
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 760
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2464
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2464
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2488
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2488
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2512
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2536
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2560
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2584
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2608
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2632
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2656
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2680
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2704
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit
   local.set $1
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit
   local.set $2
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit
   local.set $3
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit
   local.get $1
   i32.const 12
   i32.shl
   local.get $2
   i32.const 8
   i32.shl
   i32.add
   local.get $3
   i32.const 4
   i32.shl
   i32.add
   i32.add
   call $~lib/string/String.fromCodePoint
   return
  end
  i32.const 2784
  i32.const 1
  global.set $~lib/argc
  local.get $1
  i32.const 0
  call $~lib/string/String.fromCharCode|trampoline
  call $~lib/string/String.__concat
  i32.const 784
  i32.const 255
  i32.const 4
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readString (; 79 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
  i32.const 760
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 2104
   i32.const 784
   i32.const 197
   i32.const 4
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  i32.load offset=4
  local.set $3
  i32.const 0
  i32.const 0
  call $~lib/array/Array<~lib/string/String>#constructor
  local.set $2
  loop $loop|0 (result i32)
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   local.tee $1
   i32.const 32
   i32.lt_s
   if
    i32.const 2344
    i32.const 784
    i32.const 203
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
   i32.const 760
   i32.const 0
   call $~lib/string/String#charCodeAt
   local.get $1
   i32.eq
   if (result i32)
    i32.const 1
    global.set $~lib/argc
    local.get $0
    i32.load offset=4
    local.get $3
    i32.const 0
    call $~lib/assemblyscript-json/decoder/DecoderState#readString|trampoline
    local.set $1
    local.get $2
    call $~lib/array/Array<~lib/string/String>#get:length
    i32.eqz
    if
     local.get $2
     call $~lib/rt/stub/__release
     local.get $1
     return
    end
    local.get $2
    local.get $1
    call $~lib/array/Array<~lib/string/String>#push
    drop
    local.get $2
    i32.const 720
    call $~lib/array/Array<~lib/string/String>#join
    local.set $0
    local.get $1
    call $~lib/rt/stub/__release
    local.get $2
    call $~lib/rt/stub/__release
    local.get $0
   else    
    i32.const 2464
    i32.const 0
    call $~lib/string/String#charCodeAt
    local.get $1
    i32.eq
    if
     local.get $0
     i32.load offset=4
     i32.load offset=4
     local.get $3
     i32.const 1
     i32.add
     i32.gt_s
     if
      local.get $2
      i32.const 1
      global.set $~lib/argc
      local.get $0
      i32.load offset=4
      local.get $3
      i32.const 0
      call $~lib/assemblyscript-json/decoder/DecoderState#readString|trampoline
      local.tee $1
      call $~lib/array/Array<~lib/string/String>#push
      drop
      local.get $1
      call $~lib/rt/stub/__release
     end
     local.get $2
     local.get $0
     call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readEscapedChar
     local.tee $1
     call $~lib/array/Array<~lib/string/String>#push
     drop
     local.get $0
     i32.load offset=4
     i32.load offset=4
     local.set $3
     local.get $1
     call $~lib/rt/stub/__release
    end
    br $loop|0
   end
  end
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseKey (; 80 ;) (type $FUNCSIG$vi) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
  local.get $0
  i32.load offset=4
  local.tee $1
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readString
  local.set $2
  local.get $1
  i32.load
  call $~lib/rt/stub/__release
  local.get $2
  i32.store
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
  i32.const 2864
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 2888
   i32.const 784
   i32.const 159
   i32.const 4
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseObject (; 81 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 1992
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  i32.load offset=4
  i32.load
  call $~lib/rt/stub/__retain
  local.set $3
  local.get $0
  i32.load offset=4
  local.tee $2
  i32.const 720
  local.tee $1
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $1
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $1
  i32.store
  local.get $0
  i32.load
  local.get $3
  call $assembly/main/__near_ArgsParser_hello#pushObject
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   drop
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
   i32.const 1
   local.set $1
   loop $continue|0
    local.get $0
    call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
    i32.const 2016
    i32.const 0
    call $~lib/string/String#charCodeAt
    i32.ne
    if
     local.get $1
     if
      i32.const 0
      local.set $1
     else      
      local.get $0
      call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
      i32.const 2040
      i32.const 0
      call $~lib/string/String#charCodeAt
      i32.ne
      if
       i32.const 2064
       i32.const 784
       i32.const 142
       i32.const 10
       call $~lib/builtins/abort
       unreachable
      end
     end
     local.get $0
     call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseKey
     local.get $0
     call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseValue
     drop
     br $continue|0
    end
   end
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   i32.const 2016
   i32.const 0
   call $~lib/string/String#charCodeAt
   i32.ne
   if
    i32.const 2928
    i32.const 784
    i32.const 149
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $0
  i32.load
  call $~lib/rt/stub/__release
  local.get $3
  call $~lib/rt/stub/__release
  i32.const 1
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseArray (; 82 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 2992
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  i32.load offset=4
  i32.load
  call $~lib/rt/stub/__retain
  local.set $3
  local.get $0
  i32.load offset=4
  local.tee $2
  i32.const 720
  local.tee $1
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $1
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $1
  i32.store
  local.get $0
  i32.load
  local.get $3
  call $assembly/main/__near_ArgsParser_hello#pushArray
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   drop
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
   i32.const 1
   local.set $1
   loop $continue|0
    local.get $0
    call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
    i32.const 3016
    i32.const 0
    call $~lib/string/String#charCodeAt
    i32.ne
    if
     local.get $1
     if
      i32.const 0
      local.set $1
     else      
      local.get $0
      call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
      i32.const 2040
      i32.const 0
      call $~lib/string/String#charCodeAt
      i32.ne
      if
       i32.const 2064
       i32.const 784
       i32.const 176
       i32.const 10
       call $~lib/builtins/abort
       unreachable
      end
     end
     local.get $0
     call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseValue
     drop
     br $continue|0
    end
   end
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   i32.const 3016
   i32.const 0
   call $~lib/string/String#charCodeAt
   i32.ne
   if
    i32.const 3040
    i32.const 784
    i32.const 182
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $0
  i32.load
  call $~lib/rt/stub/__release
  local.get $3
  call $~lib/rt/stub/__release
  i32.const 1
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseString (; 83 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 760
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  i32.load
  local.get $0
  i32.load offset=4
  i32.load
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readString
  local.tee $0
  call $assembly/main/__near_ArgsParser_hello#setString
  local.get $0
  call $~lib/rt/stub/__release
  i32.const 1
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readAndAssert (; 84 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  i32.const 0
  local.set $2
  loop $loop|0
   block $break|0
    local.get $2
    local.get $1
    call $~lib/string/String#get:length
    i32.ge_s
    br_if $break|0
    local.get $1
    local.get $2
    call $~lib/string/String#charCodeAt
    local.get $0
    call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
    i32.ne
    if
     i32.const 3104
     local.get $1
     call $~lib/string/String.__concat
     i32.const 3144
     call $~lib/string/String.__concat
     i32.const 784
     i32.const 321
     i32.const 6
     call $~lib/builtins/abort
     unreachable
    else     
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     local.get $3
     call $~lib/rt/stub/__release
     local.get $4
     call $~lib/rt/stub/__release
     br $loop|0
    end
    unreachable
   end
  end
  local.get $1
  call $~lib/rt/stub/__release
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseBoolean (; 85 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 400
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.eq
  if
   local.get $0
   i32.const 400
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readAndAssert
   local.get $0
   i32.load
   local.get $0
   i32.load offset=4
   i32.load
   i32.const 0
   call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setBoolean
   i32.const 1
   return
  end
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 376
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.eq
  if
   local.get $0
   i32.const 376
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readAndAssert
   local.get $0
   i32.load
   local.get $0
   i32.load offset=4
   i32.load
   i32.const 1
   call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setBoolean
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseNumber (; 86 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i64)
  (local $2 i64)
  (local $3 i32)
  i64.const 0
  local.set $1
  i64.const 1
  local.set $2
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 3168
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.eq
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   drop
   i64.const -1
   local.set $2
  end
  i32.const 0
  local.set $3
  loop $continue|0
   global.get $~lib/assemblyscript-json/decoder/CHAR_0
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
   i32.le_s
   if (result i32)
    local.get $0
    call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
    global.get $~lib/assemblyscript-json/decoder/CHAR_9
    i32.le_s
   else    
    i32.const 0
   end
   if
    local.get $0
    call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
    global.get $~lib/assemblyscript-json/decoder/CHAR_0
    i32.sub
    i64.extend_i32_s
    local.get $1
    i64.const 10
    i64.mul
    i64.add
    local.set $1
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $continue|0
   end
  end
  local.get $3
  i32.const 0
  i32.gt_s
  if
   local.get $0
   i32.load
   local.get $0
   i32.load offset=4
   i32.load
   local.get $1
   local.get $2
   i64.mul
   call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setInteger
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseNull (; 87 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 432
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.eq
  if
   local.get $0
   i32.const 432
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readAndAssert
   local.get $0
   i32.load
   local.get $0
   i32.load offset=4
   i32.load
   call $assembly/main/__near_ArgsParser_hello#setNull
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseValue (; 88 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseObject
  local.tee $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseArray
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseString
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseBoolean
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseNumber
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseNull
   local.set $1
  end
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
  local.get $1
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#deserialize (; 89 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  if
   local.get $2
   local.tee $4
   local.get $0
   i32.load offset=4
   local.tee $3
   i32.ne
   if
    local.get $4
    call $~lib/rt/stub/__retain
    drop
    local.get $3
    call $~lib/rt/stub/__release
   end
   local.get $0
   local.get $4
   i32.store offset=4
  else   
   i32.const 0
   local.get $1
   call $~lib/assemblyscript-json/decoder/DecoderState#constructor
   local.set $3
   local.get $0
   i32.load offset=4
   call $~lib/rt/stub/__release
   local.get $0
   local.get $3
   i32.store offset=4
  end
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseValue
  i32.eqz
  if
   i32.const 3192
   i32.const 784
   i32.const 100
   i32.const 4
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
  call $~lib/rt/stub/__release
 )
 (func $~lib/string/String.UTF8.byteLength (; 90 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.tee $2
  local.get $0
  i32.const 16
  i32.sub
  i32.load offset=12
  i32.add
  local.set $5
  i32.const 1
  i32.const 0
  local.get $1
  select
  local.set $3
  loop $continue|0
   block $break|0
    local.get $2
    local.get $5
    i32.ge_u
    br_if $break|0
    local.get $2
    i32.load16_u
    local.tee $4
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $4
     i32.eqz
     i32.const 0
     local.get $1
     select
     br_if $break|0
     local.get $3
     i32.const 1
     i32.add
     local.set $3
     local.get $2
     i32.const 2
     i32.add
    else     
     local.get $4
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $3
      i32.const 2
      i32.add
      local.set $3
      local.get $2
      i32.const 2
      i32.add
     else      
      local.get $2
      i32.const 2
      i32.add
      local.get $5
      i32.lt_u
      i32.const 0
      local.get $4
      i32.const 64512
      i32.and
      i32.const 55296
      i32.eq
      select
      if
       local.get $2
       i32.load16_u offset=2
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $2
        i32.const 4
        i32.add
        local.set $2
        local.get $3
        i32.const 4
        i32.add
        local.set $3
        br $continue|0
       end
      end
      local.get $3
      i32.const 3
      i32.add
      local.set $3
      local.get $2
      i32.const 2
      i32.add
     end
    end
    local.set $2
    br $continue|0
   end
  end
  local.get $0
  call $~lib/rt/stub/__release
  local.get $3
 )
 (func $~lib/string/String.UTF8.encode (; 91 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.tee $4
  i32.const 16
  i32.sub
  i32.load offset=12
  local.get $4
  i32.add
  local.set $5
  local.get $4
  local.get $1
  call $~lib/string/String.UTF8.byteLength
  i32.const 0
  call $~lib/rt/stub/__alloc
  local.tee $6
  local.set $2
  loop $continue|0
   block $break|0
    local.get $4
    local.get $5
    i32.ge_u
    br_if $break|0
    local.get $4
    i32.load16_u
    local.tee $3
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $3
     i32.eqz
     i32.const 0
     local.get $1
     select
     br_if $break|0
     local.get $2
     local.get $3
     i32.store8
     local.get $2
     i32.const 1
     i32.add
     local.set $2
     local.get $4
     i32.const 2
     i32.add
    else     
     local.get $3
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $2
      local.get $3
      i32.const 6
      i32.shr_u
      i32.const 192
      i32.or
      i32.store8
      local.get $2
      local.get $3
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.store8 offset=1
      local.get $2
      i32.const 2
      i32.add
      local.set $2
      local.get $4
      i32.const 2
      i32.add
     else      
      local.get $4
      i32.const 2
      i32.add
      local.get $5
      i32.lt_u
      i32.const 0
      local.get $3
      i32.const 64512
      i32.and
      i32.const 55296
      i32.eq
      select
      if
       local.get $4
       i32.load16_u offset=2
       local.tee $7
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $2
        local.get $3
        i32.const 1023
        i32.and
        i32.const 10
        i32.shl
        i32.const 65536
        i32.add
        local.get $7
        i32.const 1023
        i32.and
        i32.add
        local.tee $3
        i32.const 18
        i32.shr_u
        i32.const 240
        i32.or
        i32.store8
        local.get $2
        local.get $3
        i32.const 12
        i32.shr_u
        i32.const 63
        i32.and
        i32.const 128
        i32.or
        i32.store8 offset=1
        local.get $2
        local.get $3
        i32.const 6
        i32.shr_u
        i32.const 63
        i32.and
        i32.const 128
        i32.or
        i32.store8 offset=2
        local.get $2
        local.get $3
        i32.const 63
        i32.and
        i32.const 128
        i32.or
        i32.store8 offset=3
        local.get $4
        i32.const 4
        i32.add
        local.set $4
        local.get $2
        i32.const 4
        i32.add
        local.set $2
        br $continue|0
       end
      end
      local.get $2
      local.get $3
      i32.const 12
      i32.shr_u
      i32.const 224
      i32.or
      i32.store8
      local.get $2
      local.get $3
      i32.const 6
      i32.shr_u
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.store8 offset=1
      local.get $2
      local.get $3
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.store8 offset=2
      local.get $2
      i32.const 3
      i32.add
      local.set $2
      local.get $4
      i32.const 2
      i32.add
     end
    end
    local.set $4
    br $continue|0
   end
  end
  local.get $1
  if
   local.get $4
   local.get $5
   i32.gt_u
   if
    i32.const 0
    i32.const 2416
    i32.const 567
    i32.const 8
    call $~lib/builtins/abort
    unreachable
   end
   local.get $6
   local.get $2
   local.get $6
   i32.sub
   i32.const 1
   i32.add
   call $~lib/rt/stub/__realloc
   local.set $6
   local.get $2
   i32.const 0
   i32.store8
  else   
   local.get $4
   local.get $5
   i32.ne
   if
    i32.const 0
    i32.const 2416
    i32.const 571
    i32.const 8
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $6
  call $~lib/rt/stub/__retain
  local.set $3
  local.get $0
  call $~lib/rt/stub/__release
  local.get $3
 )
 (func $~lib/near-runtime-ts/util/util.toUTF8 (; 92 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.get $1
  call $~lib/string/String.UTF8.encode
  local.tee $1
  local.set $2
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
  call $~lib/rt/stub/__release
  local.get $2
 )
 (func $~lib/near-runtime-ts/util/util.stringToBytes (; 93 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  i32.const 0
  local.get $0
  i32.const 1
  call $~lib/string/String.UTF8.byteLength
  i32.const 1
  i32.sub
  local.tee $1
  call $~lib/typedarray/Uint8Array#constructor
  local.tee $2
  i32.load offset=4
  local.get $0
  i32.const 0
  call $~lib/near-runtime-ts/util/util.toUTF8
  local.get $1
  call $~lib/memory/memory.copy
  local.get $0
  call $~lib/rt/stub/__release
  local.get $2
 )
 (func $~lib/near-runtime-ts/logging/logging.log (; 94 ;) (type $FUNCSIG$vi) (param $0 i32)
  (local $1 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  call $~lib/near-runtime-ts/util/util.stringToBytes
  local.tee $1
  call $~lib/arraybuffer/ArrayBufferView#get:byteLength
  i64.extend_i32_s
  local.get $1
  i32.load offset=4
  i64.extend_i32_u
  call $~lib/near-runtime-ts/runtime_api/runtime_api.log_utf8
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
  call $~lib/rt/stub/__release
 )
 (func $assembly/main/printString (; 95 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $0
 )
 (func $assembly/main/hello (; 96 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  i32.const 3248
  call $~lib/near-runtime-ts/logging/logging.log
  i32.const 552
  call $assembly/main/printString
  local.set $1
  i32.const 3288
  local.get $0
  call $~lib/string/String.__concat
  local.tee $2
  local.get $1
  call $~lib/string/String.__concat
  local.tee $3
  call $~lib/rt/stub/__retain
  local.set $4
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
  call $~lib/rt/stub/__release
  local.get $3
  call $~lib/rt/stub/__release
  local.get $0
  call $~lib/rt/stub/__release
  local.get $4
 )
 (func $~lib/array/Array<i32>#constructor (; 97 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 16
   i32.const 14
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  local.get $1
  i32.const 2
  call $~lib/arraybuffer/ArrayBufferView#constructor
  local.tee $0
  i32.const 0
  i32.store offset=12
  local.get $0
  local.get $1
  i32.store offset=12
  local.get $0
 )
 (func $~lib/array/Array<i32>#push (; 98 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $3
  i32.const 1
  i32.add
  local.tee $2
  i32.const 2
  call $~lib/array/ensureSize
  local.get $0
  i32.load offset=4
  local.get $3
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store
  local.get $0
  local.get $2
  i32.store offset=12
  local.get $2
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#constructor (; 99 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 15
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $1
  i32.const 0
  i32.const 10
  call $~lib/array/Array<i32>#constructor
  local.set $2
  local.get $1
  i32.load
  call $~lib/rt/stub/__release
  local.get $2
  i32.store
  i32.const 0
  i32.const 0
  call $~lib/array/Array<~lib/string/String>#constructor
  local.set $1
  local.get $0
  i32.load offset=4
  call $~lib/rt/stub/__release
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.load
  i32.const 1
  call $~lib/array/Array<i32>#push
  drop
  local.get $0
 )
 (func $~lib/array/Array<i32>#__unchecked_get (; 100 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
 )
 (func $~lib/array/Array<i32>#__get (; 101 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.const 2
  i32.shr_u
  i32.ge_u
  if
   i32.const 1824
   i32.const 2296
   i32.const 109
   i32.const 61
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  call $~lib/array/Array<i32>#__unchecked_get
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#get:isFirstKey (; 102 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load
  local.get $0
  i32.load
  call $~lib/array/Array<~lib/string/String>#get:length
  i32.const 1
  i32.sub
  call $~lib/array/Array<i32>#__get
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#write (; 103 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.load offset=4
  local.get $1
  call $~lib/array/Array<~lib/string/String>#push
  drop
  local.get $1
  call $~lib/rt/stub/__release
 )
 (func $~lib/array/Array<i32>#__unchecked_set (; 104 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
 )
 (func $~lib/array/Array<i32>#__set (; 105 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $0
  i32.load offset=12
  local.set $3
  local.get $0
  local.get $1
  i32.const 1
  i32.add
  i32.const 2
  call $~lib/array/ensureSize
  local.get $0
  local.get $1
  local.get $2
  call $~lib/array/Array<i32>#__unchecked_set
  local.get $1
  local.get $3
  i32.ge_s
  if
   local.get $0
   local.get $1
   i32.const 1
   i32.add
   i32.store offset=12
  end
 )
 (func $~lib/string/String#substring (; 106 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.const 0
  local.tee $3
  local.get $1
  local.get $3
  i32.gt_s
  select
  local.tee $1
  local.get $0
  call $~lib/string/String#get:length
  local.tee $4
  local.tee $3
  local.get $1
  local.get $3
  i32.lt_s
  select
  local.set $5
  local.get $2
  local.tee $1
  i32.const 0
  local.tee $3
  local.get $1
  local.get $3
  i32.gt_s
  select
  local.tee $1
  local.get $4
  local.tee $3
  local.get $1
  local.get $3
  i32.lt_s
  select
  local.set $3
  local.get $5
  local.tee $1
  local.get $3
  local.get $1
  local.get $3
  i32.lt_s
  select
  i32.const 1
  i32.shl
  local.set $2
  local.get $1
  local.get $3
  local.get $1
  local.get $3
  i32.gt_s
  select
  i32.const 1
  i32.shl
  local.tee $1
  local.get $2
  i32.sub
  local.tee $4
  i32.eqz
  if
   i32.const 720
   call $~lib/rt/stub/__retain
   return
  end
  local.get $2
  if (result i32)
   i32.const 0
  else   
   local.get $1
   local.get $0
   call $~lib/string/String#get:length
   i32.const 1
   i32.shl
   i32.eq
  end
  if
   local.get $0
   call $~lib/rt/stub/__retain
   return
  end
  local.get $4
  i32.const 1
  call $~lib/rt/stub/__alloc
  local.tee $1
  local.get $0
  local.get $2
  i32.add
  local.get $4
  call $~lib/memory/memory.copy
  local.get $1
  call $~lib/rt/stub/__retain
 )
 (func $~lib/util/number/itoa32 (; 107 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.eqz
  if
   i32.const 456
   call $~lib/rt/stub/__retain
   return
  end
  local.get $0
  i32.const 0
  i32.lt_s
  local.tee $1
  if
   i32.const 0
   local.get $0
   i32.sub
   local.set $0
  end
  local.get $0
  call $~lib/util/number/decimalCount32
  local.get $1
  i32.add
  local.tee $3
  i32.const 1
  i32.shl
  i32.const 1
  call $~lib/rt/stub/__alloc
  local.tee $2
  local.get $0
  local.get $3
  call $~lib/util/number/utoa32_lut
  local.get $1
  if
   local.get $2
   i32.const 45
   i32.store16
  end
  local.get $2
  call $~lib/rt/stub/__retain
 )
 (func $~lib/util/number/itoa<i32> (; 108 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/util/number/itoa32
 )
 (func $~lib/number/I32#toString (; 109 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  call $~lib/util/number/itoa<i32>
  local.tee $0
  call $~lib/rt/stub/__retain
  local.set $1
  local.get $0
  call $~lib/rt/stub/__release
  local.get $1
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#writeString (; 110 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.const 760
  call $~lib/assemblyscript-json/encoder/JSONEncoder#write
  i32.const 0
  local.set $5
  i32.const 0
  local.set $4
  loop $loop|0
   block $break|0
    local.get $4
    local.get $1
    call $~lib/string/String#get:length
    i32.ge_s
    br_if $break|0
    local.get $1
    local.get $4
    call $~lib/string/String#charCodeAt
    local.tee $2
    i32.const 32
    i32.lt_s
    local.tee $3
    i32.eqz
    if
     i32.const 760
     i32.const 0
     call $~lib/string/String#charCodeAt
     local.get $2
     i32.eq
     local.set $3
    end
    local.get $3
    i32.eqz
    if (result i32)
     i32.const 2464
     i32.const 0
     call $~lib/string/String#charCodeAt
     local.get $2
     i32.eq
    else     
     local.get $3
    end
    if
     local.get $0
     local.get $1
     local.get $5
     local.get $4
     call $~lib/string/String#substring
     local.tee $3
     call $~lib/assemblyscript-json/encoder/JSONEncoder#write
     local.get $4
     i32.const 1
     i32.add
     local.set $5
     i32.const 760
     i32.const 0
     call $~lib/string/String#charCodeAt
     local.get $2
     i32.eq
     if
      local.get $0
      i32.const 3320
      call $~lib/assemblyscript-json/encoder/JSONEncoder#write
     else      
      i32.const 2464
      i32.const 0
      call $~lib/string/String#charCodeAt
      local.get $2
      i32.eq
      if
       local.get $0
       i32.const 3344
       call $~lib/assemblyscript-json/encoder/JSONEncoder#write
      else       
       i32.const 2536
       i32.const 0
       call $~lib/string/String#charCodeAt
       local.get $2
       i32.eq
       if
        local.get $0
        i32.const 3368
        call $~lib/assemblyscript-json/encoder/JSONEncoder#write
       else        
        i32.const 2584
        i32.const 0
        call $~lib/string/String#charCodeAt
        local.get $2
        i32.eq
        if
         local.get $0
         i32.const 3392
         call $~lib/assemblyscript-json/encoder/JSONEncoder#write
        else         
         i32.const 2632
         i32.const 0
         call $~lib/string/String#charCodeAt
         local.get $2
         i32.eq
         if
          local.get $0
          i32.const 3416
          call $~lib/assemblyscript-json/encoder/JSONEncoder#write
         else          
          i32.const 2680
          i32.const 0
          call $~lib/string/String#charCodeAt
          local.get $2
          i32.eq
          if
           local.get $0
           i32.const 3440
           call $~lib/assemblyscript-json/encoder/JSONEncoder#write
          else           
           i32.const 3464
           local.get $2
           call $~lib/number/I32#toString
           call $~lib/string/String.__concat
           i32.const 3552
           i32.const 108
           i32.const 20
           call $~lib/builtins/abort
           unreachable
          end
         end
        end
       end
      end
     end
     local.get $3
     call $~lib/rt/stub/__release
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $loop|0
   end
  end
  local.get $0
  local.get $1
  local.get $5
  local.get $1
  call $~lib/string/String#get:length
  call $~lib/string/String#substring
  local.tee $3
  call $~lib/assemblyscript-json/encoder/JSONEncoder#write
  local.get $0
  i32.const 760
  call $~lib/assemblyscript-json/encoder/JSONEncoder#write
  local.get $3
  call $~lib/rt/stub/__release
  local.get $1
  call $~lib/rt/stub/__release
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#writeKey (; 111 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  (local $2 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  call $~lib/assemblyscript-json/encoder/JSONEncoder#get:isFirstKey
  if
   local.get $0
   i32.load
   local.get $0
   i32.load
   call $~lib/array/Array<~lib/string/String>#get:length
   i32.const 1
   i32.sub
   i32.const 0
   call $~lib/array/Array<i32>#__set
  else   
   local.get $0
   i32.const 2040
   call $~lib/assemblyscript-json/encoder/JSONEncoder#write
  end
  local.get $1
  i32.const 0
  call $~lib/string/String.__ne
  if (result i32)
   local.get $1
   call $~lib/string/String#get:length
   i32.const 0
   i32.gt_s
  else   
   i32.const 0
  end
  if
   local.get $0
   local.get $1
   local.tee $2
   if (result i32)
    local.get $2
   else    
    unreachable
   end
   call $~lib/assemblyscript-json/encoder/JSONEncoder#writeString
   local.get $0
   i32.const 2864
   call $~lib/assemblyscript-json/encoder/JSONEncoder#write
  end
  local.get $1
  call $~lib/rt/stub/__release
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#setNull (; 112 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.get $1
  call $~lib/assemblyscript-json/encoder/JSONEncoder#writeKey
  local.get $0
  i32.const 432
  call $~lib/assemblyscript-json/encoder/JSONEncoder#write
  local.get $1
  call $~lib/rt/stub/__release
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<~lib/string/String>>#constructor (; 113 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 17
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $2
  local.get $1
  local.tee $3
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $3
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $3
  i32.store
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/nearEntry/PrimitiveHandler<~lib/string/String>#constructor (; 114 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 8
   i32.const 16
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  i32.const 0
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<~lib/string/String>>#constructor
  local.set $1
  local.get $0
  i32.load offset=4
  call $~lib/rt/stub/__release
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<bool>>#constructor (; 115 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 19
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $2
  local.get $1
  local.tee $3
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $3
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $3
  i32.store
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/nearEntry/PrimitiveHandler<bool>#constructor (; 116 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 8
   i32.const 18
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor
  local.tee $0
  i32.const 0
  i32.store8
  local.get $0
  i32.const 0
  i32.store offset=4
  i32.const 0
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<bool>>#constructor
  local.set $1
  local.get $0
  i32.load offset=4
  call $~lib/rt/stub/__release
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<u64>>#constructor (; 117 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 21
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $2
  local.get $1
  local.tee $3
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $3
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $3
  i32.store
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/nearEntry/PrimitiveHandler<u64>#constructor (; 118 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 12
   i32.const 20
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor
  local.tee $0
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.store offset=8
  i32.const 0
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<u64>>#constructor
  local.set $1
  local.get $0
  i32.load offset=8
  call $~lib/rt/stub/__release
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<i64>>#constructor (; 119 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 23
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $2
  local.get $1
  local.tee $3
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $3
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $3
  i32.store
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/nearEntry/PrimitiveHandler<i64>#constructor (; 120 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 12
   i32.const 22
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor
  local.tee $0
  i64.const 0
  i64.store
  local.get $0
  i32.const 0
  i32.store offset=8
  i32.const 0
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<i64>>#constructor
  local.set $1
  local.get $0
  i32.load offset=8
  call $~lib/rt/stub/__release
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<u32>>#constructor (; 121 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 25
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $2
  local.get $1
  local.tee $3
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $3
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $3
  i32.store
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/nearEntry/PrimitiveHandler<u32>#constructor (; 122 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 8
   i32.const 24
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  i32.const 0
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<u32>>#constructor
  local.set $1
  local.get $0
  i32.load offset=4
  call $~lib/rt/stub/__release
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<i32>>#constructor (; 123 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 27
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $2
  local.get $1
  local.tee $3
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $3
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $3
  i32.store
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/nearEntry/PrimitiveHandler<i32>#constructor (; 124 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 8
   i32.const 26
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  i32.const 0
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<~lib/nearEntry/PrimitiveHandler<i32>>#constructor
  local.set $1
  local.get $0
  i32.load offset=4
  call $~lib/rt/stub/__release
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
 )
 (func $start:~lib/nearEntry (; 125 ;) (type $FUNCSIG$v)
  i32.const 0
  call $~lib/nearEntry/PrimitiveHandler<~lib/string/String>#constructor
  global.set $~lib/nearEntry/PrimitiveHandler.String
  i32.const 0
  call $~lib/nearEntry/PrimitiveHandler<bool>#constructor
  global.set $~lib/nearEntry/PrimitiveHandler.Boolean
  i32.const 0
  call $~lib/nearEntry/PrimitiveHandler<u64>#constructor
  global.set $~lib/nearEntry/PrimitiveHandler.U64
  i32.const 0
  call $~lib/nearEntry/PrimitiveHandler<i64>#constructor
  global.set $~lib/nearEntry/PrimitiveHandler.I64
  i32.const 0
  call $~lib/nearEntry/PrimitiveHandler<u32>#constructor
  global.set $~lib/nearEntry/PrimitiveHandler.U32
  i32.const 0
  call $~lib/nearEntry/PrimitiveHandler<i32>#constructor
  global.set $~lib/nearEntry/PrimitiveHandler.I32
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#setString (; 126 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  local.get $1
  call $~lib/assemblyscript-json/encoder/JSONEncoder#writeKey
  local.get $0
  local.get $2
  call $~lib/assemblyscript-json/encoder/JSONEncoder#writeString
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
  call $~lib/rt/stub/__release
 )
 (func $~lib/nearEntry/encode<~lib/string/String> (; 127 ;) (type $FUNCSIG$iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  i32.const 0
  call $~lib/string/String.__eq
  if
   local.get $0
   local.get $2
   call $~lib/assemblyscript-json/encoder/JSONEncoder#setNull
  else   
   local.get $0
   local.get $2
   local.get $1
   call $~lib/assemblyscript-json/encoder/JSONEncoder#setString
  end
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#toString (; 128 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  i32.const 720
  call $~lib/array/Array<~lib/string/String>#join
 )
 (func $~lib/assemblyscript-json/util/index/Buffer.fromString (; 129 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/rt/stub/__retain
  drop
  i32.const 0
  local.get $0
  i32.const 0
  call $~lib/string/String.UTF8.byteLength
  call $~lib/typedarray/Uint8Array#constructor
  local.set $1
  local.get $0
  i32.const 0
  call $~lib/string/String.UTF8.encode
  local.tee $2
  local.set $3
  local.get $1
  call $~lib/assemblyscript-json/util/index/Buffer.getPtr
  local.get $3
  local.get $0
  i32.const 0
  call $~lib/string/String.UTF8.byteLength
  call $~lib/memory/memory.copy
  local.get $2
  call $~lib/rt/stub/__release
  local.get $0
  call $~lib/rt/stub/__release
  local.get $1
 )
 (func $~lib/assemblyscript-json/encoder/JSONEncoder#serialize (; 130 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  call $~lib/assemblyscript-json/encoder/JSONEncoder#toString
  local.tee $0
  call $~lib/assemblyscript-json/util/index/Buffer.fromString
  local.set $1
  local.get $0
  call $~lib/rt/stub/__release
  local.get $1
 )
 (func $assembly/main/__wrapper_hello (; 131 ;) (type $FUNCSIG$v)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i64)
  (local $6 i32)
  (local $7 i32)
  i64.const 0
  call $~lib/nearEntry/input
  i64.const 0
  call $~lib/nearEntry/register_len
  local.tee $5
  i64.const 4294967295
  i64.eq
  if
   call $~lib/nearEntry/panic
  end
  i64.const 0
  i32.const 0
  local.get $5
  i32.wrap_i64
  call $~lib/typedarray/Uint8Array#constructor
  local.tee $2
  call $~lib/typedarray/Uint8Array#get:buffer
  local.tee $6
  i64.extend_i32_u
  call $~lib/nearEntry/read_register
  i32.const 0
  call $assembly/main/__near_ArgsParser_hello#constructor
  local.tee $3
  local.tee $1
  local.get $2
  local.tee $0
  local.get $1
  i32.load
  local.tee $1
  i32.ne
  if
   local.get $0
   call $~lib/rt/stub/__retain
   drop
   local.get $1
   call $~lib/rt/stub/__release
  end
  local.get $0
  i32.store
  local.get $3
  local.tee $0
  i32.const 0
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#constructor
  local.set $1
  local.get $0
  i32.load offset=4
  call $~lib/rt/stub/__release
  local.get $1
  i32.store offset=4
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#deserialize
  local.get $0
  i32.load offset=12
  call $assembly/main/hello
  local.set $1
  i32.const 0
  call $~lib/assemblyscript-json/encoder/JSONEncoder#constructor
  local.set $0
  local.get $1
  i32.const 0
  call $~lib/string/String.__eq
  if
   local.get $0
   i32.const 0
   call $~lib/assemblyscript-json/encoder/JSONEncoder#setNull
  else   
   local.get $0
   local.get $1
   i32.const 0
   call $~lib/nearEntry/encode<~lib/string/String>
   call $~lib/rt/stub/__release
  end
  local.get $0
  call $~lib/assemblyscript-json/encoder/JSONEncoder#serialize
  local.tee $4
  call $~lib/arraybuffer/ArrayBufferView#get:byteLength
  i64.extend_i32_s
  local.get $4
  call $~lib/typedarray/Uint8Array#get:buffer
  local.tee $7
  i64.extend_i32_u
  call $~lib/nearEntry/value_return
  local.get $2
  call $~lib/rt/stub/__release
  local.get $6
  call $~lib/rt/stub/__release
  local.get $3
  call $~lib/rt/stub/__release
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
  call $~lib/rt/stub/__release
  local.get $4
  call $~lib/rt/stub/__release
  local.get $7
  call $~lib/rt/stub/__release
 )
 (func $assembly/main/__near_ArgsParser_printString#setString (; 132 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  i32.const 3640
  call $~lib/string/String.__eq
  if
   local.get $0
   local.get $2
   local.tee $3
   local.get $0
   i32.load offset=12
   local.tee $0
   i32.ne
   if
    local.get $3
    call $~lib/rt/stub/__retain
    drop
    local.get $0
    call $~lib/rt/stub/__release
   end
   local.get $3
   i32.store offset=12
   local.get $1
   call $~lib/rt/stub/__release
   local.get $2
   call $~lib/rt/stub/__release
   return
  end
  local.get $0
  local.get $1
  local.get $2
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setString
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
  call $~lib/rt/stub/__release
 )
 (func $assembly/main/__near_ArgsParser_printString#setNull (; 133 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  (local $2 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $1
  i32.const 3640
  call $~lib/string/String.__eq
  if
   local.get $0
   i32.const 0
   local.tee $2
   local.get $0
   i32.load offset=12
   local.tee $0
   i32.ne
   if
    local.get $2
    call $~lib/rt/stub/__retain
    drop
    local.get $0
    call $~lib/rt/stub/__release
   end
   local.get $2
   i32.store offset=12
   local.get $1
   call $~lib/rt/stub/__release
   return
  end
  local.get $0
  local.get $1
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setNull
  local.get $1
  call $~lib/rt/stub/__release
 )
 (func $assembly/main/__near_ArgsParser_printString#pushObject (; 134 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.load8_u offset=8
  if
   local.get $1
   i32.const 0
   call $~lib/string/String.__ne
   if (result i32)
    i32.const 1
   else    
    local.get $1
    call $~lib/string/String#get:length
    i32.const 0
    i32.ne
   end
   i32.eqz
   if
    i32.const 0
    i32.const 1608
    i32.const 101
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
  else   
   local.get $1
   i32.const 0
   call $~lib/string/String.__eq
   if (result i32)
    i32.const 1
   else    
    local.get $1
    call $~lib/string/String#get:length
    i32.eqz
   end
   i32.eqz
   if
    i32.const 0
    i32.const 1608
    i32.const 97
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.const 1
   i32.store8 offset=8
   local.get $1
   call $~lib/rt/stub/__release
   i32.const 1
   return
  end
  local.get $0
  local.get $1
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#pushObject
  local.set $0
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $assembly/main/__near_ArgsParser_printString#constructor (; 135 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  if (result i32)
   local.get $0
  else   
   i32.const 16
   i32.const 28
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
  end
  call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#constructor
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store8 offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#constructor (; 136 ;) (type $FUNCSIG$iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $0
  i32.eqz
  if
   i32.const 8
   i32.const 29
   call $~lib/rt/stub/__alloc
   call $~lib/rt/stub/__retain
   local.set $0
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  local.tee $2
  local.get $1
  local.tee $3
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $3
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $3
  i32.store
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#readEscapedChar (; 137 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
  local.set $1
  i32.const 760
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 760
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2464
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2464
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2488
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2488
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2512
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2536
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2560
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2584
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2608
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2632
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2656
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   i32.const 2680
   call $~lib/rt/stub/__retain
   return
  end
  i32.const 2704
  i32.const 0
  call $~lib/string/String#charCodeAt
  local.get $1
  i32.eq
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit
   local.set $1
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit
   local.set $2
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit
   local.set $3
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readHexDigit
   local.get $1
   i32.const 12
   i32.shl
   local.get $2
   i32.const 8
   i32.shl
   i32.add
   local.get $3
   i32.const 4
   i32.shl
   i32.add
   i32.add
   call $~lib/string/String.fromCodePoint
   return
  end
  i32.const 2784
  i32.const 1
  global.set $~lib/argc
  local.get $1
  i32.const 0
  call $~lib/string/String.fromCharCode|trampoline
  call $~lib/string/String.__concat
  i32.const 784
  i32.const 255
  i32.const 4
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#readString (; 138 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
  i32.const 760
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 2104
   i32.const 784
   i32.const 197
   i32.const 4
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  i32.load offset=4
  local.set $3
  i32.const 0
  i32.const 0
  call $~lib/array/Array<~lib/string/String>#constructor
  local.set $2
  loop $loop|0 (result i32)
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   local.tee $1
   i32.const 32
   i32.lt_s
   if
    i32.const 2344
    i32.const 784
    i32.const 203
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
   i32.const 760
   i32.const 0
   call $~lib/string/String#charCodeAt
   local.get $1
   i32.eq
   if (result i32)
    i32.const 1
    global.set $~lib/argc
    local.get $0
    i32.load offset=4
    local.get $3
    i32.const 0
    call $~lib/assemblyscript-json/decoder/DecoderState#readString|trampoline
    local.set $1
    local.get $2
    call $~lib/array/Array<~lib/string/String>#get:length
    i32.eqz
    if
     local.get $2
     call $~lib/rt/stub/__release
     local.get $1
     return
    end
    local.get $2
    local.get $1
    call $~lib/array/Array<~lib/string/String>#push
    drop
    local.get $2
    i32.const 720
    call $~lib/array/Array<~lib/string/String>#join
    local.set $0
    local.get $1
    call $~lib/rt/stub/__release
    local.get $2
    call $~lib/rt/stub/__release
    local.get $0
   else    
    i32.const 2464
    i32.const 0
    call $~lib/string/String#charCodeAt
    local.get $1
    i32.eq
    if
     local.get $0
     i32.load offset=4
     i32.load offset=4
     local.get $3
     i32.const 1
     i32.add
     i32.gt_s
     if
      local.get $2
      i32.const 1
      global.set $~lib/argc
      local.get $0
      i32.load offset=4
      local.get $3
      i32.const 0
      call $~lib/assemblyscript-json/decoder/DecoderState#readString|trampoline
      local.tee $1
      call $~lib/array/Array<~lib/string/String>#push
      drop
      local.get $1
      call $~lib/rt/stub/__release
     end
     local.get $2
     local.get $0
     call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#readEscapedChar
     local.tee $1
     call $~lib/array/Array<~lib/string/String>#push
     drop
     local.get $0
     i32.load offset=4
     i32.load offset=4
     local.set $3
     local.get $1
     call $~lib/rt/stub/__release
    end
    br $loop|0
   end
  end
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseKey (; 139 ;) (type $FUNCSIG$vi) (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
  local.get $0
  i32.load offset=4
  local.tee $1
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#readString
  local.set $2
  local.get $1
  i32.load
  call $~lib/rt/stub/__release
  local.get $2
  i32.store
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
  i32.const 2864
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 2888
   i32.const 784
   i32.const 159
   i32.const 4
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseObject (; 140 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 1992
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  i32.load offset=4
  i32.load
  call $~lib/rt/stub/__retain
  local.set $3
  local.get $0
  i32.load offset=4
  local.tee $2
  i32.const 720
  local.tee $1
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $1
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $1
  i32.store
  local.get $0
  i32.load
  local.get $3
  call $assembly/main/__near_ArgsParser_printString#pushObject
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   drop
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
   i32.const 1
   local.set $1
   loop $continue|0
    local.get $0
    call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
    i32.const 2016
    i32.const 0
    call $~lib/string/String#charCodeAt
    i32.ne
    if
     local.get $1
     if
      i32.const 0
      local.set $1
     else      
      local.get $0
      call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
      i32.const 2040
      i32.const 0
      call $~lib/string/String#charCodeAt
      i32.ne
      if
       i32.const 2064
       i32.const 784
       i32.const 142
       i32.const 10
       call $~lib/builtins/abort
       unreachable
      end
     end
     local.get $0
     call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseKey
     local.get $0
     call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseValue
     drop
     br $continue|0
    end
   end
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   i32.const 2016
   i32.const 0
   call $~lib/string/String#charCodeAt
   i32.ne
   if
    i32.const 2928
    i32.const 784
    i32.const 149
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $0
  i32.load
  call $~lib/rt/stub/__release
  local.get $3
  call $~lib/rt/stub/__release
  i32.const 1
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseArray (; 141 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 2992
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  i32.load offset=4
  i32.load
  call $~lib/rt/stub/__retain
  local.set $3
  local.get $0
  i32.load offset=4
  local.tee $2
  i32.const 720
  local.tee $1
  local.get $2
  i32.load
  local.tee $2
  i32.ne
  if
   local.get $1
   call $~lib/rt/stub/__retain
   drop
   local.get $2
   call $~lib/rt/stub/__release
  end
  local.get $1
  i32.store
  local.get $0
  i32.load
  local.get $3
  call $assembly/main/__near_ArgsParser_hello#pushArray
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   drop
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
   i32.const 1
   local.set $1
   loop $continue|0
    local.get $0
    call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
    i32.const 3016
    i32.const 0
    call $~lib/string/String#charCodeAt
    i32.ne
    if
     local.get $1
     if
      i32.const 0
      local.set $1
     else      
      local.get $0
      call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
      i32.const 2040
      i32.const 0
      call $~lib/string/String#charCodeAt
      i32.ne
      if
       i32.const 2064
       i32.const 784
       i32.const 176
       i32.const 10
       call $~lib/builtins/abort
       unreachable
      end
     end
     local.get $0
     call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseValue
     drop
     br $continue|0
    end
   end
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readChar
   i32.const 3016
   i32.const 0
   call $~lib/string/String#charCodeAt
   i32.ne
   if
    i32.const 3040
    i32.const 784
    i32.const 182
    i32.const 6
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $0
  i32.load
  call $~lib/rt/stub/__release
  local.get $3
  call $~lib/rt/stub/__release
  i32.const 1
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseString (; 142 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 760
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  i32.load
  local.get $0
  i32.load offset=4
  i32.load
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#readString
  local.tee $0
  call $assembly/main/__near_ArgsParser_printString#setString
  local.get $0
  call $~lib/rt/stub/__release
  i32.const 1
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseBoolean (; 143 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 400
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.eq
  if
   local.get $0
   i32.const 400
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readAndAssert
   local.get $0
   i32.load
   local.get $0
   i32.load offset=4
   i32.load
   i32.const 0
   call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setBoolean
   i32.const 1
   return
  end
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 376
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.eq
  if
   local.get $0
   i32.const 376
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readAndAssert
   local.get $0
   i32.load
   local.get $0
   i32.load offset=4
   i32.load
   i32.const 1
   call $~lib/assemblyscript-json/decoder/ThrowingJSONHandler#setBoolean
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseNull (; 144 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#peekChar
  i32.const 432
  i32.const 0
  call $~lib/string/String#charCodeAt
  i32.eq
  if
   local.get $0
   i32.const 432
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#readAndAssert
   local.get $0
   i32.load
   local.get $0
   i32.load offset=4
   i32.load
   call $assembly/main/__near_ArgsParser_printString#setNull
   i32.const 1
   return
  end
  i32.const 0
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseValue (; 145 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseObject
  local.tee $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseArray
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseString
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseBoolean
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#parseNumber
   local.set $1
  end
  local.get $1
  i32.eqz
  if
   local.get $0
   call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseNull
   local.set $1
  end
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_hello>#skipWhitespace
  local.get $1
 )
 (func $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#deserialize (; 146 ;) (type $FUNCSIG$viii) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  call $~lib/rt/stub/__retain
  drop
  local.get $2
  if
   local.get $2
   local.tee $4
   local.get $0
   i32.load offset=4
   local.tee $3
   i32.ne
   if
    local.get $4
    call $~lib/rt/stub/__retain
    drop
    local.get $3
    call $~lib/rt/stub/__release
   end
   local.get $0
   local.get $4
   i32.store offset=4
  else   
   i32.const 0
   local.get $1
   call $~lib/assemblyscript-json/decoder/DecoderState#constructor
   local.set $3
   local.get $0
   i32.load offset=4
   call $~lib/rt/stub/__release
   local.get $0
   local.get $3
   i32.store offset=4
  end
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#parseValue
  i32.eqz
  if
   i32.const 3192
   i32.const 784
   i32.const 100
   i32.const 4
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  call $~lib/rt/stub/__release
  local.get $2
  call $~lib/rt/stub/__release
 )
 (func $assembly/main/__wrapper_printString (; 147 ;) (type $FUNCSIG$v)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i64)
  (local $6 i32)
  (local $7 i32)
  i64.const 0
  call $~lib/nearEntry/input
  i64.const 0
  call $~lib/nearEntry/register_len
  local.tee $5
  i64.const 4294967295
  i64.eq
  if
   call $~lib/nearEntry/panic
  end
  i64.const 0
  i32.const 0
  local.get $5
  i32.wrap_i64
  call $~lib/typedarray/Uint8Array#constructor
  local.tee $2
  call $~lib/typedarray/Uint8Array#get:buffer
  local.tee $6
  i64.extend_i32_u
  call $~lib/nearEntry/read_register
  i32.const 0
  call $assembly/main/__near_ArgsParser_printString#constructor
  local.tee $3
  local.tee $1
  local.get $2
  local.tee $0
  local.get $1
  i32.load
  local.tee $1
  i32.ne
  if
   local.get $0
   call $~lib/rt/stub/__retain
   drop
   local.get $1
   call $~lib/rt/stub/__release
  end
  local.get $0
  i32.store
  local.get $3
  local.tee $0
  i32.const 0
  local.get $0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#constructor
  local.set $1
  local.get $0
  i32.load offset=4
  call $~lib/rt/stub/__release
  local.get $1
  i32.store offset=4
  local.get $0
  i32.load offset=4
  local.get $2
  i32.const 0
  call $~lib/assemblyscript-json/decoder/JSONDecoder<assembly/main/__near_ArgsParser_printString>#deserialize
  local.get $0
  i32.load offset=12
  call $assembly/main/printString
  local.set $1
  i32.const 0
  call $~lib/assemblyscript-json/encoder/JSONEncoder#constructor
  local.set $0
  local.get $1
  i32.const 0
  call $~lib/string/String.__eq
  if
   local.get $0
   i32.const 0
   call $~lib/assemblyscript-json/encoder/JSONEncoder#setNull
  else   
   local.get $0
   local.get $1
   i32.const 0
   call $~lib/nearEntry/encode<~lib/string/String>
   call $~lib/rt/stub/__release
  end
  local.get $0
  call $~lib/assemblyscript-json/encoder/JSONEncoder#serialize
  local.tee $4
  call $~lib/arraybuffer/ArrayBufferView#get:byteLength
  i64.extend_i32_s
  local.get $4
  call $~lib/typedarray/Uint8Array#get:buffer
  local.tee $7
  i64.extend_i32_u
  call $~lib/nearEntry/value_return
  local.get $2
  call $~lib/rt/stub/__release
  local.get $6
  call $~lib/rt/stub/__release
  local.get $3
  call $~lib/rt/stub/__release
  local.get $1
  call $~lib/rt/stub/__release
  local.get $0
  call $~lib/rt/stub/__release
  local.get $4
  call $~lib/rt/stub/__release
  local.get $7
  call $~lib/rt/stub/__release
 )
 (func $start (; 148 ;) (type $FUNCSIG$v)
  call $start:~lib/rt/index-stub
  call $start:~lib/nearEntry
 )
 (func $__near_ArgsParser_hello#set:buffer (; 149 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  local.tee $0
  local.get $0
  i32.load
  local.tee $1
  i32.ne
  if
   local.get $0
   call $~lib/rt/stub/__retain
   drop
   local.get $1
   call $~lib/rt/stub/__release
  end
  local.get $0
  i32.store
 )
 (func $__near_ArgsParser_hello#get:decoder (; 150 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=4
  call $~lib/rt/stub/__retain
 )
 (func $__near_ArgsParser_hello#set:decoder (; 151 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $0
  local.get $0
  i32.load offset=4
  local.tee $0
  local.get $1
  i32.ne
  if
   local.get $1
   call $~lib/rt/stub/__retain
   drop
   local.get $0
   call $~lib/rt/stub/__release
  end
  local.get $1
  i32.store offset=4
 )
 (func $__near_ArgsParser_hello#get:handledRoot (; 152 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load8_u offset=8
 )
 (func $__near_ArgsParser_hello#set:handledRoot (; 153 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  i32.store8 offset=8
 )
 (func $__near_ArgsParser_hello#get:__near_param_name (; 154 ;) (type $FUNCSIG$ii) (param $0 i32) (result i32)
  local.get $0
  i32.load offset=12
  call $~lib/rt/stub/__retain
 )
 (func $__near_ArgsParser_hello#set:__near_param_name (; 155 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $0
  local.get $0
  i32.load offset=12
  local.tee $0
  local.get $1
  i32.ne
  if
   local.get $1
   call $~lib/rt/stub/__retain
   drop
   local.get $0
   call $~lib/rt/stub/__release
  end
  local.get $1
  i32.store offset=12
 )
 (func $__near_ArgsParser_printString#set:buffer (; 156 ;) (type $FUNCSIG$vii) (param $0 i32) (param $1 i32)
  local.get $0
  local.get $0
  i32.load
  local.tee $0
  local.get $1
  i32.ne
  if
   local.get $1
   call $~lib/rt/stub/__retain
   drop
   local.get $0
   call $~lib/rt/stub/__release
  end
  local.get $1
  i32.store
 )
)
