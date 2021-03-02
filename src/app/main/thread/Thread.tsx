import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext } from '@contexts';
import { useParams } from 'react-router-dom';
import { PostModel } from '@models';
import { Post } from './Post';
import styled from 'styled-components';

interface ThreadRouteParams {
  categoryId: string;
  threadId: string;
}

export function Thread(): ReactElement {
  const { categoryId, threadId }: ThreadRouteParams = useParams();
  const { posts, getPosts } = useContext(DataContext);
  const [postCollection, setPostCollection] = useState<ReactElement[]>([]);

  useEffect(() => {
    getPosts(categoryId, threadId);
  }, [categoryId, threadId]);

  useEffect(() => {
    const collection: ReactElement[] = [];

    posts.forEach((post: PostModel, i: number) => {
      collection.push(
        <Post post={ post } key={ i } />
      );
    });

    setPostCollection(collection);
  }, [posts]);

  return (
    <Posts>
      { postCollection }
    </Posts>
  );
}

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;
  margin: 64px auto;
`;