import React from "react";
import { OrdersReady } from "../../components/orders-ready/orders-ready";

export function Feed() {

    return (
        <>
            <section className={'pl-5 pr-5 half-home'}>
                <p className="text text_type_main-large pb-5">Лента заказов</p>
            </section>
            <section className={'pl-5 pr-5 pt-15 half-home'}>
                <OrdersReady />
            </section>
        </>
    )
}