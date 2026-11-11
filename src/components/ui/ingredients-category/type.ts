import type { TIngredient } from '@utils-types';

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: TIngredient[];
  onAdd: (ingredient: TIngredient) => void;
};

export type TIngredientsCategoryUIProps = {
  onAdd: (ingredient: TIngredient) => void;
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  ingredients: TIngredient[];
  ingredientsCounters: Record<string, number>;
  ref?: React.Ref<HTMLUListElement>;
};
