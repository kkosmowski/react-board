import { ThreadModel } from '@models';
import React, { ReactElement } from 'react';
import { Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { TimeUtil } from '@utils';
import { DateFormat } from '@enums';

interface ThreadListItemProps {
  thread: ThreadModel;
}

export function ThreadListItem({ thread }: ThreadListItemProps): ReactElement {
  const postBody: string = thread.last_post.body;
  const postPreviewLength = 20;
  const slicedPostBody: string = postBody.length > postPreviewLength
    ? postBody.slice(0, postPreviewLength) + '...'
    : postBody;

  return (
    <>
      {/*@ts-ignore*/ }
      <ThreadItem>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>

        <ThreadInfo>
          <RouterLink className="thread__title" to={ '/home/thread/' + thread.id }>
            <ListItemText>{ thread.name }</ListItemText>
          </RouterLink>

          <p className="thread__author">
            <span>created by </span>

            <Typography component="strong" variant="inherit" color="secondary">
              <RouterLink to={ '/home/users/' + thread.last_post.created_by.id }>
                { thread.created_by.username }
              </RouterLink>
            </Typography>

            <span> on </span>

            <Typography component="strong" variant="inherit">
              { TimeUtil.format(thread.created_on, DateFormat.DateWithTime) }
            </Typography>
          </p>
        </ThreadInfo>

        <ThreadPostCount>
          { thread.post_count } { thread.post_count > 1 ? 'posts' : 'post' }
        </ThreadPostCount>

        <ThreadDetails>
          <p>
            <span>Last post: </span>
            <Typography component="strong" variant="inherit" color="secondary">
              { slicedPostBody }
            </Typography>
          </p>

          <p>
            <span>by </span>

            <Typography component="strong" variant="inherit" color="secondary">
              <RouterLink to={ '/home/users/' + thread.last_post.created_by.id }>
                { thread.last_post.created_by.username }
              </RouterLink>
            </Typography>

            <span> on </span>

            <Typography component="strong" variant="inherit">
              { TimeUtil.format(thread.last_post.created_on, DateFormat.DateWithTime) }
            </Typography>
          </p>
        </ThreadDetails>
      </ThreadItem>
      <Divider />
    </>
  );
}

const ThreadInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;

  .thread__title span {
    letter-spacing: 0.4px;
  }

  .thread__author {
    font-size: 14px;
    opacity: .75;
  }
`;

const ThreadPostCount = styled.p`
  flex: 1;
  min-width: 90px;
  padding: 0 10px;
`;

const ThreadDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  line-height: 1.6;
  opacity: .75;
  flex: 2;
`;

const ThreadItem = styled(ListItem)`
  display: flex;
  align-items: center;

  .thread-title {
    flex: 1;
  }
`;