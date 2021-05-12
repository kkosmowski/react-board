import { CategoryListItemModel, CategoryModel, ThreadModel } from '@models';

export interface CategoryState {
  categoriesLoading: boolean;
  categories: CategoryListItemModel[];
  categoryLoading: boolean;
  category: CategoryModel | null;
  threadsLoading: boolean;
  threads: ThreadModel[];
}