import { ReactElement, useContext, useEffect, useState } from 'react';
import { ThreadListItemModel } from '@models';
import { DataContext } from '@contexts';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  List,
  Typography
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ThreadListItem } from '@main/thread';

interface CategoryRouteParams {
  categoryId: string;
}

export function Category(): ReactElement {
  const { categoryId }: CategoryRouteParams = useParams();
  const { category, getCategory, threads } = useContext(DataContext);
  const [threadCollection, setThreadCollection] = useState<ReactElement[]>([]);

  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    const collection: ReactElement[] = [];

    threads.forEach((thread: ThreadListItemModel, i: number) => {
      collection.push(
        <ThreadListItem thread={ thread } key={ i } />
      );
    });

    setThreadCollection(collection);
  }, [threads]);

  return (
    <CategoryCard className="container">
      <CardContent>
        <Typography component="h5" variant="h5">{ category.name }</Typography>
      </CardContent>
      <List>
        { threadCollection }
      </List>
    </CategoryCard>
  );
}

const CategoryCard = styled(Card)`
  && {
    overflow: visible;
  }
`;