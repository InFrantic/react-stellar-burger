import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import bun02 from "../../images/bun-02.png"
import meat02 from "../../images/meat-02.png"
import mineralrings from "../../images/mineral_rings.png"
import sauce03 from "../../images/sauce-03.png"
import sp1 from "../../images/sp_1.png"
import styles from "./burger-constructor.module.css"

const BurgerConstructor = () => {
    return (
        <div className={`${styles["main-container"]}`}>
            <div className={styles["constructor-container"]}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1255}
                    thumbnail={bun02}
                />
            </div>
            <div>
                <ConstructorElement
                    text="Соус традиционный галактический"
                    price={1337}
                    thumbnail={sauce03}
                />
            </div>
            <div>
                <ConstructorElement
                    text="Мясо бессмертных моллюсков Protostomia"
                    price={1337}
                    thumbnail={meat02}
                />
            </div>
            <div className={styles["constructor-container"]}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1255}
                    thumbnail={bun02}
                />

            </div>
        </div>

    )
}

export default BurgerConstructor;