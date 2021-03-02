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
    <div className="container">
      { postCollection }
    </div>
  );
}