import { CategoryListItemModel, CategoryModel } from '@models';

export interface CategoryState {
  categoriesLoading: boolean;
  categories: CategoryListItemModel[];
  categoryLoading: boolean;
  category: CategoryModel | null;
}