import store from '@store';
import { CategoryModel, ThreadModel, User } from '@models';
import { Breadcrumb } from '@interfaces';
import { BreadcrumbsActions } from '@store/actions';
import { BreadcrumbsState } from '@store/interfaces';

enum Segment {
  Home = 'home',
  Category = 'category',
  Thread = 'thread',
  Profile = 'users',
  NewThread = 'create-thread',
}

export class BreadcrumbsService {
  private static readonly homeBreadcrumb: Breadcrumb = { route: '/home', name: 'Home' };
  private static categories: CategoryModel[];
  private static thread: ThreadModel;
  private static user: User;
  private static splitPath: string[];

  static setBreadcrumbs(path: string): void {
    this.splitPath = path // e.g '/home/category/2'
      .slice(1) // 'home/category/2'
      .split('/') // ['home', 'category', '2']
      .slice(1); // ['category', '2']
    const threadNecessary = this.splitPath.includes(Segment.Thread);
    this.categories = this.getCategories();
    this.thread = this.getThread();

    if ((threadNecessary && this.thread) || !threadNecessary) {
      store.dispatch({ type: BreadcrumbsActions.SET_BREADCRUMBS, payload: this.getBreadcrumbsState(path) });
    }
  }

  static previous(): Breadcrumb {
    const breadcrumbs: Breadcrumb[] = store.getState().breadcrumbs.breadcrumbs;
    return breadcrumbs[breadcrumbs.length - 2];
  }

  private static getBreadcrumbsState(path: string): BreadcrumbsState {
    const breadcrumbs: Breadcrumb[] = [this.homeBreadcrumb];

    const pushBreadcrumb = (segment: string, name: string, id: number | null): void => {
      breadcrumbs.push({
        route: breadcrumbs[breadcrumbs.length - 1].route + '/' + segment + (id ? '/' + id : ''),
        name,
      });
    };

    this.splitPath.forEach((segment, i) => {
      let breadcrumbName: string = '';
      let id = null;
      let shouldPush = true;

      switch (segment) {
        case Segment.Category: {
          id = parseInt(this.splitPath[i + 1]);
          breadcrumbName = this.getCategoryName(id);
          break;
        }
        case Segment.Thread: {
          const thread = this.getThread();
          id = thread.id;
          pushBreadcrumb('category', this.getCategoryName(thread.category_id), thread.category_id);
          breadcrumbName = thread.name || '';
          break;
        }
        case Segment.Profile: {
          shouldPush = false;
          // breadcrumbName = this.getUsername();
          break;
        }
        case Segment.NewThread: {
          breadcrumbName = 'New thread';
          break;
        }

        default:
          shouldPush = false;
          break;
      }

      if (shouldPush) {
        pushBreadcrumb(segment, breadcrumbName, id);
      }
    });

    return {
      path,
      breadcrumbs
    };
  }

  private static getCategories(): CategoryModel[] {
    return store.getState().category.categories;
  }

  private static getThread(): ThreadModel {
    return store.getState().thread.thread;
  }

  private static getCategoryName(categoryId: number) {
    return this.categories.find((category) => category.id === categoryId)?.name || '';
  }

  private static getUsername() {
    return this.user?.username || '';
  }
}