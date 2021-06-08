import React, { ReactElement, useEffect, useState } from 'react';
import { ThreadModel } from '@models';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { ThreadListItem } from '@main/thread';
import { CategoryRouteParams } from '@interfaces';
import { CategoryState, MainStore, ThreadState } from '@store/interfaces';
import { bindActionCreators, Dispatch } from 'redux';
import * as categoryActions from '../../store/actions/category.actions';
import { connect } from 'react-redux';
import { Button, Card, List } from 'antd';

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

    threads!.forEach((thread: ThreadModel, i: number) => {
      collection.push(
        <ThreadListItem thread={ thread } key={ i } />
      );
    });

    setThreadCollection(collection);
  }, [threads]);

  const handleNewThread = () => {
    history.push(`${ url }/create-thread`);
  };

  // useEffect(() => actions.clearCategory, []);

  return (
    <div className="root-container">
      <CategoryCard>
        <CategoryContent>
          <h2>{ category?.name }</h2>

          <Button
            type="primary"
            title="New thread"
            onClick={ handleNewThread }
          >
            New thread
          </Button>
        </CategoryContent>
        <List size="large">
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

const CategoryContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;