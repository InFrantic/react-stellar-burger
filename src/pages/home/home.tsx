import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addFilling, chooseBun } from "../../services/action/burger-constructor";
import { useAppDispatch } from "../../services/store";
import { TIngredient } from "../../utils/types";

export function Home() {
    

    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
    );
}
