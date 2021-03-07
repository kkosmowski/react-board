import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { DataContext, SessionContext } from '@contexts';
import { useParams } from 'react-router-dom';
import { PostModel } from '@models';
import { Post } from './Post';
import { Button, Typography } from '@material-ui/core';
import './Thread.scss';
import { ThreadReply } from './ThreadReply';
import { ThreadRouteParams } from '@interfaces';

export function Thread(): ReactElement {
  const { categoryId, threadId } = useParams<ThreadRouteParams>();
  const { logged } = useContext(SessionContext);
  const { addReply, getPosts, mainElement, posts, thread, getThread } = useContext(DataContext);
  const [postCollection, setPostCollection] = useState<ReactElement[]>([]);
  const [replyVisible, setReplyVisible] = useState(false);
  const [threadScrollable, setThreadScrollable] = useState(false);

  useEffect(() => {
    if (threadId) {
      getThread(threadId);

      if (categoryId) {
        getPosts(categoryId, threadId);
      }
    }
  }, [categoryId, threadId]);

  useEffect(() => {
    const collection: ReactElement[] = [];

    posts.forEach((post: PostModel, i: number) => {
      collection.push(
        <Post post={ post } key={ i } />
      );
    });

    setPostCollection(collection);
    if (mainElement && mainElement.current) {
      setTimeout(() => {
        setThreadScrollable(mainElement.current.scrollHeight > window.innerHeight);
      }, 0);
    }
  }, [posts]);

  const handleReplyClick = () => {
    setReplyVisible(true);
    setTimeout(() => {
      mainElement.current.scrollTo(0, mainElement.current.scrollHeight);
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
        <hgroup className="thread__details">
          <Typography variant="h4" component="h4">Thread: { thread?.name }</Typography>
        </hgroup>
        <hgroup className="thread__controls">
          { createReplyButton() }
        </hgroup>
      </header>
      { postCollection }
      { replyVisible
        ? <ThreadReply onAddReply={ addReply } logged={ logged } />
        : threadScrollable
          ? createReplyButton()
          : null
      }
    </div>
  );
}