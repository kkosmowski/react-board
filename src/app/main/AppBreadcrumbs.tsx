import { ReactElement, useContext, useEffect, useState } from 'react';
import { Breadcrumbs } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import { DataContext } from '@contexts';
import styled from 'styled-components';
import React from 'react';
import { NavigateNext } from '@material-ui/icons';

interface Breadcrumb {
  name: string;
  route: string;
}

enum BreadcrumbType {
  Category = 'category',
  Thread = 'thread',
  User = 'users',
}

export function AppBreadcrumbs(): ReactElement {
  const location = useLocation();
  const { category, thread, user } = useContext(DataContext);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  const getName = (type: BreadcrumbType): string => {
    switch (type) {
      case BreadcrumbType.Category:
        return category.name;
      case BreadcrumbType.Thread:
        return thread.name;
      case BreadcrumbType.User:
        return user.username;
    }
    console.error('[ERROR] AppBreadcrumbs getName() did not return a value.');
  };

  const getBreadcrumb = (type: string, id: string, lastBreadcrumb: Breadcrumb): Breadcrumb => ({
    name: getName(type as BreadcrumbType),
    route: `${ lastBreadcrumb.route }/${ type }/${ id }`
  });

  useEffect(() => {
    let locationArray = location.pathname.split('/');
    locationArray = locationArray.slice(2);
    let name = '';
    const _breadcrumbs: Breadcrumb[] = [
      {
        name: 'Home',
        route: '/home',
      }
    ];

    if (locationArray.length) {
      locationArray.forEach((item: string) => {
        if (!parseInt(item)) {
          name = item;
        } else {
          if (name) {
            _breadcrumbs.push(getBreadcrumb(name, item, _breadcrumbs[_breadcrumbs.length - 1]));
            name = '';
          }
        }
      });
    }

    if (locationArray.includes('create-thread')) {
      _breadcrumbs.push(
        {
          name: 'New thread',
          route: '',
        }
      );
    }

    setBreadcrumbs(_breadcrumbs);
  }, [location, category, thread, user]);

  const renderBreadcrumbs = (): ReactElement[] => {
    if (breadcrumbs) {
      return breadcrumbs.map(({ name, route }: Breadcrumb, index: number) => {
        if (index !== breadcrumbs.length - 1) {
          return (
            <Link to={ route } key={ index }>{ name }</Link>
          );
        }
        return (
          <span key={ index }>{ name }</span>
        );
      });
    }
    return [];
  };

  return (
    <TheBreadcrumbs
      separator={ <NavigateNext fontSize="small" /> }
      className="breadcrumbs container"
    >
      { renderBreadcrumbs() }
    </TheBreadcrumbs>
  );
}

const TheBreadcrumbs = styled(Breadcrumbs)`
  height: 40px; // prevent jumping
  padding-top: 16px;

  a {
    color: ${ props => props.theme.palette.secondary.main };
  }
`;