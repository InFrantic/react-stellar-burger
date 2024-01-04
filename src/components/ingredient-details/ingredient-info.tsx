import styles from './ingredient-info.module.css'

type IInfoItemProps = {
  text: string
  info: number
}

function IngredientInfo({ text, info }: IInfoItemProps) {

  return (
    <div className={styles.info}>
      <p className="text text_type_main-default text_color_inactive">
        {text}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {info}
      </p>
    </div>
  );
}

export default IngredientInfo