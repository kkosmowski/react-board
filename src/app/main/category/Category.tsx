import { ReactElement, useContext, useEffect, useState } from 'react';
import { ThreadListItemModel } from '@models';
import { DataContext } from '@contexts';
import { useParams, useRouteMatch, Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { ThreadListItem } from '@main/thread';

interface CategoryRouteParams {
  categoryId: string;
}

const CategoryCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  margin: 64px auto;

  && {
    overflow: visible;
  }
`;

export function Category(): ReactElement {
  const match = useRouteMatch();
  const { categoryId }: CategoryRouteParams = useParams();
  const { category, getCategory, threads } = useContext(DataContext);
  const [threadList, setThreadList] = useState<ReactElement[]>([]);

  useEffect(() => {
    getCategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    const list: ReactElement[] = [];

    threads.forEach((thread: ThreadListItemModel, i: number) => {
      list.push(
        <ThreadListItem thread={ thread } key={ i } />
      );
    });

    setThreadList(list);
  }, [threads]);

  return (
    <CategoryCard>
      <CardContent>
        <Typography component="h5" variant="h5">{ category.name }</Typography>
      </CardContent>
      <List>
        { threadList }
      </List>
    </CategoryCard>
  );
}