import {
    StorageBalance,
    StorageBalanceBounds,
    StorageManagement,
    FungibleTokenCore,
    FungibleTokenResolver,
    FungibleToken,
    FungibleTokenMetadata,
    Option,
} from "near-contract-standards/lib";

import {
    AccountId,
    Balance,
    call,
    view,
    initialize,
    NearBindgen,
    IntoStorageKey,
} from "near-sdk-js";

class FTPrefix implements IntoStorageKey {
    into_storage_key(): string {
        return "FT_";
    }
}

@NearBindgen({ requireInit: true })
export class MyFt implements FungibleTokenCore, StorageManagement, FungibleTokenResolver {
    token: FungibleToken;
    metadata: FungibleTokenMetadata;

    constructor() {
        this.token = new FungibleToken();
        this.metadata = new FungibleTokenMetadata("", "", "", "", null, null, 0);
    }

    @initialize({})
    init({
        owner_id,
        total_supply,
        metadata,
    }: {
        owner_id: AccountId;
        total_supply: Balance;
        metadata: FungibleTokenMetadata;
    }) {
        metadata.assert_valid();
        this.token = new FungibleToken().init(new FTPrefix());
        this.metadata = metadata;
        this.token.internal_register_account(owner_id);
        this.token.internal_deposit(owner_id, total_supply);
    }

    @initialize({})
    init_with_default_meta({
        owner_id,
        total_supply
    }: {
        owner_id: AccountId;
        total_supply: Balance;
    }) {
        const metadata = new FungibleTokenMetadata(
            "ft-1.0.0",
            "Example NEAR fungible token",
            "EXAMPLE",
            "DATA_IMAGE_SVG_NEAR_ICON",
            null,
            null,
            24,
        );
        return this.init({
            owner_id,
            total_supply,
            metadata
        })
    }


    @call({})
    measure_account_storage_usage() {
        return this.token.measure_account_storage_usage();
    }

    @call({ payableFunction: true })
    ft_transfer({
        receiver_id,
        amount,
        memo
    }: {
        receiver_id: AccountId,
        amount: Balance,
        memo?: String
    }) {
        return this.token.ft_transfer({ receiver_id, amount, memo });
    }

    @call({ payableFunction: true })
    ft_transfer_call({
        receiver_id,
        amount,
        memo,
        msg
    }: {
        receiver_id: AccountId,
        amount: Balance,
        memo: Option<String>,
        msg: string
    }) {
        return this.token.ft_transfer_call({ receiver_id, amount, memo, msg });
    }

    @view({})
    ft_total_supply(): Balance {
        return this.token.ft_total_supply();
    }

    @view({})
    ft_balance_of({ account_id }: { account_id: AccountId }): Balance {
        return this.token.ft_balance_of({ account_id });
    }

    @call({ payableFunction: true })
    storage_deposit(
        {
            account_id,
            registration_only,
        }: {
            account_id?: AccountId,
            registration_only?: boolean,
        }
    ): StorageBalance {
        return this.token.storage_deposit({ account_id, registration_only });
    }

    @view({})
    storage_withdraw({ amount }: { amount?: bigint }): StorageBalance {
        return this.token.storage_withdraw({ amount });
    }

    @call({ payableFunction: true })
    storage_unregister({ force }: { force?: boolean }): boolean {
        return this.token.storage_unregister({ force });
    }

    @view({})
    storage_balance_bounds(): StorageBalanceBounds {
        return this.token.storage_balance_bounds();
    }

    @view({})
    storage_balance_of({ account_id }: { account_id: AccountId }): Option<StorageBalance> {
        return this.token.storage_balance_of({ account_id });
    }

    @call({})
    ft_resolve_transfer({
        sender_id,
        receiver_id,
        amount
    }: {
        sender_id: AccountId,
        receiver_id: AccountId,
        amount: Balance
    }): Balance {
        return this.token.ft_resolve_transfer({ sender_id, receiver_id, amount });
    }
}
