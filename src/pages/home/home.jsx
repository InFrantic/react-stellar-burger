import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { getIngred } from "../../services/action/burger-ingredients";
import { useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { addFilling, chooseBun } from "../../services/action/burger-constructor";

export function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngred());
    }, []);

    const handleDrop = (ingredient) => {
        if (ingredient.type === "bun") {
            dispatch(chooseBun(ingredient))
        } else {
            dispatch(addFilling(ingredient))
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor onDropHandler={handleDrop} />
        </DndProvider>
    );
}
