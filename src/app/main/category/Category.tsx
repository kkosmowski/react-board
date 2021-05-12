import { ReactElement, useEffect, useState } from 'react';
import { ThreadModel } from '@models';
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
import { CategoryState, MainStore, ThreadState } from '@store/interfaces';
import { bindActionCreators, Dispatch } from 'redux';
import * as categoryActions from '../../store/actions/category.actions';
import { connect } from 'react-redux';

interface MergedProps extends CategoryState, ThreadState {
  actions: any;
}

type CategoryComponentProps = Pick<MergedProps, 'category' | 'threads' | 'actions'>;

function CategoryComponent(
  { category, threads, actions }: CategoryComponentProps
): ReactElement {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { categoryId } = useParams<CategoryRouteParams>();
  const [threadCollection, setThreadCollection] = useState<ReactElement[]>([]);

  useEffect(() => {
    actions.getCategory(parseInt(categoryId));
  }, [categoryId]);

  useEffect(() => {
    const collection: ReactElement[] = [];

    threads?.forEach((thread: ThreadModel, i: number) => {
      collection.push(
        <ThreadListItem thread={ thread } key={ i } />
      );
    });

    setThreadCollection(collection);
  }, [threads]);

  const handleNewThread = () => {
    history.push(`${ url }/create-thread`);
  };

  useEffect(() => actions.clearCategory, []);

  return (
    <div className="root-container">
      <CategoryCard>
        <CategoryContent>
          <Typography component="h5" variant="h5">{ category?.name }</Typography>

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

const mapStateToProps = ({ category }: MainStore) => ({
  category: category.category,
  threads: category.threads,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(categoryActions, dispatch),
});

const Category = connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);

export { Category };

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