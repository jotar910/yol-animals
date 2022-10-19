import { RouteEnums } from '@app/shared/enums/route.enums';

export function parseParamRoute(route: RouteEnums): string {
  if (route.startsWith(':')) {
    return route.slice(1);
  }
  return route;
}
