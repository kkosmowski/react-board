import React, { ReactElement } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryListItemModel } from '@models';

interface CategoryListItemProps {
  category: CategoryListItemModel;
}

export function CategoryListItem({ category }: CategoryListItemProps): ReactElement {
  const match = useRouteMatch();

  return (
    <CategoryCard>
      <CardContent className="container__content">
        <CategoryRow>
          <CategoryLink to={ match.url + '/category/' + category.id }>
            <Typography component="h5" variant="h5">
              { category.name }
            </Typography>
          </CategoryLink>
        </CategoryRow>
        <CategoryRow>
          <CategoryCardMainPart>
            <Typography component="p">
              { category.description }
            </Typography>
          </CategoryCardMainPart>
          <CategoryCardDetails>
            Threads: { category.thread_count }
          </CategoryCardDetails>
        </CategoryRow>
      </CardContent>
    </CategoryCard>
  );
}

const CategoryCard = styled(Card)`
  margin-bottom: 32px;
`;

const CategoryLink = styled(Link)`
  &:hover {
    text-decoration: none;

    h5 {
      color: ${ props => props.theme.palette.secondary.main };
      width: 100%;
    }
  }
`;

const CategoryRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoryCardMainPart = styled.div`
  display: flex;
  flex: 4;
`;

const CategoryCardDetails = styled.div`
  display: flex;
  flex: 1;
  min-width: 192px;
  padding-left: 16px;
  justify-content: flex-end;
`;