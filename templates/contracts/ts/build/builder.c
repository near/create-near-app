#include <string.h>
#include "../node_modules/near-sdk-js/lib/cli/deps/quickjs/quickjs-libc-min.h"
#include "../node_modules/near-sdk-js/lib/cli/deps/quickjs/libbf.h"
#include "code.h"

static JSContext *JS_NewCustomContext(JSRuntime *rt)
{
  JSContext *ctx = JS_NewContextRaw(rt);
  if (!ctx)
    return NULL;
  JS_AddIntrinsicBaseObjects(ctx);
  JS_AddIntrinsicDate(ctx);
  JS_AddIntrinsicEval(ctx);
  JS_AddIntrinsicStringNormalize(ctx);
  JS_AddIntrinsicRegExp(ctx);
  JS_AddIntrinsicJSON(ctx);
  JS_AddIntrinsicProxy(ctx);
  JS_AddIntrinsicMapSet(ctx);
  JS_AddIntrinsicTypedArrays(ctx);
  JS_AddIntrinsicPromise(ctx);
  JS_AddIntrinsicBigInt(ctx);
  return ctx;
}

#define DEFINE_NEAR_METHOD(name) \
  void name () __attribute__((export_name(#name))) {\
    JSRuntime *rt;\
    JSContext *ctx;\
    JSValue mod_obj, fun_obj, result, error, error_message, error_stack;\
    const char *error_message_c, *error_stack_c;\
    char *error_c;\
    size_t msg_len, stack_len;\
    rt = JS_NewRuntime();\
    ctx = JS_NewCustomContext(rt);\
    js_add_near_host_functions(ctx);\
    mod_obj = js_load_module_binary(ctx, code, code_size);\
    fun_obj = JS_GetProperty(ctx, mod_obj, JS_NewAtom(ctx, #name));\
    result = JS_Call(ctx, fun_obj, mod_obj, 0, NULL);\
    if (JS_IsException(result)) {\
      error = JS_GetException(ctx);\
      error_message = JS_GetPropertyStr(ctx, error, "message");\
      error_stack = JS_GetPropertyStr(ctx, error, "stack");\
      error_message_c = JS_ToCStringLen(ctx, &msg_len, error_message);\
      error_stack_c = JS_ToCStringLen(ctx, &stack_len, error_stack);\
      error_c = malloc(msg_len+1+stack_len);\
      strncpy(error_c, error_message_c, msg_len);\
      error_c[msg_len] = '\n';\
      strncpy(error_c+msg_len+1, error_stack_c, stack_len);\
      panic_utf8(msg_len+1+stack_len, (uint64_t)error_c);\
    }\
    js_std_loop(ctx);\
  }

// #############
// # Registers #
// #############
extern void read_register(uint64_t register_id, uint64_t ptr);
extern uint64_t register_len(uint64_t register_id);
extern void write_register(uint64_t register_id, uint64_t data_len, uint64_t data_ptr);
// ###############
// # Context API #
// ###############
extern void current_account_id(uint64_t register_id);
extern void signer_account_id(uint64_t register_id);
extern void signer_account_pk(uint64_t register_id);
extern void predecessor_account_id(uint64_t register_id);
extern void input(uint64_t register_id);
extern uint64_t block_index();
extern uint64_t block_timestamp();
extern uint64_t epoch_height();
extern uint64_t storage_usage();
// #################
// # Economics API #
// #################
extern void account_balance(uint64_t balance_ptr);
extern void account_locked_balance(uint64_t balance_ptr);
extern void attached_deposit(uint64_t balance_ptr);
extern uint64_t prepaid_gas();
extern uint64_t used_gas();
// ############
// # Math API #
// ############
extern void random_seed(uint64_t register_id);
extern void sha256(uint64_t value_len, uint64_t value_ptr, uint64_t register_id);
extern void keccak256(uint64_t value_len, uint64_t value_ptr, uint64_t register_id);
extern void keccak512(uint64_t value_len, uint64_t value_ptr, uint64_t register_id);
extern void ripemd160(uint64_t value_len, uint64_t value_ptr, uint64_t register_id);
extern uint64_t ecrecover(uint64_t hash_len, uint64_t hash_ptr, uint64_t sign_len, uint64_t sig_ptr, uint64_t v, uint64_t malleability_flag, uint64_t register_id);
// #####################
// # Miscellaneous API #
// #####################
extern void value_return(uint64_t value_len, uint64_t value_ptr);
extern void panic(void);
extern void panic_utf8(uint64_t len, uint64_t ptr);
extern void log_utf8(uint64_t len, uint64_t ptr);
extern void log_utf16(uint64_t len, uint64_t ptr);
// Name confliction with WASI. Can be re-exported with a different name on NEAR side with a protocol upgrade
// Or, this is actually not a primitive, can be implement with log and panic host functions in C side or JS side. 
// extern void abort(uint32_t msg_ptr, uint32_t filename_ptr, uint32_t u32, uint32_t col);
// ################
// # Promises API #
// ################
extern uint64_t promise_create(uint64_t account_id_len, uint64_t account_id_ptr, uint64_t method_name_len, uint64_t method_name_ptr, uint64_t arguments_len, uint64_t arguments_ptr, uint64_t amount_ptr, uint64_t gas);
extern uint64_t promise_then(uint64_t promise_index, uint64_t account_id_len, uint64_t account_id_ptr, uint64_t method_name_len, uint64_t method_name_ptr, uint64_t arguments_len, uint64_t arguments_ptr, uint64_t amount_ptr, uint64_t gas);
extern uint64_t promise_and(uint64_t promise_idx_ptr, uint64_t promise_idx_count);
extern uint64_t promise_batch_create(uint64_t account_id_len, uint64_t account_id_ptr);
extern uint64_t promise_batch_then(uint64_t promise_index, uint64_t account_id_len, uint64_t account_id_ptr);
// #######################
// # Promise API actions #
// #######################
extern void promise_batch_action_create_account(uint64_t promise_index);
extern void promise_batch_action_deploy_contract(uint64_t promise_index, uint64_t code_len, uint64_t code_ptr);
extern void promise_batch_action_function_call(uint64_t promise_index, uint64_t method_name_len, uint64_t method_name_ptr, uint64_t arguments_len, uint64_t arguments_ptr, uint64_t amount_ptr, uint64_t gas);
extern void promise_batch_action_transfer(uint64_t promise_index, uint64_t amount_ptr);
extern void promise_batch_action_stake(uint64_t promise_index, uint64_t amount_ptr, uint64_t public_key_len, uint64_t public_key_ptr);
extern void promise_batch_action_add_key_with_full_access(uint64_t promise_index, uint64_t public_key_len, uint64_t public_key_ptr, uint64_t nonce);
extern void promise_batch_action_add_key_with_function_call(uint64_t promise_index, uint64_t public_key_len, uint64_t public_key_ptr, uint64_t nonce, uint64_t allowance_ptr, uint64_t receiver_id_len, uint64_t receiver_id_ptr, uint64_t method_names_len, uint64_t method_names_ptr);
extern void promise_batch_action_delete_key(uint64_t promise_index, uint64_t public_key_len, uint64_t public_key_ptr);
extern void promise_batch_action_delete_account(uint64_t promise_index, uint64_t beneficiary_id_len, uint64_t beneficiary_id_ptr);
extern void promise_batch_action_function_call_weight(uint64_t promise_index, uint64_t function_name_len, uint64_t function_name_ptr, uint64_t arguments_len, uint64_t arguments_ptr, uint64_t amount_ptr, uint64_t gas, uint64_t weight);
// #######################
// # Promise API results #
// #######################
extern uint64_t promise_results_count(void);
extern uint64_t promise_result(uint64_t result_idx, uint64_t register_id);
extern void promise_return(uint64_t promise_idx);
// ###############
// # Storage API #
// ###############
extern uint64_t storage_write(uint64_t key_len, uint64_t key_ptr, uint64_t value_len, uint64_t value_ptr, uint64_t register_id);
extern uint64_t storage_read(uint64_t key_len, uint64_t key_ptr, uint64_t register_id);
extern uint64_t storage_remove(uint64_t key_len, uint64_t key_ptr, uint64_t register_id);
extern uint64_t storage_has_key(uint64_t key_len, uint64_t key_ptr);
// #################
// # Validator API #
// #################
extern void validator_stake(uint64_t account_id_len, uint64_t account_id_ptr, uint64_t stake_ptr);
extern void validator_total_stake(uint64_t stake_ptr);
// #############
// # Alt BN128 #
// #############
extern void alt_bn128_g1_multiexp(uint64_t value_len, uint64_t value_ptr, uint64_t register_id);
extern void alt_bn128_g1_sum(uint64_t value_len, uint64_t value_ptr, uint64_t register_id);
extern uint64_t alt_bn128_pairing_check(uint64_t value_len, uint64_t value_ptr);

static uint8_t* JS_Uint8Array_to_C(JSContext *ctx, JSValue array, size_t *len) {
  uint8_t *ptr;
  JSValue buffer;
  size_t pbyte_offset, psize, pbytes_per_element = 0;

  buffer = JS_GetTypedArrayBuffer(ctx, array, &pbyte_offset, len, &pbytes_per_element);
  if (JS_IsException(buffer) || pbytes_per_element != 1) {
    return NULL;
  }
  ptr = JS_GetArrayBuffer(ctx, &psize, buffer);
  if (ptr == NULL) {
    return NULL;
  }
  return ptr + pbyte_offset;
}

static JSValue near_read_register(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;
  uint8_t *data;
  uint64_t data_len;
  JSValue arraybuffer, ret;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  data_len = register_len(register_id);
  if (data_len != UINT64_MAX) {
    data = malloc(data_len);
    read_register(register_id, (uint64_t)data);
    arraybuffer = JS_NewArrayBuffer(ctx, data, (size_t)data_len, NULL, NULL, TRUE);
    return JS_CallConstructor(ctx, JS_GetPropertyStr(ctx, JS_GetGlobalObject(ctx), "Uint8Array"), 1, (JSValueConst *)&arraybuffer);
  } else {
    return JS_UNDEFINED;
  }
}

static JSValue near_register_len(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id, len;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  len = register_len(register_id);
  return JS_NewBigUint64(ctx, len);
}

static JSValue near_write_register(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;
  uint8_t *data_ptr;
  size_t data_len;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  data_ptr = JS_Uint8Array_to_C(ctx, argv[1], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for data"); 
  }

  write_register(register_id, data_len, (uint64_t)data_ptr);
  return JS_UNDEFINED;
}

static JSValue near_current_account_id(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  current_account_id(register_id);
  return JS_UNDEFINED;
}

static JSValue near_signer_account_id(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
  uint64_t register_id;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  signer_account_id(register_id);
  return JS_UNDEFINED;
}

static JSValue near_signer_account_pk(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
  uint64_t register_id;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  signer_account_pk(register_id);
  return JS_UNDEFINED;
}

static JSValue near_predecessor_account_id(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
  uint64_t register_id;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  predecessor_account_id(register_id);
  return JS_UNDEFINED;
}

static JSValue near_input(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  input(register_id);
  return JS_UNDEFINED;
}

static JSValue near_block_index(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t value;

  value = block_index();
  return JS_NewBigUint64(ctx, value);
}

static JSValue near_block_timestamp(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t value;

  value = block_timestamp();
  return JS_NewBigUint64(ctx, value);
}

static JSValue near_epoch_height(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t value;

  value = epoch_height();
  return JS_NewBigUint64(ctx, value);
}

static JSValue near_storage_usage(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t value;

  value = storage_usage();
  return JS_NewBigUint64(ctx, value);
}

// ptr[0] ptr[1] is little-endian u128.
static JSValue u128_to_quickjs(JSContext *ctx, uint64_t* ptr) {
  JSValue value;
  bf_t* bn;
  bf_t b;

  value = JS_NewBigInt(ctx);
  bn = JS_GetBigInt(value);
  // from ptr[] to bn
  // high 64 bits
  bf_set_ui(bn, ptr[1]);
  bf_mul_2exp(bn, 64, BF_PREC_INF, BF_RNDZ);
  // low 64 bits
  bf_init(bn->ctx, &b);
  bf_set_ui(&b, ptr[0]);
  bf_add(bn, bn, &b, BF_PREC_INF, BF_RNDZ);
  bf_delete(&b);
  
  return value;
}

static int quickjs_bigint_to_u128(JSContext *ctx, JSValueConst val, uint64_t* ptr) {
  bf_t* a;
  bf_t q, r, b, one, u128max;
  a = JS_GetBigInt(val);
  bf_init(a->ctx, &u128max);
  bf_set_ui(&u128max, 1);
  bf_mul_2exp(&u128max, 128, BF_PREC_INF, BF_RNDZ);
  if (bf_cmp_le(&u128max, a)) {
    return 1;
  }
  bf_init(a->ctx, &q);
  bf_init(a->ctx, &r);
  bf_init(a->ctx, &b);
  bf_init(a->ctx, &one);
  bf_set_ui(&b, UINT64_MAX);
  bf_set_ui(&one, 1);
  bf_add(&b, &b, &one, BF_PREC_INF, BF_RNDZ);
  bf_divrem(&q, &r, a, &b, BF_PREC_INF, BF_RNDZ, BF_RNDZ);
  
  bf_get_uint64(ptr, &r);
  bf_get_uint64(ptr+1, &q);
  return 0;
}

static int quickjs_int_to_u128(JSContext *ctx, JSValueConst val, uint64_t* ptr) {
  if (JS_ToUint64Ext(ctx, ptr, val) < 0) {
    return 1;
  }
  ptr[1] = 0;
  return 0;
}

static int quickjs_to_u128(JSContext *ctx, JSValueConst val, uint64_t* ptr) {
  if (JS_IsBigInt(ctx, val))
    return quickjs_bigint_to_u128(ctx, val, ptr);
  else {
    return quickjs_int_to_u128(ctx, val, ptr);
  }
}

static JSValue near_account_balance(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{  
  uint64_t ptr[2];

  account_balance((uint64_t)ptr); 
  return u128_to_quickjs(ctx, ptr);
}

static JSValue near_account_locked_balance(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t ptr[2];

  account_locked_balance((uint64_t)ptr);
  return u128_to_quickjs(ctx, ptr);
}

static JSValue near_attached_deposit(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t ptr[2];

  attached_deposit((uint64_t)ptr);
  return u128_to_quickjs(ctx, ptr);
}

static JSValue near_prepaid_gas(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t value;

  value = prepaid_gas();
  return JS_NewBigUint64(ctx, value);
}

static JSValue near_used_gas(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t value;

  value = used_gas();
  return JS_NewBigUint64(ctx, value);
}

static JSValue near_random_seed(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;

  if (JS_ToUint64Ext(ctx, &register_id, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  random_seed(register_id);
  return JS_UNDEFINED;
}

static JSValue near_sha256(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for data"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  
  sha256(data_len, (uint64_t)data_ptr, register_id);
  return JS_UNDEFINED;
}

static JSValue near_keccak256(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for data"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }  
  keccak256(data_len, (uint64_t)data_ptr, register_id);
  return JS_UNDEFINED;
}

static JSValue near_keccak512(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for data"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  
  keccak512(data_len, (uint64_t)data_ptr, register_id);
  return JS_UNDEFINED;
}

static JSValue near_ripemd160(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for data"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  
  ripemd160(data_len, (uint64_t)data_ptr, register_id);
  return JS_UNDEFINED;
}

static JSValue near_ecrecover(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t malleability_flag, v, register_id, result;
  uint8_t *hash_ptr, *sig_ptr;
  size_t hash_len, sign_len;

  hash_ptr = JS_Uint8Array_to_C(ctx, argv[0], &hash_len);
  if (hash_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for hash"); 
  }
  sig_ptr = JS_Uint8Array_to_C(ctx, argv[1], &sign_len);
  if (sig_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for sig"); 
  }
  if (JS_ToUint64Ext(ctx, &malleability_flag, argv[2]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for malleability_flag");
  }
  if (JS_ToUint64Ext(ctx, &v, argv[3]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for v");
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[4]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
 
  result = ecrecover(hash_len, (uint64_t)hash_ptr, sign_len, (uint64_t)sig_ptr, malleability_flag, v, register_id);
  return JS_NewBigUint64(ctx, result);
}

static JSValue near_value_return(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) 
{
  uint8_t *value_ptr;
  size_t value_len;

  value_ptr = JS_Uint8Array_to_C(ctx, argv[0], &value_len);
  if (value_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for value"); 
  }
  value_return(value_len, (uint64_t)(value_ptr));
  return JS_UNDEFINED;
}

static JSValue near_panic(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  const char *data_ptr;
  size_t data_len;

  if (argc == 1) {
    data_ptr = JS_ToCStringLen(ctx, &data_len, argv[0]);
    panic_utf8(data_len, (uint64_t)data_ptr);
  } else {
    panic();
  }
  return JS_UNDEFINED;
}

static JSValue near_panic_utf8(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for message"); 
  }
  
  panic_utf8(data_len, (uint64_t)data_ptr);
  return JS_UNDEFINED;
}

static JSValue near_log(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  const char *data_ptr;
  size_t data_len;

  data_ptr = JS_ToCStringLen(ctx, &data_len, argv[0]);
  
  log_utf8(data_len, (uint64_t)data_ptr);
  return JS_UNDEFINED;
}

static JSValue near_log_utf8(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for message"); 
  }

  log_utf8(data_len, (uint64_t)data_ptr);
  return JS_UNDEFINED;
}

static JSValue near_log_utf16(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for message"); 
  }

  log_utf16(data_len, (uint64_t)data_ptr);
  return JS_UNDEFINED;
}

static JSValue near_promise_create(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  const char *account_id_ptr, *method_name_ptr;
  uint8_t *arguments_ptr;
  size_t account_id_len, method_name_len, arguments_len;
  uint64_t amount_ptr[2]; // amount is u128
  uint64_t gas, ret;

  account_id_ptr = JS_ToCStringLen(ctx, &account_id_len, argv[0]);
  method_name_ptr = JS_ToCStringLen(ctx, &method_name_len, argv[1]);
  arguments_ptr = JS_Uint8Array_to_C(ctx, argv[2], &arguments_len);
  if (arguments_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for arguments"); 
  }
  if (quickjs_to_u128(ctx, argv[3], amount_ptr) != 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint128 for amount");
  }
  if (JS_ToUint64Ext(ctx, &gas, argv[4]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for gas");
  }

  ret = promise_create(account_id_len, (uint64_t)account_id_ptr, method_name_len, (uint64_t)method_name_ptr, arguments_len, (uint64_t)arguments_ptr, (uint64_t)amount_ptr, gas);
  
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_promise_then(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  const char *account_id_ptr, *method_name_ptr;
  uint8_t *arguments_ptr;
  size_t account_id_len, method_name_len, arguments_len;
  uint64_t amount_ptr[2]; // amount is u128
  uint64_t gas, ret;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  account_id_ptr = JS_ToCStringLen(ctx, &account_id_len, argv[1]);
  method_name_ptr = JS_ToCStringLen(ctx, &method_name_len, argv[2]);
  arguments_ptr = JS_Uint8Array_to_C(ctx, argv[3], &arguments_len);
  if (arguments_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for arguments"); 
  }  
  if (quickjs_to_u128(ctx, argv[4], amount_ptr) != 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint128 for amount");
  }
  if (JS_ToUint64Ext(ctx, &gas, argv[5]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for gas");
  }

  ret = promise_then(promise_index, account_id_len, (uint64_t)account_id_ptr, method_name_len, (uint64_t)method_name_ptr, arguments_len, (uint64_t)arguments_ptr, (uint64_t)amount_ptr, gas);
  
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_promise_and(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_idx_ptr[argc], ret;

  for(int i = 0; i < argc; i++) {
    if (JS_ToUint64Ext(ctx, &promise_idx_ptr[i], argv[i]) < 0) {
      return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_id");
    }
  }
  ret = promise_and((uint64_t)promise_idx_ptr, argc);
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_promise_batch_create(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  const char *account_id_ptr;
  size_t account_id_len;
  uint64_t ret;

  account_id_ptr = JS_ToCStringLen(ctx, &account_id_len, argv[0]);
  ret = promise_batch_create(account_id_len, (uint64_t)account_id_ptr);
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_promise_batch_then(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  const char *account_id_ptr;
  size_t account_id_len;
  uint64_t ret;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  account_id_ptr = JS_ToCStringLen(ctx, &account_id_len, argv[1]);
  ret = promise_batch_then(promise_index, account_id_len, (uint64_t)account_id_ptr);
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_promise_batch_action_create_account(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  promise_batch_action_create_account(promise_index);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_deploy_contract(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  uint8_t *code_ptr;
  size_t code_len;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  code_ptr = JS_Uint8Array_to_C(ctx, argv[1], &code_len);
  if (code_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for code"); 
  }
  promise_batch_action_deploy_contract(promise_index, code_len, (uint64_t)code_ptr);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_function_call(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  const char *method_name_ptr;
  uint8_t *arguments_ptr;
  size_t method_name_len, arguments_len;
  uint64_t amount_ptr[2]; // amount is u128
  uint64_t gas;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  method_name_ptr = JS_ToCStringLen(ctx, &method_name_len, argv[1]);
  arguments_ptr = JS_Uint8Array_to_C(ctx, argv[2], &arguments_len);
  if (arguments_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for arguments"); 
  }
  if (quickjs_to_u128(ctx, argv[3], amount_ptr) != 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint128 for amount");
  }
  if (JS_ToUint64Ext(ctx, &gas, argv[4]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for gas");
  }
  promise_batch_action_function_call(promise_index, method_name_len, (uint64_t)method_name_ptr, arguments_len, (uint64_t)arguments_ptr, (uint64_t)amount_ptr, gas);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_transfer(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  uint64_t amount_ptr[2]; // amount is u128

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  if (quickjs_to_u128(ctx, argv[1], amount_ptr) != 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint128 for amount");
  }
  promise_batch_action_transfer(promise_index, (uint64_t)amount_ptr);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_stake(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  uint64_t amount_ptr[2];
  uint8_t *public_key_ptr;
  size_t public_key_len;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  if (quickjs_to_u128(ctx, argv[1], amount_ptr) != 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint128 for amount");
  }
  public_key_ptr = JS_Uint8Array_to_C(ctx, argv[2], &public_key_len);
  if (public_key_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for public key"); 
  }

  promise_batch_action_stake(promise_index, (uint64_t)amount_ptr, public_key_len, (uint64_t)public_key_ptr);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_add_key_with_full_access(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  uint8_t *public_key_ptr;
  size_t public_key_len;
  uint64_t nonce;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  public_key_ptr = JS_Uint8Array_to_C(ctx, argv[1], &public_key_len);
  if (public_key_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for public key"); 
  }
  if (JS_ToUint64Ext(ctx, &nonce, argv[2]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for nonce");
  }
  promise_batch_action_add_key_with_full_access(promise_index, public_key_len, (uint64_t)public_key_ptr, nonce);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_add_key_with_function_call(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  const char *receiver_id_ptr, *method_names_ptr;
  uint8_t *public_key_ptr;
  size_t public_key_len, receiver_id_len, method_names_len;
  uint64_t nonce, allowance_ptr[2];

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  public_key_ptr = JS_Uint8Array_to_C(ctx, argv[1], &public_key_len);
  if (public_key_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for public key"); 
  }
  if (JS_ToUint64Ext(ctx, &nonce, argv[2]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for nonce");
  }
  if (quickjs_to_u128(ctx, argv[3], allowance_ptr) != 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint128 for allowance");
  }
  receiver_id_ptr = JS_ToCStringLen(ctx, &receiver_id_len, argv[4]);
  method_names_ptr = JS_ToCStringLen(ctx, &method_names_len, argv[5]);

  promise_batch_action_add_key_with_function_call(promise_index, public_key_len, (uint64_t)public_key_ptr, nonce, (uint64_t)allowance_ptr, receiver_id_len, (uint64_t)receiver_id_ptr, method_names_len, (uint64_t)method_names_ptr);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_delete_key(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  uint8_t *public_key_ptr;
  size_t public_key_len;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  public_key_ptr = JS_Uint8Array_to_C(ctx, argv[1], &public_key_len);
  if (public_key_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for public key"); 
  }
  promise_batch_action_delete_key(promise_index, public_key_len, (uint64_t)public_key_ptr);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_function_call_weight(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  const char *method_name_ptr, *arguments_ptr;
  size_t method_name_len, arguments_len;
  uint64_t amount_ptr[2]; // amount is u128
  uint64_t gas;
  uint64_t weight;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  method_name_ptr = JS_ToCStringLen(ctx, &method_name_len, argv[1]);
  arguments_ptr = JS_ToCStringLenRaw(ctx, &arguments_len, argv[2]);
  if (quickjs_to_u128(ctx, argv[3], amount_ptr) != 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint128 for amount");
  }
  if (JS_ToUint64Ext(ctx, &gas, argv[4]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for gas");
  }
  if (JS_ToUint64Ext(ctx, &weight, argv[5]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for weight");
  }
  promise_batch_action_function_call_weight(promise_index, method_name_len, (uint64_t)method_name_ptr, arguments_len, (uint64_t)arguments_ptr, (uint64_t)amount_ptr, gas, weight);
  return JS_UNDEFINED;
}

static JSValue near_promise_batch_action_delete_account(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_index;
  const char *beneficiary_id_ptr;
  size_t beneficiary_id_len;

  if (JS_ToUint64Ext(ctx, &promise_index, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_index");
  }
  beneficiary_id_ptr = JS_ToCStringLen(ctx, &beneficiary_id_len, argv[1]);
  promise_batch_action_delete_account(promise_index, beneficiary_id_len, (uint64_t)beneficiary_id_ptr);
  return JS_UNDEFINED;
}

static JSValue near_promise_results_count(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t value;

  value = promise_results_count();
  return JS_NewBigUint64(ctx, value);
}

static JSValue near_promise_result(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t result_idx, register_id;
  uint64_t ret;

  if (JS_ToUint64Ext(ctx, &result_idx, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for result_idx");
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  ret = promise_result(result_idx, register_id);

  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_promise_return(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t promise_idx;
  if (JS_ToUint64Ext(ctx, &promise_idx, argv[0]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for promise_idx");
  }
  promise_return(promise_idx);
  
  return JS_UNDEFINED;
}

static JSValue near_storage_write(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *key_ptr, *value_ptr;
  size_t key_len, value_len;
  uint64_t register_id, ret;

  key_ptr = JS_Uint8Array_to_C(ctx, argv[0], &key_len);
  if (key_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for key"); 
  }
  value_ptr = JS_Uint8Array_to_C(ctx, argv[1], &value_len);
  if (value_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for value"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[2]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  ret = storage_write(key_len, (uint64_t)key_ptr, value_len, (uint64_t)value_ptr, register_id);
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_storage_read(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *key_ptr;
  size_t key_len;
  uint64_t register_id;
  uint64_t ret;

  key_ptr = JS_Uint8Array_to_C(ctx, argv[0], &key_len);
  if (key_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for key"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  ret = storage_read(key_len, (uint64_t)key_ptr, register_id);
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_storage_remove(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *key_ptr;
  size_t key_len;
  uint64_t register_id;
  uint64_t ret;

  key_ptr = JS_Uint8Array_to_C(ctx, argv[0], &key_len);
  if (key_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for key"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }
  ret = storage_remove(key_len, (uint64_t)key_ptr, register_id);
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_storage_has_key(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *key_ptr;
  size_t key_len;
  uint64_t ret;

  key_ptr = JS_Uint8Array_to_C(ctx, argv[0], &key_len);
  if (key_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for key"); 
  }
  ret = storage_has_key(key_len, (uint64_t)key_ptr);
  return JS_NewBigUint64(ctx, ret);
}

static JSValue near_validator_stake(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  const char *account_id_ptr;
  size_t account_id_len;
  uint64_t stake_ptr[2];

  account_id_ptr = JS_ToCStringLen(ctx, &account_id_len, argv[0]);
  validator_stake(account_id_len, (uint64_t)account_id_ptr, (uint64_t)stake_ptr);

  return u128_to_quickjs(ctx, stake_ptr);
}

static JSValue near_validator_total_stake(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t stake_ptr[2];

  validator_total_stake((uint64_t)stake_ptr);
  return u128_to_quickjs(ctx, stake_ptr);
}

static JSValue near_utf8_string_to_uint8array(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  const char *data;
  size_t len;
  JSValue arraybuffer;

  data = JS_ToCStringLen(ctx, &len, argv[0]);

  arraybuffer = JS_NewArrayBuffer(ctx, (uint8_t *)data, len, NULL, NULL, TRUE);
  return JS_CallConstructor(ctx, JS_GetPropertyStr(ctx, JS_GetGlobalObject(ctx), "Uint8Array"), 1, (JSValueConst *)&arraybuffer);
}

static JSValue near_latin1_string_to_uint8array(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  const char *data;
  size_t len;
  JSValue arraybuffer;

  data = JS_ToCStringLenRaw(ctx, &len, argv[0]);

  arraybuffer = JS_NewArrayBuffer(ctx, (uint8_t *)data, len, NULL, NULL, TRUE);
  return JS_CallConstructor(ctx, JS_GetPropertyStr(ctx, JS_GetGlobalObject(ctx), "Uint8Array"), 1, (JSValueConst *)&arraybuffer);
}

static JSValue near_uint8array_to_latin1_string(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array");
  }

  return JS_NewStringLenRaw(ctx, (const char *)data_ptr, data_len);
}

static JSValue near_uint8array_to_utf8_string(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array");
  }
  
  return JS_NewStringLen(ctx, (const char *)data_ptr, data_len);
}

static JSValue near_alt_bn128_g1_multiexp(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for data"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }

  alt_bn128_g1_multiexp(data_len, (uint64_t)data_ptr, register_id);
  return JS_UNDEFINED;
}

static JSValue near_alt_bn128_g1_sum(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint64_t register_id;
  uint8_t *data_ptr;
  size_t data_len;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for data"); 
  }
  if (JS_ToUint64Ext(ctx, &register_id, argv[1]) < 0) {
    return JS_ThrowTypeError(ctx, "Expect Uint64 for register_id");
  }

  alt_bn128_g1_sum(data_len, (uint64_t)data_ptr, register_id);
  return JS_UNDEFINED;
}

static JSValue near_alt_bn128_pairing_check(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv)
{
  uint8_t *data_ptr;
  size_t data_len;
  uint64_t ret;

  data_ptr = JS_Uint8Array_to_C(ctx, argv[0], &data_len);
  if (data_ptr == NULL) {
    return JS_ThrowTypeError(ctx, "Expect Uint8Array for data"); 
  }  
  ret = alt_bn128_pairing_check(data_len, (uint64_t)data_ptr);
  return JS_NewBigUint64(ctx, ret);
}

static void js_add_near_host_functions(JSContext* ctx) {
  JSValue global_obj, env;

  global_obj = JS_GetGlobalObject(ctx);
  env = JS_NewObject(ctx);

  JS_SetPropertyStr(ctx, env, "read_register", JS_NewCFunction(ctx, near_read_register, "read_register", 1));
  JS_SetPropertyStr(ctx, env, "register_len", JS_NewCFunction(ctx, near_register_len, "register_len", 1));
  JS_SetPropertyStr(ctx, env, "write_register", JS_NewCFunction(ctx, near_write_register, "write_register", 2));
  JS_SetPropertyStr(ctx, env, "current_account_id", JS_NewCFunction(ctx, near_current_account_id, "current_account_id", 1));
  JS_SetPropertyStr(ctx, env, "signer_account_id", JS_NewCFunction(ctx, near_signer_account_id, "signer_account_id", 1));
  JS_SetPropertyStr(ctx, env, "signer_account_pk", JS_NewCFunction(ctx, near_signer_account_pk, "signer_account_pk", 1));
  JS_SetPropertyStr(ctx, env, "predecessor_account_id", JS_NewCFunction(ctx, near_predecessor_account_id, "predecessor_account_id", 1));
  JS_SetPropertyStr(ctx, env, "input", JS_NewCFunction(ctx, near_input, "input", 1));
  JS_SetPropertyStr(ctx, env, "block_index", JS_NewCFunction(ctx, near_block_index, "block_index", 0));
  JS_SetPropertyStr(ctx, env, "block_timestamp", JS_NewCFunction(ctx, near_block_timestamp, "block_timestamp", 0));
  JS_SetPropertyStr(ctx, env, "epoch_height", JS_NewCFunction(ctx, near_epoch_height, "epoch_height", 0));
  JS_SetPropertyStr(ctx, env, "storage_usage", JS_NewCFunction(ctx, near_storage_usage, "storage_usage", 0));
  JS_SetPropertyStr(ctx, env, "account_balance", JS_NewCFunction(ctx, near_account_balance, "account_balance", 0));
  JS_SetPropertyStr(ctx, env, "account_locked_balance", JS_NewCFunction(ctx, near_account_locked_balance, "account_locked_balance", 0));
  JS_SetPropertyStr(ctx, env, "attached_deposit", JS_NewCFunction(ctx, near_attached_deposit, "attached_deposit", 0));
  JS_SetPropertyStr(ctx, env, "prepaid_gas", JS_NewCFunction(ctx, near_prepaid_gas, "prepaid_gas", 0));
  JS_SetPropertyStr(ctx, env, "used_gas", JS_NewCFunction(ctx, near_used_gas, "used_gas", 0));
  JS_SetPropertyStr(ctx, env, "random_seed", JS_NewCFunction(ctx, near_random_seed, "random_seed", 1));
  JS_SetPropertyStr(ctx, env, "sha256", JS_NewCFunction(ctx, near_sha256, "sha256", 2));
  JS_SetPropertyStr(ctx, env, "keccak256", JS_NewCFunction(ctx, near_keccak256, "keccak256", 2));
  JS_SetPropertyStr(ctx, env, "keccak512", JS_NewCFunction(ctx, near_keccak512, "keccak512", 2));
  JS_SetPropertyStr(ctx, env, "ripemd160", JS_NewCFunction(ctx, near_ripemd160, "ripemd160", 2));
  JS_SetPropertyStr(ctx, env, "ecrecover", JS_NewCFunction(ctx, near_ecrecover, "ecrecover", 5));
  JS_SetPropertyStr(ctx, env, "value_return", JS_NewCFunction(ctx, near_value_return, "value_return", 1));
  JS_SetPropertyStr(ctx, env, "panic", JS_NewCFunction(ctx, near_panic, "panic", 1));
  JS_SetPropertyStr(ctx, env, "panic_utf8", JS_NewCFunction(ctx, near_panic_utf8, "panic_utf8", 1));
  JS_SetPropertyStr(ctx, env, "log", JS_NewCFunction(ctx, near_log, "log", 1));
  JS_SetPropertyStr(ctx, env, "log_utf8", JS_NewCFunction(ctx, near_log_utf8, "log_utf8", 1));
  JS_SetPropertyStr(ctx, env, "log_utf16", JS_NewCFunction(ctx, near_log_utf16, "log_utf16", 1));
  JS_SetPropertyStr(ctx, env, "promise_create", JS_NewCFunction(ctx, near_promise_create, "promise_create", 5));
  JS_SetPropertyStr(ctx, env, "promise_then", JS_NewCFunction(ctx, near_promise_then, "promise_then", 6));
  JS_SetPropertyStr(ctx, env, "promise_and", JS_NewCFunction(ctx, near_promise_and, "promise_and", 1));
  JS_SetPropertyStr(ctx, env, "promise_batch_create", JS_NewCFunction(ctx, near_promise_batch_create, "promise_batch_create", 1));
  JS_SetPropertyStr(ctx, env, "promise_batch_then", JS_NewCFunction(ctx, near_promise_batch_then, "promise_batch_then", 2));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_create_account", JS_NewCFunction(ctx, near_promise_batch_action_create_account, "promise_batch_action_create_account", 1));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_deploy_contract", JS_NewCFunction(ctx, near_promise_batch_action_deploy_contract, "promise_batch_action_deploy_contract", 2));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_function_call", JS_NewCFunction(ctx, near_promise_batch_action_function_call, "promise_batch_action_function_call", 5));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_transfer", JS_NewCFunction(ctx, near_promise_batch_action_transfer, "promise_batch_action_transfer", 2));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_stake", JS_NewCFunction(ctx, near_promise_batch_action_stake, "promise_batch_action_stake", 3));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_add_key_with_full_access", JS_NewCFunction(ctx, near_promise_batch_action_add_key_with_full_access, "promise_batch_action_add_key_with_full_access", 3));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_add_key_with_function_call", JS_NewCFunction(ctx, near_promise_batch_action_add_key_with_function_call, "promise_batch_action_add_key_with_function_call", 6));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_delete_key", JS_NewCFunction(ctx, near_promise_batch_action_delete_key, "promise_batch_action_delete_key", 2));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_delete_account", JS_NewCFunction(ctx, near_promise_batch_action_delete_account, "promise_batch_action_delete_account", 2));
  JS_SetPropertyStr(ctx, env, "promise_batch_action_function_call_weight", JS_NewCFunction(ctx, near_promise_batch_action_function_call_weight, "promise_batch_action_function_call_weight", 6));
  JS_SetPropertyStr(ctx, env, "promise_results_count", JS_NewCFunction(ctx, near_promise_results_count, "promise_results_count", 0));
  JS_SetPropertyStr(ctx, env, "promise_result", JS_NewCFunction(ctx, near_promise_result, "promise_result", 2));
  JS_SetPropertyStr(ctx, env, "promise_return", JS_NewCFunction(ctx, near_promise_return, "promise_return", 1));
  JS_SetPropertyStr(ctx, env, "storage_write", JS_NewCFunction(ctx, near_storage_write, "storage_write", 2));
  JS_SetPropertyStr(ctx, env, "storage_read", JS_NewCFunction(ctx, near_storage_read, "storage_read", 2));
  JS_SetPropertyStr(ctx, env, "storage_remove", JS_NewCFunction(ctx, near_storage_remove, "storage_remove", 2));
  JS_SetPropertyStr(ctx, env, "storage_has_key", JS_NewCFunction(ctx, near_storage_has_key, "storage_has_key", 2));
  JS_SetPropertyStr(ctx, env, "validator_stake", JS_NewCFunction(ctx, near_validator_stake, "validator_stake", 2));
  JS_SetPropertyStr(ctx, env, "validator_total_stake", JS_NewCFunction(ctx, near_validator_total_stake, "validator_total_stake", 1));
  JS_SetPropertyStr(ctx, env, "alt_bn128_g1_multiexp", JS_NewCFunction(ctx, near_alt_bn128_g1_multiexp, "alt_bn128_g1_multiexp", 2));
  JS_SetPropertyStr(ctx, env, "alt_bn128_g1_sum", JS_NewCFunction(ctx, near_alt_bn128_g1_sum, "alt_bn128_g1_sum", 2));
  JS_SetPropertyStr(ctx, env, "alt_bn128_pairing_check", JS_NewCFunction(ctx, near_alt_bn128_pairing_check, "alt_bn128_pairing_check", 1));

  JS_SetPropertyStr(ctx, env, "latin1_string_to_uint8array", JS_NewCFunction(ctx, near_latin1_string_to_uint8array, "latin1_string_to_uint8array", 1));
  JS_SetPropertyStr(ctx, env, "utf8_string_to_uint8array", JS_NewCFunction(ctx, near_utf8_string_to_uint8array, "utf8_string_to_uint8array", 1));
  JS_SetPropertyStr(ctx, env, "uint8array_to_latin1_string", JS_NewCFunction(ctx, near_uint8array_to_latin1_string, "uint8array_to_latin1_string", 1));
  JS_SetPropertyStr(ctx, env, "uint8array_to_utf8_string", JS_NewCFunction(ctx, near_uint8array_to_utf8_string, "uint8array_to_utf8_string", 1));

  JS_SetPropertyStr(ctx, global_obj, "env", env);
}

JSValue JS_Call(JSContext *ctx, JSValueConst func_obj, JSValueConst this_obj,
                int argc, JSValueConst *argv);

void _start() {}

#include "methods.h"
