import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext } from '@contexts';
import { useParams } from 'react-router-dom';
import { PostModel } from '@models';
import { Post } from './Post';
import { Button } from '@material-ui/core';
import './Thread.scss';
import { ThreadReply } from './ThreadReply';

interface ThreadRouteParams {
  categoryId: string;
  threadId: string;
}

export function Thread(): ReactElement {
  const { categoryId, threadId }: ThreadRouteParams = useParams();
  const { addReply, getPosts, mainElement, posts } = useContext(DataContext);
  const [postCollection, setPostCollection] = useState<ReactElement[]>([]);
  const [replyVisible, setReplyVisible] = useState(false);

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

  const handleReplyClick = () => {
    setReplyVisible(true);
    setTimeout(() => {
      if (mainElement) {
        mainElement.scrollTo(0, mainElement.scrollHeight);
      }
    }, 0);
  };

  const createReplyButton = (): ReactElement => (
    <div>
      <Button
        type="button"
        title="Reply"
        color="secondary"
        variant="contained"
        onClick={ handleReplyClick }
      >
        Reply
      </Button>
    </div>
  );

  return (
    <div className="thread container">
      <header className="thread__header">
        <hgroup className="thread__controls">
          { createReplyButton() }
        </hgroup>
      </header>
      { postCollection }
      { replyVisible
        ? <ThreadReply onAddReply={ addReply } />
        : createReplyButton()
      }
    </div>
  );
}