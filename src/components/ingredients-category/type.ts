import type { TIngredient } from '@utils-types';

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  ingredients: TIngredient[];
  onAdd: (ingredient: TIngredient) => void;
  ref?: React.Ref<HTMLUListElement>;
};
