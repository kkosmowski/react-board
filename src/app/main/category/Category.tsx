import { ReactElement, useContext, useEffect, useState } from 'react';
import { ThreadListItemModel } from '@models';
import { DataContext, SessionContext } from '@contexts';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  List,
  Typography
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { ThreadListItem } from '@main/thread';
import { CategoryRouteParams } from '@interfaces';

export function Category(): ReactElement {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { categoryId } = useParams<CategoryRouteParams>();
  const { logged } = useContext(SessionContext);
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

  const handleNewThread = () => {
    history.push(logged
      ? `${ url }/create-thread`
      : '/auth'
    );
  };

  return (
    <div className="container">
      <CategoryCard>
        <CategoryContent>
          <Typography component="h5" variant="h5">{ category.name }</Typography>

          <Button
            type="button"
            title="New thread"
            color="secondary"
            variant="contained"
            onClick={ handleNewThread }
          >
            New thread
          </Button>
        </CategoryContent>
        <List>
          { threadCollection }
        </List>
      </CategoryCard>
    </div>
  );
}

const CategoryCard = styled(Card)`
  && {
    overflow: visible;
    padding: 16px 24px;
  }
`;

const CategoryContent = styled(CardContent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;