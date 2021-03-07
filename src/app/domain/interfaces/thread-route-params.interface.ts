import { CategoryRouteParams } from './category-route-params.interface';

export interface ThreadRouteParams extends CategoryRouteParams {
  threadId: string;
}